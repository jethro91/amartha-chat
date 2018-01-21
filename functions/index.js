const functions = require('firebase-functions');
const fbAdmin = require('firebase-admin');

const topic = 'chat';

fbAdmin.initializeApp();

exports.subsToTopic = functions.database.ref('/user/{userId}/token').onWrite(event => {
  // Grab the current value of what was written to the Realtime Database.
  const token = event.data.val();
  const userId = event.params.userId;

  if (!token) {
    return Promise.resolve();
  }

  return fbAdmin.messaging().subscribeToTopic(token, topic);
});

exports.msgToTopic = functions.database.ref('/chat/{chatId}').onCreate(event => {
  const message = event.data.val();
  const chatId = event.params.chatId;

  if (!message) {
    return Promise.resolve();
  }

  const payload = {
    data: {
      title: message.displayName,
      body: message.msg
    }
  };

  return fbAdmin.messaging().sendToTopic(topic, payload);
});
