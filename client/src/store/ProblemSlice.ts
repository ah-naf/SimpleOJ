import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TestcaseType } from "../utils/type";

const initialState: InitialStateType = {
  testcase: [],
};

export const ProblemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    addTestcase: (
      state: typeof initialState,
      action: PayloadAction<TestcaseType>
    ) => {
      state.testcase.push(action.payload);
      console.log(state.testcase)
    },
    removeTestcase: (state: typeof initialState, action: PayloadAction<number>) => {
        state.testcase = state.testcase.filter((item, index) => index !== action.payload)
    }
  },
});

export const { addTestcase, removeTestcase } = ProblemSlice.actions;

export default ProblemSlice.reducer;

interface InitialStateType {
  testcase: TestcaseType[];
}
