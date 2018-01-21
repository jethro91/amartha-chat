import React, { Component } from 'react';
import BlockUi from 'react-block-ui';

import './styles/containers.css';
import './styles/components.css';

import Login from './pages/Login';
import GeneralChat from './pages/GeneralChat';
import { fbAuth, fbDb, fbMessaging } from './instance/firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: true
    };
    this.listenOnAuth = this.listenOnAuth.bind(this);
    this.logout = this.logout.bind(this);
    this.subscribePushNotification = this.subscribePushNotification.bind(this);
    this.updateNameFromChild = this.updateNameFromChild.bind(this);
    this.updateNameFromChild = this.updateNameFromChild.bind(this);
  }
  componentDidMount() {
    this.listenOnAuth();
  }
  listenOnAuth() {
    return fbAuth.onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          return this.subscribePushNotification(user);
        }
        return this.setState({ user: {}, loading: false });
      }, 2000);
    });
  }
  logout() {
    return fbAuth.signOut().then(
      () =>
        this.setState({
          user: {}
        }),
      err => {
        console.warn('logout failed', err);
      }
    );
  }
  subscribePushNotification(user) {
    const messaging = fbMessaging;

    // for debuging
    messaging.onMessage(payload => {
      // console.log('onMessage ', payload);
    });

    // monitor push notification token changed
    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then(refreshedToken => {
          if (fbAuth.user) {
            return fbDb.ref(`user/${fbAuth.user.uid}`).update({
              token: refreshedToken,
              lastLogin: new Date().getTime()
            });
          }
        })
        .catch(err => {
          // console.log('Unable to retrieve refreshed token ', err);
        });
    });

    // request permission puish notification
    messaging
      .requestPermission()
      .then(() => messaging.requestPermission())
      .then(() => messaging.getToken())
      .then(token =>
        fbDb.ref(`user/${user.uid}`).set({
          uid: user.uid,
          displayName: user.displayName,
          token,
          lastLogin: new Date().getTime()
        }))
      .then(() => this.setState({ user, loading: false }))
      .catch(err => {
        // console.log(err);
        fbAuth.signOut();
        window.alert('Browser tidak support push notification');
        return this.setState({ loading: false });
      });
  }
  updateNameFromChild(name) {
    const { user } = this.state;
    // console.log(name, user);
    user.displayName = name;
    this.setState({
      user
    });
  }
  render() {
    const { user, loading } = this.state;
    let childUi = <Login updateNameFromChild={this.updateNameFromChild} />;

    if (user.uid && user.displayName) {
      childUi = <GeneralChat user={user} logout={this.logout} />;
    }

    if (loading) {
      childUi = null;
    }

    return (
      <BlockUi blocking={loading} className="App" tag="div">
        {childUi}
      </BlockUi>
    );
  }
}

export default App;
