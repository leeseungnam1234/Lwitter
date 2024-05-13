import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const fetchTweets = createAsyncThunk("tweets/fetchTweets", async () => {
  const tweetsQuery = query(
    collection(db, "tweets"),
    orderBy("createdAt", "desc"),
    limit(15)
  );
  const querySnapshot = await getDocs(tweetsQuery);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
});

export const deleteTweet = createAsyncThunk(
  "tweets/deleteTweet",
  async (tweetId) => {
    const tweetRef = doc(db, "tweets", tweetId);
    await deleteDoc(tweetRef);
    return tweetId;
  }
);

const tweetsSlice = createSlice({
  name: "tweets",
  initialState: {
    tweets: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tweets = action.payload;
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.tweets = state.tweets.filter(
          (tweet) => tweet.id !== action.payload
        );
      });
  },
});

export default tweetsSlice.reducer;
