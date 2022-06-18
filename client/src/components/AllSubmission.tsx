import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSubmissionGet } from "../store/CodeSlice";
import { RootState } from "../store/store";
import SingleSubmissionRow from "./SingleSubmissionRow";

export default function AllSubmission() {
  const user = useSelector((state: RootState) => state.auth.user); 
  const dispatch = useDispatch()
  const userSubmission = useSelector((state: RootState) => state.code.userSubmission)
  const problem = useSelector((state: RootState) => state.problem.singleProblem)
  const loading = useSelector((state:RootState) => state.code.loading)

  useEffect(() => {
    if(user && problem) dispatch(asyncSubmissionGet(problem?._id) as any)
  }, [user, problem])

  if (!user)
    return (
      <div className="grid place-items-center">
        <h1 className="text-3xl">Login to see your previous submission</h1>
      </div>
    );

  return (
    <div className="max-w-5xl m-auto">
      <h3 className="text-gray-600 mb-4">
        {user.displayName + "'s"} Submission
      </h3>
      {loading ? (
        <div className="border border-blue-300 shadow rounded-md p-4">
          <div className="flex animate-pulse w-full justify-between">
            <div className="w-[23%] h-3 rounded bg-slate-700"></div>
            <div className="w-[23%] h-3 rounded bg-slate-700"></div>
            <div className="w-[23%] h-3 rounded bg-slate-700"></div>
            <div className="w-[23%] h-3 rounded bg-slate-700"></div>
          </div>
          <div className="flex animate-pulse w-full justify-between mt-4">
            <div className="w-[23%] h-2 rounded bg-slate-700"></div>
            <div className="w-[23%] h-2 rounded bg-slate-700"></div>
            <div className="w-[23%] h-2 rounded bg-slate-700"></div>
            <div className="w-[23%] h-2 rounded bg-slate-700"></div>
          </div>
          <div className="flex animate-pulse w-full justify-between mt-4">
            <div className="w-[23%] h-2 rounded bg-slate-700"></div>
            <div className="w-[23%] h-2 rounded bg-slate-700"></div>
            <div className="w-[23%] h-2 rounded bg-slate-700"></div>
            <div className="w-[23%] h-2 rounded bg-slate-700"></div>
          </div>
        </div>
      ) : userSubmission.length ? (
        <table className="table-auto w-full border shadow rounded">
          <thead>
            <tr className="h-12 text-lg font-sans">
              <td className="pl-3 border">Time Submitted</td>
              <td className="pl-3 border">Status</td>
              <td className="pl-3 border">Runtime</td>
              <td className="pl-3 border">Language</td>
            </tr>
          </thead>
          <tbody>
            {userSubmission.map((item, index) => (
              <SingleSubmissionRow key={index} submission={item} />
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p className="font-mono text-lg">No Previous Submission Found.</p>
        </div>
      )}
    </div>
  );
}
