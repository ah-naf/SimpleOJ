import { Loading } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { asyncProgrammemRun, asyncProgrammemSubmit } from "../store/CodeSlice";
import { useGetProblemStatusQuery } from "../store/services/ProblemStatus";
import { RootState } from "../store/store";
import Editor from "./Editor";
import SubmissionCode from "./SubmissionCode";

export default function ProblemEditor() {
  const [bottomDrawer, setBottomDrawer] = useState("input");
  const [verdict, setVerdict] = useState("");
  const [status, setStatus] = useState("in queue");
  const [output, setOutput] = useState("");
  const [userInput, setUserInput] = useState("");
  const currentCode = useSelector((state: RootState) => state.code.currentCode);
  const currentLang = useSelector((state: RootState) => state.code.currentLang);
  const [skip, setSkip] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const problem = useSelector(
    (state: RootState) => state.problem.singleProblem
  );
  const JobId = useSelector((state: RootState) => state.code.jobId);
  const [jobId, setJobId] = useState("");
  const [searchParams] = useSearchParams();
  const drawer = searchParams.get("drawer");

  useEffect(() => {
    setJobId(JobId);
  }, [JobId]);
 
  // Status polling
  const problemData = useGetProblemStatusQuery(
    jobId,
    !!jobId && !skip ? { pollingInterval: 1000 } : { skip: true }
  );

  useEffect(() => {
    const { data } = problemData;
    console.log(problemData);
    if (data) {
      if (data.job.status !== "in queue") {
        setSkip(true);
        setStatus(data.job.status);
        setOutput(data.job.output);
        if (data.job.verdict) {
          setBottomDrawer("result");
          setVerdict(data.job.verdict);
          setOutput("");
        }
      }
    }
  }, [problemData.data]);



  const handleRun = async () => {
    setSkip(false);
    setBottomDrawer("output");
    setOutput("");
    setStatus("in queue");
    dispatch(
      asyncProgrammemRun({ currentCode, currentLang, userInput }) as any
    );
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to submit code");
      return;
    }
    setSkip(false);
    setBottomDrawer("output");
    setOutput("");
    setStatus("in queue");
    setVerdict("");
    dispatch(
      asyncProgrammemSubmit({
        currentCode,
        currentLang,
        userInput,
        problemId: problem?._id as string,
        userId: user._id,
      }) as any
    );
  };

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
                bottomDrawer === "input" && "bg-white shadow"
              } p-2 px-4 rounded-md`}
              onClick={() => setBottomDrawer("input")}
            >
              Custom Input
            </button>
            <button
              className={`${
                bottomDrawer === "output" && "bg-white shadow"
              } p-2 px-4 rounded-md`}
              disabled={!output}
              onClick={() => setBottomDrawer("output")}
            >
              Output
            </button>
            <button
              className={`${
                bottomDrawer === "result" && "bg-white shadow"
              } p-2 px-4 rounded-md`}
              onClick={() => setBottomDrawer("result")}
            >
              Code Result
            </button>
          </div>
          <div className="bg-gray-100 flex-grow flex flex-col items-end p-4 pt-2 min-h-[125px]">
            {bottomDrawer === "input" ? (
              <textarea
                className="bg-white flex-grow w-full border outline-none p-2 text-xs font-bold rounded-sm shadow"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              ></textarea>
            ) : bottomDrawer === "result" ? (
              <div
                className={`bg-white flex-grow w-full border ${
                  verdict === "ac"
                    ? "border-green-600"
                    : verdict === "wa"
                    ? "border-red-600"
                    : verdict === "tle"
                    ? "border-red-800"
                    : "border-slate-700"
                } outline-none p-2 text-xl grid place-items-center font-bold rounded-sm shadow`}
              >
                {verdict === "ac" && (
                  <span className="text-green-600">ACCPETED</span>
                )}
                {verdict === "wa" && (
                  <span className="text-red-600">WRONG ANSWER</span>
                )}
                {verdict === "tle" && (
                  <span className="text-red-800">TIME LIMIT EXCEEDED</span>
                )}
                {verdict === "" && (
                  <span className="text-slate-800">
                    SUBMIT YOUR CODE FIRST.
                  </span>
                )}
              </div>
            ) : (
              <div className="w-full h-full bg-white rounded shadow">
                {status === "in queue" ? (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <Loading size="xl" type="points-opacity" />
                    <span className="font-mono mt-2 font-bold text-blue-600">
                      Submission is in queue...
                    </span>
                  </div>
                ) : (
                  <textarea
                    className="font-mono text-sm p-2 h-full w-full px-4 outline-none textarea"
                    value={output}
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
