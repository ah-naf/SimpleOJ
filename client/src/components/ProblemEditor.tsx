import { Loading } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { asyncProgrammemRun, asyncProgrammemSubmit } from "../store/CodeSlice";
import { useGetProblemStatusQuery } from "../store/services/ProblemStatus";
import { RootState } from "../store/store";
import Editor from "./Editor";

export default function ProblemEditor() {
  const [drawerState, setDrawerState] = useState({
    bottomDrawer: "input",
    verdict: "",
    status: "in queue",
    output: "",
    userInput: "",
    jobId: "",
  });
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const drawer = searchParams.get("drawer");

  const {
    currentCode,
    currentLang,
    jobId: JobId,
    problem,
    user,
  } = useSelector((state: RootState) => ({
    currentCode: state.code.currentCode,
    currentLang: state.code.currentLang,
    jobId: state.code.jobId,
    problem: state.problem.singleProblem,
    user: state.auth.user,
  }));

  const problemData = useGetProblemStatusQuery(
    drawerState.jobId,
    !!drawerState.jobId ? { pollingInterval: 1000 } : { skip: true }
  );

  useEffect(() => {
    setDrawerState((prevState) => ({ ...prevState, jobId: JobId }));
  }, [JobId]);

  useEffect(() => {
    const { data } = problemData;
    if (data && data.job.status !== "in queue") {
      setDrawerState((prevState) => ({
        ...prevState,
        status: data.job.status,
        output: data.job.output,
        bottomDrawer: data.job.verdict ? "result" : prevState.bottomDrawer,
        verdict: data.job.verdict || prevState.verdict,
      }));
    }
  }, [problemData.data]);

  const handleInputChange = useCallback((e: string) => {
    setDrawerState((prevState) => ({
      ...prevState,
      userInput: e,
    }));
  }, []);

  const handleRun = useCallback(async () => {
    setDrawerState({
      ...drawerState,
      status: "in queue",
      output: "",
      bottomDrawer: "output",
    });
    dispatch(
      asyncProgrammemRun({
        currentCode,
        currentLang,
        userInput: drawerState.userInput,
      }) as any
    );
  }, [dispatch, currentCode, currentLang, drawerState.userInput]);

  const handleSubmit = useCallback(async () => {
    if (!user) {
      toast.error("Please sign in to submit code");
      return;
    }
    let problemId = "";
    if (problem && problem._id) problemId = problem._id;
    setDrawerState({
      ...drawerState,
      status: "in queue",
      output: "",
      verdict: "",
      bottomDrawer: "output",
    });
    dispatch(
      asyncProgrammemSubmit({
        currentCode,
        currentLang,
        userInput: drawerState.userInput,
        problemId,
        userId: user._id,
      }) as any
    );
  }, [
    user,
    dispatch,
    currentCode,
    currentLang,
    drawerState.userInput,
    problem?._id,
  ]);

  return (
    <div className="min-w-[45%] border problemPage border-r-0 pr-0 pb-0 p-3 flex flex-col overflow-hidden">
      {(drawer === "description" || !drawer) && (
        <>
          <div className="">
            <Editor />
          </div>
          <div className="bg-gray-100 text-sm text-gray-700 space-x-4 p-2">
            <button
              className={`${
                drawerState.bottomDrawer === "input" && "bg-white shadow"
              } p-2 px-4 rounded-md`}
              onClick={() =>
                setDrawerState({ ...drawerState, bottomDrawer: "input" })
              }
            >
              Custom Input
            </button>
            <button
              className={`${
                drawerState.bottomDrawer === "output" && "bg-white shadow"
              } p-2 px-4 rounded-md`}
              disabled={!drawerState.output}
              onClick={() =>
                setDrawerState({ ...drawerState, bottomDrawer: "output" })
              }
            >
              Output
            </button>
            <button
              className={`${
                drawerState.bottomDrawer === "result" && "bg-white shadow"
              } p-2 px-4 rounded-md`}
              onClick={() =>
                setDrawerState({ ...drawerState, bottomDrawer: "result" })
              }
            >
              Code Result
            </button>
          </div>
          <div className="bg-gray-100 flex-grow flex flex-col items-end p-4 pt-2 min-h-[125px]">
            {drawerState.bottomDrawer === "input" ? (
              <textarea
                className="bg-white flex-grow w-full border outline-none p-2 text-xs font-bold rounded-sm shadow"
                value={drawerState.userInput}
                onChange={(e) => handleInputChange(e.target.value)}
              ></textarea>
            ) : drawerState.bottomDrawer === "result" ? (
              <div
                className={`bg-white flex-grow w-full border ${
                  drawerState.verdict === "ac"
                    ? "border-green-600"
                    : drawerState.verdict === "wa"
                    ? "border-red-600"
                    : drawerState.verdict === "tle"
                    ? "border-red-800"
                    : "border-slate-700"
                } outline-none p-2 text-xl grid place-items-center font-bold rounded-sm shadow`}
              >
                {drawerState.verdict === "ac" && (
                  <span className="text-green-600">ACCPETED</span>
                )}
                {drawerState.verdict === "wa" && (
                  <span className="text-red-600">WRONG ANSWER</span>
                )}
                {drawerState.verdict === "tle" && (
                  <span className="text-red-800">TIME LIMIT EXCEEDED</span>
                )}
                {drawerState.verdict === "" && (
                  <span className="text-slate-800">
                    SUBMIT YOUR CODE FIRST.
                  </span>
                )}
              </div>
            ) : (
              <div className="w-full h-full bg-white rounded shadow">
                {drawerState.status === "in queue" ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <Loading size="xl" type="points-opacity" />
                    <span className="font-mono mt-2 font-bold text-blue-600">
                      Submission is in queue...
                    </span>
                  </div>
                ) : (
                  <textarea
                    className="font-mono text-sm p-2 h-full w-full px-4 outline-none textarea"
                    value={drawerState.output}
                    readOnly
                  ></textarea>
                )}
              </div>
            )}
            <div className="space-x-4 text-sm mt-3">
              <button
                className="p-2 shadow-md  px-8 border bg-white rounded-lg"
                onClick={handleRun}
              >
                Run
              </button>
              <button
                className="p-2 shadow-md font-semibold px-8 border bg-slate-600 text-white rounded-lg"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
