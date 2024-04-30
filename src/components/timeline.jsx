import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
// import { Wrapper } from "./auth-components";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
// import { Unsubscribe } from "firebase/auth";

// export interface ITweet {
//     id:string
//     photo?:string
//     tweet:string
//     userId:string
//     username:string
//     createdAt:number
// }

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState([]);

  useEffect(() => {
    let Unsubscribe = null;
    // 사용할 Firestore 구독의 참조를 저장하기 위한 변수를 선언합니다. 초기값은 null이며, 나중에 구독을 정리할 때 사용됩니다.

    const fetchTweets = async () => {
      const tweetsQuery = query(
        //Firestore 의 query 함수를 사용하여 트윗 컬렉션을 조회합니다.
        collection(db, "tweets"),
        orderBy("createdAt", "desc"), // orderBy 함수를 사용하여 createdAt 필드를 기준으로 내림차순으로 정렬
        limit(15) // limit 함수를 사용하여 최신 15개의 트윗만 가져옵니다.
      );

      // Firestore 쿼리에 대한 실시간 업데이트를 구독하고, 업데이트가 발생할 때마다 트윗 데이터를 업데이트하는 부분입니다.
      Unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        //onSnapshot 함수를 사용하여 Firestore 쿼리에 대한 실시간 업데이트를 구독합니다.
        //  이 함수는 쿼리 결과에 대한 스냅샷을 받아와서 콜백 함수를 호출하고, 스냅샷이 변경될 때마다 콜백 함수가 실행됩니다.

        const tweets = snapshot.docs.map((doc) => {
          // 콜백 함수 내에서는 스냅샷에 포함된 문서들을 순회하면서 각 문서의 데이터를 추출합니다.
          // 각 문서의 데이터를 트윗 객체로 변환하고, 이를 배열에 저장합니다.
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
        setTweet(tweets);
        // setTweet(tweets);를 사용하여 상태를 업데이트합니다.
        // 이렇게 함으로써 컴포넌트는 트윗 데이터의 업데이트를 감지하고 UI를 다시 렌더링할 수 있습니다.
      });
    };
    fetchTweets();
    //fetchTweets()를 호출하여 Firestore에서 트윗 데이터를 가져옵니다.
    // 이는 컴포넌트가 마운트될 때 트윗 데이터의 구독을 시작합니다.
    return () => {
      Unsubscribe && Unsubscribe();
      // 컴포넌트가 언마운트될 때 실행되는 함수를 반환합니다. 이 함수는 useEffect 훅의 cleanup 함수로 사용됩니다.
      // 반환된 함수 내에서 unsubscribe && unsubscribe()를 사용하여 unsubscribe 함수가 정의되어 있을 때에만 호출합니다.
      // 이렇게 함으로써 unsubscribe 함수가 null이 아닌 경우에만 호출되고, unsubscribe 함수가 null일 경우 호출하지 않습니다.
      // 이를 통해 unsubscribe 함수가 아직 정의되지 않은 경우에는 호출하지 않도록 방지합니다.
      // 이렇게 함으로써 컴포넌트가 언마운트될 때 Firestore의 트윗 데이터 구독을 해제할 수 있습니다.
      // 이는 메모리 누수를 방지하고 성능을 향상시킵니다.
    };
  }, []);
  return (
    <Wrapper>
      {tweets.map(
        (
          tweet //tweets.map() 메서드를 사용하여 트윗 배열을 순회합니다.
        ) => (
          <Tweet
            onDelete={function () {
              throw new Error("Function not implemented.");
            }}
            key={tweet.id}
            {...tweet}
          />
          // key={tweet.id}를 사용하여 각 트윗 요소에 고유한 키를 제공합니다.
          // {...tweet}를 사용하여 트윗 객체를 props로 전달합니다.
        )
      )}
    </Wrapper>
  );
}
