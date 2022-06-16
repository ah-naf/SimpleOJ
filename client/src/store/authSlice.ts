import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { UserType } from "../utils/type";

const initialState: InitialStateType = {
  user: undefined
};

const URL = 'http://localhost:5000/api'

export const asyncLogin = createAsyncThunk(
  "auth/asyncLogin",
  async () => {
    const res = await fetch(`${URL}/auth/success`, {credentials: 'include'});
    const data = await res.json();
    if (res.ok) {
      return data;
    }
  }
);

export const asyncLogout = createAsyncThunk(
  "auth/asyncLogout",
  async () => {
    const res = await fetch(`${URL}/auth/logout`, {credentials: 'include'});
    const data = await res.json();
    return undefined
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: InitialStateType, action: PayloadAction<UserType>) => {
        
    }
  },
  extraReducers: {
    [asyncLogin.fulfilled.type]: (state, action) => {
        state.user = action.payload
    },
    [asyncLogout.fulfilled.type]: (state, action) => {
      state.user = action.payload
  }
  },
});

export const { setUser } = AuthSlice.actions;

export default AuthSlice.reducer;

interface InitialStateType {
    user: UserType | undefined
}
