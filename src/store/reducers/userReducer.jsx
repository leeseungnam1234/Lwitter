import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    name: "",
    email: "",
    password: "",
    error: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setName, setEmail, setPassword, setError } =
  userSlice.actions;

export default userSlice.reducer;
