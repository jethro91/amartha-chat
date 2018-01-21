import React, { Component } from 'react';
import moment from 'moment';
import { Widget, toggleWidget, addResponseMessage } from 'react-chat-widget';

import { fbDb } from '../instance/firebase';

class GeneralChat extends Component {
  constructor(props) {
    super(props);

    this.chatKeys = {};

    this.listenMessages = this.listenMessages.bind(this);
    this.sendChatToFirebase = this.sendChatToFirebase.bind(this);
  }

  componentDidMount() {
    toggleWidget();
    this.listenMessages();
  }

  listenMessages() {
    return fbDb
      .ref('chat')
      .orderByChild('stamp')
      .on('child_added', snap => {
        const item = snap.val();
        if (item === null) {
          return;
        }
        const chatKey = snap.key;
        if (this.chatKeys[chatKey]) {
          return;
        }
        const nowDisplay = moment(item.stamp).format('DD MMM HH:mm');
        addResponseMessage(`${nowDisplay} ~ ${item.displayName} : ${item.msg}`);
      });
  }

  sendChatToFirebase(newMessage) {
    const { user, logout } = this.props;
    if (newMessage === ':logout' || newMessage === ':exit' || newMessage === ':quit') {
      // logout command
      return logout();
    }
    // generate new key
    const newChatKey = fbDb.ref(`chat`).push().key;
    // save chat key to prevent duplicate message
    this.chatKeys[newChatKey] = true;
    // send to firebase
    return fbDb.ref(`chat/${newChatKey}`).set({
      uid: user.uid,
      displayName: user.displayName,
      msg: newMessage,
      stamp: new Date().getTime()
    });
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <Widget
          handleNewUserMessage={this.sendChatToFirebase}
          senderPlaceHolder={`${user.displayName} : Ketik Pertanyaan...`}
          title="Amartha"
          subtitle="Silahkan Ketik Pertanyaan dibawah"
          showCloseButton={false}
          fullScreenMode
        />
      </div>
    );
  }
}

export default GeneralChat;
