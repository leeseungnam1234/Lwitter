import React, { useState, ChangeEvent } from "react";
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === "title") {
      setTitle(value);
    } else if (id === "content") {
      setContent(value);
    }
  };

  const uploadContent = async () => {
    // 이미지가 없는 경우를 고려하여 이미지 URL을 빈 문자열로 설정
    let imageUrl = "";

    // 이미지가 선택된 경우에만 업로드 수행
    if (image) {
      const imageStorageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageStorageRef, image);
      imageUrl = await getDownloadURL(ref(storage, `images/${image.name}`));
    }

    // Firestore에 제목, 내용 및 이미지 URL 추가
    await addDoc(collection(db, "contents"), { title, content, imageUrl });
    console.log("Uploaded!");
  };

  return (
    <section>
      <input id="title" className="border" type="text" placeholder="제목을 입력해주세요." onChange={handleOnChange} />
      <textarea id="content" className="border" placeholder="내용을 입력해주세요." onChange={handleOnChange} />
      <input id="image" type="file" />
      <button onClick={uploadContent}>업로드</button>
    </section>
  );
};

export default Upload;
