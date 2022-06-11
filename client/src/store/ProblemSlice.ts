import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { PropblemDetailType, TestcaseType } from "../utils/type";

const initialState: InitialStateType = {
  testcase: [],
  loading: false,
};

export const asyncProblemAdd = createAsyncThunk(
  "problem/addProblem",
  async ({
    detail,
    testcase,
  }: {
    detail: PropblemDetailType;
    testcase: TestcaseType[];
  }) => {
    const res = await fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ detail, testcase }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success('Problem added successfully...')
      window.location.href = '/'
      return data;
    } else toast.error(JSON.stringify(data));
  }
);

export const ProblemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    addTestcase: (
      state: typeof initialState,
      action: PayloadAction<TestcaseType>
    ) => {
      state.testcase.push(action.payload);
      console.log(state.testcase);
    },
    removeTestcase: (
      state: typeof initialState,
      action: PayloadAction<number>
    ) => {
      state.testcase = state.testcase.filter(
        (item, index) => index !== action.payload
      );
    },
  },
  extraReducers: {
    [asyncProblemAdd.pending.type]: (state, action) => {
      state.loading = true;
    },
    [asyncProblemAdd.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [asyncProblemAdd.rejected.type]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { addTestcase, removeTestcase } = ProblemSlice.actions;

export default ProblemSlice.reducer;

interface InitialStateType {
  testcase: TestcaseType[];
  loading: boolean;
}
