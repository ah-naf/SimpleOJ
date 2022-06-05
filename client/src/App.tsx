import React, { useState } from "react";

import Editor from "./components/Editor";

function App() {
  const [bottomDrawer, setBottomDrawer] = useState("input");
  const [verdict, setVerdict] = useState("tle");

  return (
    <div className="min-h-screen flex">
      <div className="flex-grow">
        <p>lorem0</p>
      </div>
      <div className="min-w-[45%] border border-r-0 pr-0 pb-0 p-3 flex flex-col">
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

export default App;
