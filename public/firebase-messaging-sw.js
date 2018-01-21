// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.9.0/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '843966175631'
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
  const title = payload.data.title;
  const options = {
    body: payload.data.body,
    icon: '/chat-logo.png',
    data: {
      click_action: 'https://amartha-chat.firebaseapp.com/'
    },
    click_action: 'https://amartha-chat.firebaseapp.com/'
  };

  self.registration.showNotification(title, options);
});

// add click action
self.addEventListener('notificationclick', event => {
  // const target = event.notification.data.click_action || '/';
  event.notification.close();
  // event.waitUntil(clients.openWindow('http://192.168.100.12:3000/'));
  event.waitUntil(clients.openWindow('https://amartha-chat.firebaseapp.com/'));
});
