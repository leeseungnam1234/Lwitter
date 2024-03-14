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
  /* flex-direction 속성은 flex 컨테이너 안의 자식 요소들의 배치 방향을 지정합니다.
   값 column은 요소들을 세로 방향으로 나열하도록 설정합니다. */
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
`

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
  const [sanitizedContent, setSanitizedContent] = useState("");

  // 초기값은 null이며, 파일 객체를 나타내는 File 타입 또는 null을 가집니다.
  const [image, setImage] = useState<File | null>(null);

  // 초기값은 null이며, 사용자 정보를 나타내는 User 타입 또는 null을 가집니다.
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // auth.onAuthStateChanged 를 사용하여 사용자 인증 상태의 변경을 감지하고, 
    // 변경이 있을 때마다 setUser 함수를 호출하여 사용자 상태를 업데이트합니다.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
    // 리턴된 함수가 언마운트될 때 구독을 정리
  }, []);

  // e: ChangeEvent<HTMLInputElement> : 이벤트 핸들러 함수의 매개변수로 ChangeEvent 를 받습니다.
  //  input 요소에서의 변경을 감지하기 위해 HTMLInputElement 를 제네릭으로 지정합니다.
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    // e.target.files: 이벤트 객체의 target 속성을 사용하여 파일 입력 요소의 files 속성에 접근합니다.
    //  이것은 사용자가 선택한 파일을 나타내는 FileList 객체입니다.
    // e.target.files[0] : FileList 객체의 첫 번째 파일을 가져옵니다. 이것은 사용자가 선택한 파일입니다.
    if (e.target.files && e.target.files[0]) {
      
      // setImage(e.target.files[0]) : setImage 함수를 호출하여 파일 상태를 업데이트합니다. 
      // 이로써 선택한 파일이 이미지 상태에 설정됩니다.
      setImage(e.target.files[0]);
    }
  };
  
  // e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>: 이벤트 핸들러 함수의 매개변수로 ChangeEvent 를 받습니다. 
  // input 요소와 textarea 요소에서의 변경을 감지하기 위해 HTMLInputElement와 HTMLTextAreaElement를 제네릭으로 지정합니다.
  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    // const { id, value } = e.target;: 이벤트 객체의 target 속성을 사용하여 
    // 변경된 input 요소 또는 textarea 요소의 id와 value를 추출합니다.
    const { id, value } = e.target;

    // if (id === "title") { setTitle(value); }: id가 "title"인 경우에는 setTitle 함수를 호출하여 title 상태를 업데이트합니다.
    if (id === "title") {
      setTitle(value);
    } else if (id === "content") {
      setContent(value);
      setSanitizedContent(value.replace(/<\/?[^>]+(>|$)/g, "").replace(/\n|\r/g, "\n"));
      // else if (id === "content") { setContent(value); setSanitizedContent(value.replace(/<\/?[^>]+(>|$)/g, "").replace(/\n|\r/g, "\n")); }
      // id 가 "content"인 경우에는 setContent 함수를 호출하여 content 상태를 업데이트하고, 
      // 동시에 setSanitizedContent 함수를 호출하여 HTML 태그를 제거한 내용을 sanitizedContent 상태로 설정합니다.
    }
  };

  const uploadContent = async () => {
    // if (!user) { ... }: 사용자가 로그인되어 있는지 확인합니다. 로그인되어 있지 않다면 콘솔에 메시지를 출력하고 함수를 종료합니다.
    if (!user) {
      console.log("사용자가 로그인되지 않았습니다.");
      return;
    }

    let imageUrl = ""; // let imageUrl = "";: 이미지 URL을 저장할 변수를 초기화합니다.

    // if (image) { ... }: 사용자가 이미지를 선택했는지 확인합니다. 
    // 이미지가 선택되었다면 이미지를 Storage 에 업로드하고, 업로드된 이미지의 URL을 imageUrl 변수에 할당합니다.
    if (image) {
      const imageStorageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageStorageRef, image);
      imageUrl = await getDownloadURL(ref(storage, `images/${image.name}`));
    }

    // Firestore의 "contents" 컬렉션에 컨텐츠 데이터를 추가합니다. 
    // 제목(title), 내용(content), HTML 태그를 제거한 내용(sanitizedContent), 이미지 URL(imageUrl)을 포함합니다.
    await addDoc(collection(db, "contents"), { title, content, sanitizedContent, imageUrl });
    console.log("Uploaded!"); //업로드가 완료되었음을 콘솔에 출력합니다

    navigate("/listPage"); //업로드 후에는 사용자를 목록 페이지로 리다이렉션합니다.
  };

  return (
    <Container>
      {/* 제목을 입력할 수 있는 입력 필드입니다. 입력이 변경될 때마다 handleOnChange 함수가 호출됩니다. */}
      <Input id="title" type="text" placeholder="제목을 입력해주세요." onChange={handleOnChange} />

      {/* 내용을 입력할 수 있는 텍스트 영역입니다. 입력이 변경될 때마다 handleOnChange 함수가 호출됩니다. */}
      <Textarea id="content" placeholder="내용을 입력해주세요." onChange={handleOnChange} />

      {/* 이미지를 선택할 수 있는 파일 입력 필드입니다. 이미지 선택 시 handleImageChange 함수가 호출됩니다. */}
      <Input id="image" type="file" onChange={handleImageChange} />

      {/* 사용자가 로그인되어 있을 경우에만 업로드 버튼이 표시됩니다. 업로드 버튼을 클릭하면 uploadContent 함수가 호출됩니다. */}
      {user && <Button onClick={uploadContent}>업로드</Button>}
      
      {/* HTML 태그를 제거한 내용을 표시하는 부분입니다. sanitizedContent 를 사용하여 내용을 표시하며, 
      dangerouslySetInnerHTML 속성을 사용하여 HTML을 렌더링합니다. */}
      <div dangerouslySetInnerHTML={{__html:sanitizedContent}}/>
    </Container>
  );
};

export default Upload;
