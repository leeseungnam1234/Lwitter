import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAfhiNopiCAYQLuB9Rz3gzCL1YUXrRR5M",
  authDomain: "lwitter-756bb.firebaseapp.com",
  projectId: "lwitter-756bb",
  storageBucket: "lwitter-756bb.appspot.com",
  messagingSenderId: "216352176579",
  appId: "1:216352176579:web:a02039a459cd3501f3a576",
  measurementId: "G-847Y41JNN2",
};
// 도메인,api key등 여러가지 키값들이 포함된 config 개체

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Config옵션을 통해서 app 을 생성

export const auth = getAuth(app); // app에 대한 인증 서비스 , 인증 인스턴스

export const storage = getStorage(app);

export const db = getFirestore(app);
