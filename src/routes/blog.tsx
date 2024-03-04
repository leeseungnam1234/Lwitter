import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage, auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { User } from "firebase/auth";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

const Input = styled.input`
  width: 80%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 80%;
  height: 300px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Upload = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === "title") {
      setTitle(value);
    } else if (id === "content") {
      setContent(value);
    }
  };

  const uploadContent = async () => {
    if (!user) {
      console.log("사용자가 로그인되지 않았습니다.");
      return;
    }

    let imageUrl = "";
    if (image) {
      const imageStorageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageStorageRef, image);
      imageUrl = await getDownloadURL(ref(storage, `images/${image.name}`));
    }

    const sanitizedContent = content.replace(/<\/?[^>]+(>|$)/g, "");

    await addDoc(collection(db, "contents"), { title, content, sanitizedContent, imageUrl });
    console.log("Uploaded!");

    navigate("/listPage");
  };

  return (
    <Container>
      <Input id="title" type="text" placeholder="제목을 입력해주세요." onChange={handleOnChange} />
      <Textarea id="content" placeholder="내용을 입력해주세요." onChange={handleOnChange} />
      <Input id="image" type="file" onChange={handleImageChange} />
      {user && <Button onClick={uploadContent}>업로드</Button>}
    </Container>
  );
};

export default Upload;
