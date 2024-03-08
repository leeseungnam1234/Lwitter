import { addDoc, collection, updateDoc } from "firebase/firestore"
import { useState } from "react"
import styled from "styled-components"
import { auth, db, storage } from "../firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &::placeholder{
        font-size: 16px;
    }
    &:focus{
        outline: none;
        border-color: #1d9bf0;
    }
`
const AttachFileButton = styled.label`
    padding: 10px 0px;
    color: #1d9bf0;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #1d9bf0;
    font-size: 14px;
    font-weight: 600;
    cursor:pointer;
`
const AttachFileInput = styled.input`
    display: none;
`
const SubmitBtn = styled.input`
    background-color:#1d9bf0;
    color:white;
    border:none;
    padding:10px 0px;
    border-radius:20px;
    font-size:16px;
    cursor:pointer;
    &:hover,
    &:active{
        opacity:0.8;
        /* 활성화된(active) 상태일 때 opacity를 줄여서 투명도를 조절
        &는 현재 선택된 요소를 나타냅니다.
        :active는 요소가 활성화된 상태일 때 적용됩니다. 일반적으로 사용자가 마우스 클릭하거나 터치하는 등의 상호작용을 할 때 요소가 활성화됩니다.
        opacity: 0.8;는 활성화된 상태일 때 요소의 투명도를 0.8로 설정합니다. 이렇게 함으로써 요소가 활성화된 상태일 때 투명해지고, 
        클릭하는 행위를 시각적으로 표시할 수 있습니다. */
    }
`

export default function PostTweetForm() {
    const [isLoading, setLoading] = useState(false)
    const [tweet, setTweet] = useState('')
    const [file, setFile] = useState<File|null>(null)
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value)
    }

    /**  파일 입력 필드에서 파일을 선택했을 때 호출되는 함수입니다. 선택한 파일을 상태에 업데이트 */
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 이벤트 핸들러 함수의 매개변수로 ChangeEvent를 받습니다. 파일 입력 필드에서 발생한 변경 이벤트를 처리합니다.

        const {files} = e.target
        // 이벤트 객체의 target 속성을 사용하여 파일 입력 필드에서 선택한 파일 목록에 접근합니다.

        // if (files && files.length === 1) { ... }: 선택한 파일이 존재하고, 선택한 파일이 1개인 경우에만 아래 코드를 실행합니다.
        if (files && files.length === 1) {
            setFile(files[0])
            // setFile(files[0]);: 선택한 파일을 파일 상태에 업데이트합니다. 파일 상태에는 현재 선택한 파일이 저장됩니다.
        }
    }

    // 트윗을 제출하는 함수입니다. 사용자가 트윗을 작성하고 제출할 때 호출
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        // 폼 제출 이벤트를 처리하는 함수입니다. 이벤트 객체를 사용하여 폼 제출을 제어합니다.

        e.preventDefault() // 기본 제출 동작을 중지시킵니다.
        const user = auth.currentUser // 현재 로그인된 사용자를 가져옵니다.
        if(!user || isLoading || tweet === '' || tweet.length > 180) return
        // 사용자가 로그인되어 있지 않거나, 로딩 중이거나, 트윗이 비어 있거나, 180자를 초과하는 경우 함수를 종료합니다.

        try {
            setLoading(true)
            // const doc = await addDoc(collection(db, 'tweets'), { ... });
            // Firestore에 새 트윗을 추가합니다. 트윗 내용과 작성 시간, 사용자 이름, 사용자 ID를 포함합니다.
            const doc = await addDoc(collection(db,'tweets'),{
                tweet,
                createdAt: Date.now(),
                username: user.displayName || '익명',
                userId: user.uid,
            })
            // if (file) { ... }: 사용자가 파일을 첨부했는지 확인하고, 첨부한 파일이 있을 경우에만 아래 코드를 실행합니다.
            if (file) {
                // 파일을 Storage 에 업로드하고 해당 URL을 트윗 문서에 업데이트합니다.
                const locationRef = ref(storage,`tweets/${user.uid}/${doc.id}`)
                const result = await uploadBytes(locationRef, file)
                const url = await getDownloadURL(result.ref)
                await updateDoc(doc,{
                    photo: url,
                })
            }
            // setTweet(''); setFile(null);: 트윗 내용과 파일을 초기화합니다.
            // 에러가 발생하면 콘솔에 로그를 출력하고, 로딩 상태를 해제합니다.
            setTweet('')
            setFile(null)
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    return (
        // 사용자가 양식을 작성하고 제출할 때 onSubmit 함수가 호출됩니다.
        // <Form onSubmit={onSubmit}>: 폼(form) 요소가 제출(submit)될 때 onSubmit 함수가 호출되도록 설정합니다.
        <Form onSubmit={onSubmit}>
            {/* <TextArea>: 트윗 내용을 입력하는 텍스트 영역입니다. 
            onChange 핸들러를 사용하여 입력 내용이 변경될 때마다 onChange 함수가 호출되도록 설정합니다. */}
            <TextArea 
            required
            rows={5}
            maxLength={190}
            onChange={onChange}
            value={tweet} 
            placeholder="무슨일이 있었나요?"/>

            {/* <AttachFileButton> 및 <AttachFileInput>: 파일을 첨부하는 버튼과 파일 입력 필드입니다. 
            사용자가 파일을 선택하면 onFileChange 함수가 호출됩니다. */}
            <AttachFileButton htmlFor="file">{file ? '파일 등록완료' : '파일을 등록해주세요'}</AttachFileButton>
            <AttachFileInput 
            onChange={onFileChange}
            type="file" 
            id="file" 
            accept="image/*"/>
            <SubmitBtn 
            type="submit" 
            value={isLoading ? '포스팅중...' : '트윗 게시'} />
            {/* <SubmitBtn>: 트윗을 게시하는 버튼입니다. 
            사용자가 클릭하면 onSubmit 함수가 호출되어 트윗을 게시하고 파일을 업로드합니다. 
            버튼의 레이블은 로딩 상태(isLoading)에 따라 다르게 설정됩니다. */}
        </Form>
    )
}