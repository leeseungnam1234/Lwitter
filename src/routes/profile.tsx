import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";

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

export default function Profile() {
    const user = auth.currentUser;
    const [avatar, setAvatar] = useState(user?.photoURL);
    const [tweets, setTweets] = useState<ITweet[]>([]);

    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!user) return;
        if (files && files.length === 1) {
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            setAvatar(avatarUrl);
            await updateProfile(user, {
                photoURL: avatarUrl,
            });
        }
    };

    const fetchTweets = async () => {
        const tweetQuery = query(
            collection(db, "tweets"),
            where("userId", "==", user?.uid),
            orderBy("createdAt", "desc"),
            limit(25)
        );
        const snapshot = await getDocs(tweetQuery);
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
        setTweets(tweets);
    };

    const handleDelete = async (tweetId: string) => {
        const tweetToDelete = tweets.find((tweet) => tweet.id === tweetId);
        if (!tweetToDelete) return;

        const ok = window.confirm("정말로 삭제하시겠습니까?");
        if (!ok || !user || user.uid !== tweetToDelete.userId) return;

        try {
            await deleteDoc(doc(db, "tweets", tweetId));
            if (tweetToDelete.photo) {
                const photoRef = ref(storage, `tweets/${user.uid}/${tweetId}`);
                await deleteObject(photoRef);
            }
            // Remove the deleted tweet from state
            setTweets((prevTweets) => prevTweets.filter((tweet) => tweet.id !== tweetId));
        } catch (error) {
            console.error("Error deleting tweet:", error);
        }
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    return (
        <Wrapper>
            <AvatarUpload htmlFor="avatar">
                {avatar ? <AvatarImg src={avatar} /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>}
            </AvatarUpload>
            <AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*" />
            <Name>{user?.displayName ?? "익명"}</Name>
            <Tweets>
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} {...tweet} onDelete={() => handleDelete(tweet.id)} />
                ))}
            </Tweets>
        </Wrapper>
    );
}
