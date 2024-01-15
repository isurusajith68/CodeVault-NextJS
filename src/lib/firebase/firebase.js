
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBf5hKJhQzOpqwwN0o3uet0CG3dhUxXU0Q",
    authDomain: "code-vault-doc.firebaseapp.com",
    projectId: "code-vault-doc",
    storageBucket: "code-vault-doc.appspot.com",
    messagingSenderId: "789837384274",
    appId: "1:789837384274:web:cf92402b9af8d963b5ed8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);