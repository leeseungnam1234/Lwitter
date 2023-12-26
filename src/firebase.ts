import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAfhiNopiCAYQLuB9Rz3gzCL1YUXrRR5M",
  authDomain: "lwitter-756bb.firebaseapp.com",
  projectId: "lwitter-756bb",
  storageBucket: "lwitter-756bb.appspot.com",
  messagingSenderId: "216352176579",
  appId: "1:216352176579:web:a02039a459cd3501f3a576",
  measurementId: "G-847Y41JNN2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)