import { configureStore } from "@reduxjs/toolkit";
import CodeSlice from "./CodeSlice";
import ProblemSlice from "./ProblemSlice";
import authSlice from "./authSlice";
import { problemStatusApi } from "./services/ProblemStatus";
import submissionSlice from "./submissionSlice";

const store = configureStore({
  reducer: {
    problem: ProblemSlice,
    code: CodeSlice,
    auth: authSlice,
    submission: submissionSlice,
    [problemStatusApi.reducerPath]: problemStatusApi.reducer,
  },
  // TODO: uncomment devTools: false before deployment
  // devTools: false,

  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(problemStatusApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
