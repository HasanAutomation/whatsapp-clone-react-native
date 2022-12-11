import { initializeApp } from 'firebase/app';

export const getFirebaseApp = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDtpF5iGTBT5q8HRm4pc9WMjBQgv5966Zw',
    authDomain: 'whatsapp-clone-58dfb.firebaseapp.com',
    projectId: 'whatsapp-clone-58dfb',
    storageBucket: 'whatsapp-clone-58dfb.appspot.com',
    messagingSenderId: '345630567599',
    appId: '1:345630567599:web:6734e45e2032c93afb785a',
    measurementId: 'G-X7SHDJQWTM',
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
