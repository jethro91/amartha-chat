import * as firebase from 'firebase';

const fbConfig = {
  apiKey: 'AIzaSyCMe5AE-ME2IQHLDZ4goir21dHDJ0gVAwI',
  authDomain: 'amartha-chat.firebaseapp.com',
  databaseURL: 'https://amartha-chat.firebaseio.com',
  projectId: 'amartha-chat',
  storageBucket: '',
  messagingSenderId: '913593347875'
};

let instance;

const create = function () {
  if (typeof window !== 'undefined' && !instance) {
    instance = firebase.initializeApp(fbConfig, '[DEFAULT]');
    instance.auth().languageCode = 'id';
  }
  return instance;
};

const client = create();

export default client;

export const fbDb = client.database();
export const fbAuth = client.auth();
export const fbStorage = client.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const fbMessaging = client.messaging();
