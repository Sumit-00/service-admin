// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBcR9m32-B9n8DB3ItIsTYVIPNxKgjDhus',
  authDomain: 'service-offer-1876e.firebaseapp.com',
  projectId: 'service-offer-1876e',
  storageBucket: 'service-offer-1876e.appspot.com',
  messagingSenderId: '15295551706',
  appId: '1:15295551706:web:4e46ff65bcdbc051b6ade3',
  measurementId: 'G-SFGRHVK2FY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
