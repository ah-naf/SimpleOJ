import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import TestcaseContainer from "../components/TestcaseContainer";
import TestcaseModal from "../components/TestcaseModal";

export default function AddProblem() {
  const [problemDetail, setProblemDetail] = useState({
    slug: "",
    name: "",
    desc: "",
    statement: "",
    input: "",
    output: "",
    constraints: "",
  });

  return (
    <>
      <div className="max-w-4xl mx-auto font-mono my-4">
        <h1 className="text-4xl">Create Problem</h1>
        <p className="text-sm italic text-gray-500 my-2">
          Get started by providing the initial details needed to create a
          problem.
        </p>

        {/* Problem Details */}
        <div className="mt-8 space-y-8">
          <div className="flex">
            <p className="w-48 min-w-fit">Problem Slug</p>
            <input
              value={problemDetail.slug}
              onChange={(e) =>
                setProblemDetail({ ...problemDetail, slug: e.target.value })
              }
              type="text"
              className="flex-grow outline-none border-2 border-gray-400 p-2 rounded-sm shadow"
              required
              placeholder="Write problem slug. i.e problem123 (Should be unique)"
            />
          </div>
          <div className="flex">
            <p className="w-48 min-w-fit">Problem Name</p>
            <input
              value={problemDetail.name}
              onChange={(e) =>
                setProblemDetail({ ...problemDetail, name: e.target.value })
              }
              type="text"
              className="flex-grow outline-none border-2 border-gray-400 p-2 rounded-sm shadow"
              required
              placeholder="Write problem name"
            />
          </div>
          <div className="flex items-start">
            <p className="w-48 min-w-fit">Description</p>
            <textarea
              value={problemDetail.desc}
              onChange={(e) =>
                setProblemDetail({ ...problemDetail, desc: e.target.value })
              }
              rows={4}
              required
              className="flex-grow outline-none border-2 border-gray-400 p-2 rounded-sm shadow"
              placeholder="Write a short summary about the challange."
            />
          </div>
          <div className="flex items-start">
            <p className="w-48 min-w-fit">Problem Statement</p>
            <div className="flex-grow ">
              <MDEditor
                value={problemDetail.statement}
                onChange={(e) =>
                  setProblemDetail({ ...problemDetail, statement: e as string })
                }
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                preview="edit"
              />
            </div>
          </div>
          <div className="flex items-start">
            <p className="w-48 min-w-fit">Input Format</p>
            <div className="flex-grow ">
              <MDEditor
                value={problemDetail.input}
                onChange={(e) =>
                  setProblemDetail({ ...problemDetail, input: e as string })
                }
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                preview="edit"
              />
            </div>
          </div>
          <div className="flex items-start">
            <p className="w-48 min-w-fit">Output Format</p>
            <div className="flex-grow ">
              <MDEditor
                value={problemDetail.output}
                onChange={(e) =>
                  setProblemDetail({ ...problemDetail, output: e as string })
                }
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                preview="edit"
              />
            </div>
          </div>
          <div className="flex items-start">
            <p className="w-48 min-w-fit">Constraints</p>
            <div className="flex-grow ">
              <MDEditor
                value={problemDetail.constraints}
                onChange={(e) =>
                  setProblemDetail({
                    ...problemDetail,
                    constraints: e as string,
                  })
                }
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                preview="edit"
              />
            </div>
          </div>
        </div>

        {/* Problem Testcases */}
        <div className="w-full mt-8">
          <TestcaseContainer />
        </div>
      </div>
      <div className="sticky bottom-0 flex items-center justify-end p-4 z-50 border shadow bg-[whitesmoke] space-x-4">
        <TestcaseModal />
        <button className="outline-none border shadow bg-slate-600 text-gray-200 rounded-sm font-mono font-semibold px-5 py-2">
          Proceed
        </button>
      </div>
    </>
  );
}
