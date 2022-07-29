import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TestcaseType } from "../utils/type";
import MDEditor from "@uiw/react-md-editor";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { asyncProblemDelete } from "../store/ProblemSlice";

export default function ProblemStatement() {
  const problem = useSelector(
    (state: RootState) => state.problem.singleProblem
  );
  const [sampleTestcase, setSampleTestcase] = useState<TestcaseType[]>([]);
  const loading = useSelector((state: RootState) => state.problem.loading);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (problem?.testcase) {
      const temp = problem?.testcase.filter((item) => item.sample === true);
      setSampleTestcase(temp);
    }
  }, [problem?.testcase]);

  const copyUserInput = async (input: string) => {
    try {
      await navigator.clipboard.writeText(input);
      toast.success("Input Copied successfully");
      // console.log(codeRef)
    } catch (error) {
      console.log(error);
      toast.error("Something wrong happened");
    }
  };

  const handleDelete = () => {
    if(problem) dispatch(asyncProblemDelete(problem?._id) as any)
  }

  return (
    <div className="relative">
      {!loading ? (
        <>
          <div className="absolute right-0 flex space-x-2">
            <button
              className="group p-1 rounded-sm border border-black hover:bg-black"
              title="Edit Problem"
              onClick={() =>
                navigate(`/create?edit=true&problemId=${problem?._id}`)
              }
              hidden={user?._id !== problem?.createdBy}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                className="fill-black group-hover:fill-white"
              >
                {" "}
                <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"></path>
              </svg>
            </button>
            <button
              className="group p-1 rounded-sm border border-black hover:bg-red-500 hover:border-red-500"
              title="Delete Problem"
              onClick={handleDelete}
              hidden={user?._id !== problem?.createdBy}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="15"
                height="15"
                viewBox="0 0 30 30"
                className="fill-black group-hover:fill-white"
              >
                <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
              </svg>
            </button>
          </div>
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
                  <p className="whitespace-pre-wrap bg-slate-300 p-4 rounded font-mono text-lg relative">
                    {item.input}
                    <button
                      className="absolute top-0 right-0 font-mono text-xs bg-transparent text-black border border-black p-1 px-2 rounded hover:text-black hover:bg-white font-bold"
                      onClick={() => copyUserInput(item.input)}
                    >
                      COPY
                    </button>
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
        </>
      ) : (
        <div className="rounded-md p-4 max-w-[90%] w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded w-4/5 m-auto"></div>
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="space-y-8">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
