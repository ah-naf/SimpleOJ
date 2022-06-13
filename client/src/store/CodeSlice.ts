import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState: InitialStateType = {
  currentCode: "",
  currentLang: "",
  codeLoading: false,
  codeOutput: "",
  jobId: ""
};

export const asyncProgrammemRun = createAsyncThunk(
  "code/runProgramme",
  async ({
    currentCode,
    currentLang,
    userInput
  }: {
    currentCode: string;
    currentLang: string;
    userInput: string
  }) => {
    const res = await fetch("http://localhost:5000/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: currentCode, language: currentLang, userInput }),
    });
    const data = await res.json();
    
    if(res.ok) return data.jobId
    else {
      toast.error(data)
    }
  }
);

export const CodeSlice = createSlice({
  name: "Code",
  initialState,
  reducers: {
    setCurrentCode: (
      state: InitialStateType,
      action: PayloadAction<string>
    ) => {
      state.currentCode = action.payload;
    },
    setCurrentLang: (
      state: InitialStateType,
      action: PayloadAction<string>
    ) => {
      state.currentLang = action.payload;
    },
  },
  extraReducers: {
    [asyncProgrammemRun.pending.type]: (state) => {
      state.codeLoading = true;
    },
    [asyncProgrammemRun.fulfilled.type]: (state, action) => {
      state.codeLoading = false;
      state.jobId = action.payload
    },
  },
});

export const { setCurrentCode, setCurrentLang } = CodeSlice.actions;

export default CodeSlice.reducer;

interface InitialStateType {
  currentCode: string;
  currentLang: string;
  codeLoading: boolean;
  codeOutput: string
  jobId: string
}
