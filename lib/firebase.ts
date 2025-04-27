import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  // あなたのFirebaseプロジェクトの設定
  apiKey: "AIzaSyA6Sot2gSgUnNE5zHHx8lkDsAVxXqXVrVA",
  authDomain: "my-festival-b.firebaseapp.com",
  projectId: "my-festival-b",
  storageBucket: "my-festival-b.firebasestorage.app",
  messagingSenderId: "685070825824",
  appId: "1:685070825824:web:87390644f47324de740605",
  measurementId: "G-4ZN7NXS819"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ここを追加！
if (typeof window !== 'undefined' && location.hostname === "localhost") {
  connectFirestoreEmulator(db, "127.0.0.1", 8181);
}

export { app,db };

