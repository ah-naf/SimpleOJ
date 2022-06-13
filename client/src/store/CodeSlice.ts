import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState: InitialStateType = {
  currentCode: "",
  currentLang: ""
};


export const asyncProblemGet = createAsyncThunk(
  "problem/getProblem",
  async () => {
    const res = await fetch("http://localhost:5000/problems");
    const data = await res.json();
    if (res.ok) {
      return data;
    } else toast.error(JSON.stringify(data));
  }
);



export const CodeSlice = createSlice({
  name: "Code",
  initialState,
  reducers: {
    setCurrentCode: (state: InitialStateType, action: PayloadAction<string>) => {
        state.currentCode = action.payload
    },
    setCurrentLang: (state: InitialStateType, action: PayloadAction<string>) => {
        state.currentLang = action.payload
    }
  }
});

export const { setCurrentCode, setCurrentLang } = CodeSlice.actions;

export default CodeSlice.reducer;

interface InitialStateType {
  currentCode: string
  currentLang: string
}
