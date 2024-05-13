import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";
import profileReducer from "./reducers/profileReducer";
import pwResetReducer from "./reducers/pwResetReducer";
import listReducer from "./reducers/listReducer";
import userReducer from "./reducers/userReducer";
import tweetsReducer from "./reducers/tweetsReducer";
const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    pwReset: pwResetReducer,
    list: listReducer,
    user: userReducer,
    tweets: tweetsReducer,
  },
});

export default store;
