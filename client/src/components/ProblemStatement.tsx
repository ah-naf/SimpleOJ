import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TestcaseType } from "../utils/type";
import MDEditor from "@uiw/react-md-editor";
import toast from "react-hot-toast";

export default function ProblemStatement() {
  const problem = useSelector(
    (state: RootState) => state.problem.singleProblem
  );
  const [sampleTestcase, setSampleTestcase] = useState<TestcaseType[]>([]);

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

  return (
    <>
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
  );
}
