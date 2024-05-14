import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
// import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
import { useDispatch, useSelector } from "react-redux";
import {
  setAvatar,
  setTweets,
  removeTweet,
} from "../store/actions/profileActions";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;
const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
`;
const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 아바타(프로필 사진)를 변경할 때 호출되는 함수
export default function Profile() {
  const dispatch = useDispatch();
  const { avatar, tweets } = useSelector((state) => state.profile);
  const user = auth.currentUser;

  const onAvatarChange = async (e) => {
    const { files } = e.target; // e.target.files를 통해 사용자가 선택한 파일에 접근합니다.
    if (!user) return; // if (!user) return;

    if (files && files.length === 1) {
      // 선택된 파일이 있고 파일이 1개인 경우에만 실행됩니다.
      const file = files[0]; // 선택된 파일을 변수에 할당합니다.
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      //ref(storage, 'avatars/${user?.uid}')를 사용하여 사용자의 아바타가 저장될 Firebase Storage 경로를 지정

      const result = await uploadBytes(locationRef, file); // uploadBytes(locationRef, file)를 사용하여 파일을 Firebase Storage에 업로드합니다.
      const avatarUrl = await getDownloadURL(result.ref); //getDownloadURL(result.ref)를 통해 업로드된 파일의 다운로드 URL을 가져옵니다
      dispatch(setAvatar(avatarUrl)); // dispatch(setAvatar(avatarUrl))을 사용하여 가져온 다운로드 URL을 상태로 설정합니다.

      // updateProfile(user, { photoURL: avatarUrl })을 사용하여 사용자의 프로필에 사진 URL을 업데이트합니다.
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };

  //  Firestore에서 특정 사용자의 트윗을 가져오는 함수
  const fetchTweets = async () => {
    //fetchTweets 함수는 비동기 함수로, 사용자의 트윗을 가져오는 데 사용

    // query() 함수를 사용하여 Firestore 쿼리를 만듭니다. 여기서는 "tweets" 컬렉션에서 사용자의 uid와 일치하는 트윗을 가져오고,
    //  createdAt 필드를 기준으로 내림차순으로 최대 25개까지 가져오도록 설정
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );

    const snapshot = await getDocs(tweetQuery); // getDocs(tweetQuery)를 사용하여 해당 쿼리를 실행하고 결과를 가져옵니다.

    // 가져온 결과에서 각 문서의 데이터를 매핑하여 트윗 객체 배열을 만듭니다. 이때 각 트윗 객체에는
    // 트윗 내용, 작성 일자, 사용자 ID, 사용자명, 사용자 사진 URL 및 문서 ID가 포함됩니다.
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    dispatch(setTweets(tweets)); // dispatch(setTweets(tweets))를 사용하여 트윗 상태를 업데이트합니다.
  };

  const handleDelete = async (tweetId) => {
    //handleDelete 함수는 트윗의 ID를 매개변수로 받습니다.
    const tweetToDelete = tweets.find((tweet) => tweet.id === tweetId);
    if (!tweetToDelete) return; //만약 해당 트윗이 존재하지 않으면 함수를 종료합니다.

    // 사용자에게 정말로 삭제할 것인지 확인하는 확인 대화 상자를 표시합니다.
    // 사용자가 확인을 누르지 않거나 사용자가 로그인되지 않았거나 트윗의 작성자가 아닌 경우 함수를 종료합니다.
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (!ok || !user || user.uid !== tweetToDelete.userId) return;

    try {
      await deleteDoc(doc(db, "tweets", tweetId)); // deleteDoc(doc(db, "tweets", tweetId))를 사용하여 Firestore에서 해당 트윗을 삭제합니다.

      // 만약 삭제된 트윗이 사진을 포함하고 있다면 해당 사진도 삭제합니다.
      // 삭제된 트윗을 상태에서 제거합니다.
      if (tweetToDelete.photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${tweetId}`);
        await deleteObject(photoRef);
      }

      // dispatch(removeTweet(tweetId))을 사용하여 이전 트윗 상태를 업데이트
      // prevTweets 매개변수는 현재 트윗 상태를 나타냅니다.
      //  filter() 메서드를 사용하여 이전 트윗 배열에서 삭제된 트윗을 제외한 새로운 트윗 배열을 생성합니다.
      //  삭제된 트윗의 ID가 tweetId와 일치하지 않는 트윗만을 남겨둡니다.
      dispatch(removeTweet(tweetId));
    } catch (error) {
      // try-catch 블록은 삭제 작업이 실패할 경우를 처리합니다. 만약 오류가 발생하면, 콘솔에 오류 메시지를 기록
      console.error("Error deleting tweet:", error);
    }
  };

  // 컴포넌트가 마운트될 때(fetchTweets 함수 호출) 한 번만 실행되는 효과를 구현
  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    // <Wrapper>: 컨테이너 요소로, 아바타 업로드와 트윗 목록을 감싸는 역할을 합니다.
    <Wrapper>
      {/* <AvatarUpload>: 아바타 업로드를 위한 레이블 요소. 클릭하면 아바타를 업로드할 수 있는 파일 입력(input) 요소가 활성화됩니다. */}
      <AvatarUpload htmlFor="avatar">
        {/* {avatar ? <AvatarImg src={avatar} /> : ...}: avatar가 있는 경우 해당 이미지를 표시하고, 없는 경우 기본 아바타 아이콘을 표시합니다. */}
        {avatar ? (
          <AvatarImg src={avatar} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </AvatarUpload>

      {/* <AvatarInput>: 아바타를 업로드하기 위한 파일 입력(input) 요소입니다.
                 실제 파일 업로드를 담당하며, 파일이 선택되면 onAvatarChange 함수가 호출됩니다. */}
      <AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />
      <Name>{user?.displayName ?? "익명"}</Name>
      {/* <Name>: 사용자의 이름을 표시합니다. user?.displayName 존재하는 경우 해당 이름을 표시하고, 그렇지 않으면 "익명"으로 표시됩니다. */}

      <Tweets>
        {/* {tweets.map(...)}: tweets 배열을 순회하며 각 트윗에 대한 <Tweet> 컴포넌트를 렌더링합니다. 
                onDelete 프로퍼티를 통해 트윗 삭제 이벤트를 전달합니다. */}
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            {...tweet}
            onDelete={() => handleDelete(tweet.id)}
          />
        ))}
      </Tweets>
    </Wrapper>
  );
}
