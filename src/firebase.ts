import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQz2RPRKDqDdPJ-2V4GurUx8rC3XheX5U",
  authDomain: "atom-academy-1de8e.firebaseapp.com",
  projectId: "atom-academy-1de8e",
  storageBucket: "atom-academy-1de8e.appspot.com",
  messagingSenderId: "567536282199",
  appId: "1:567536282199:web:c1f69d23dbfc776c555112",
  measurementId: "G-W0FF71WLDS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, db, auth, storage, analytics };
