import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Editor from "../components/Editor";
import { asyncSingleProblemGet } from "../store/ProblemSlice";
import { RootState } from "../store/store";
import { TestcaseType } from "../utils/type";

function ProblemPage() {
  const [bottomDrawer, setBottomDrawer] = useState("input");
  const [verdict, setVerdict] = useState("tle");
  const dispatch = useDispatch();
  const problem = useSelector(
    (state: RootState) => state.problem.singleProblem
  );
  const location = useLocation().pathname.split("/")[2];
  const [sampleTestcase, setSampleTestcase] = useState<TestcaseType[]>([]);

  useEffect(() => {
    if (problem?.testcase) {
      const temp = problem?.testcase.filter((item) => item.sample === true);
      setSampleTestcase(temp);
    }
  }, [problem?.testcase]);

  useEffect(() => {
    dispatch(asyncSingleProblemGet(location) as any);
  }, []);

  return (
    <div className="flex">
      <div className="flex-grow h-screen overflow-y-auto sc1 problemPage p-2 px-5">
        <h1 className="text-3xl py-3 border-b capitalize mb-8 text-center">
          {problem?.title}
        </h1>
        <MDEditor.Markdown source={problem?.statement} />
        {problem?.input && (
          <div className="my-6">
            <h2 className="text-lg mb-2">Input Format</h2>
            <MDEditor.Markdown source={problem?.input} />
          </div>
        )}
        {problem?.output && (
          <div className="my-6">
            <h2 className="text-lg mb-2">Output Format</h2>
            <MDEditor.Markdown source={problem?.output} />
          </div>
        )}
        {problem?.constraints && (
          <div className="my-6">
            <h2 className="text-lg mb-2">Constraints</h2>
            <MDEditor.Markdown source={problem?.constraints} />
          </div>
        )}
        {sampleTestcase &&
          sampleTestcase.map((item, index) => (
            <div key={index}>
              <div className="my-6">
                <h2 className="text-lg mb-2">Sample Input {index + 1}</h2>
                <p className="whitespace-pre-wrap bg-slate-300 p-4 rounded font-mono text-lg">
                  {item.input}
                </p>
              </div>
              <div className="my-6">
                <h2 className="text-lg mb-2">Sample Output {index + 1}</h2>
                <p className="whitespace-pre-wrap bg-slate-300 p-4 rounded font-mono text-lg">
                  {item.output}
                </p>
              </div>
              {item.explanation && (
                <div className="my-6">
                  <h2 className="text-lg mb-2">Explanation</h2>
                  <MDEditor.Markdown source={item.explanation} />
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="min-w-[45%] border problemPage border-r-0 pr-0 pb-0 p-3 flex flex-col overflow-hidden">
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
            disabled
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
        <div className="bg-gray-100 flex-grow flex flex-col items-end p-4 pt-2">
          {bottomDrawer !== "result" ? (
            <textarea
              className="bg-white flex-grow w-full border outline-none p-2 text-sm font-bold rounded-sm shadow"
              readOnly={bottomDrawer === "output"}
            ></textarea>
          ) : (
            <div
              className={`bg-white flex-grow w-full border ${
                verdict === "ac"
                  ? "border-green-600"
                  : verdict === "wa"
                  ? "border-red-600"
                  : "border-red-800"
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
            </div>
          )}
          <div className="space-x-4 text-sm mt-3">
            <button className="p-2 shadow-md  px-8 border bg-white rounded-lg">
              Run
            </button>
            <button className="p-2 shadow-md font-semibold px-8 border bg-slate-600 text-white rounded-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemPage;
