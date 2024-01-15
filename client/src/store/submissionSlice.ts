import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState: InitialStateType = {
  currentSubmission: "",
  submissionId: "",
  language: "",
};

const URL = "http://localhost:5000/api";

export const asyncSubmissionContent = createAsyncThunk(
  "code/fetchSubmissionContent",
  async (jobId: string) => {
    const res = await fetch(`${URL}/code/content/${jobId}`);
    const data = await res.json();
    if (res.ok) return data.content;
    else {
      toast.error(data);
    }
  }
);

export const SubmissionSlice = createSlice({
  name: "Code",
  initialState,
  reducers: {
    setSubmissionId: (state, { payload }) => {
      state.submissionId = payload._id;
      state.language = payload.language;
    },
    clearSubmission: (state) => {
      state.submissionId = "";
      state.currentSubmission = "";
      state.language = "";
    },
  },
  extraReducers: {
    [asyncSubmissionContent.fulfilled.type]: (state, action) => {
      state.currentSubmission = action.payload;
    },
  },
});

export const { setSubmissionId, clearSubmission } = SubmissionSlice.actions;

export default SubmissionSlice.reducer;

interface InitialStateType {
  submissionId: string;
  currentSubmission: string;
  language: string;
}
