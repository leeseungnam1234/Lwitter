import { useState, ChangeEvent, useEffect } from "react";
import { useHistory } from "react-router-dom"; // useHistory 가져오기 추가
import { db, storage, auth } from "../firebase"; // auth 가져오기 추가
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
  const [user, setUser] = useState<User | null>(null); // 사용자 상태 추가
  const history = useHistory(); // useHistory 호출 위치 변경

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
      // 사용자가 로그인되지 않은 경우에는 업로드를 중단
      console.log("사용자가 로그인되지 않았습니다.");
      return;
    }

    let imageUrl = "";
    if (image) {
      const imageStorageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageStorageRef, image);
      imageUrl = await getDownloadURL(ref(storage, `images/${image.name}`));
    }

    await addDoc(collection(db, "contents"), { title, content, imageUrl });
    console.log("Uploaded!");

    // 업로드가 완료되면 리스트 페이지로 이동
    history.push("/list");
  };

  return (
    <Container>
      <Input id="title" type="text" placeholder="제목을 입력해주세요." onChange={handleOnChange} />
      <Textarea id="content" placeholder="내용을 입력해주세요." onChange={handleOnChange} />
      <Input id="image" type="file" onChange={handleImageChange} />
      {user && <Button onClick={uploadContent}>업로드</Button>} {/* 사용자가 로그인한 경우에만 버튼 표시 */}
    </Container>
  );
};

export default Upload;
