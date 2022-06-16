import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSubmissionGet } from "../store/CodeSlice";
import { RootState } from "../store/store";
import SingleSubmissionRow from "./SingleSubmissionRow";

export default function AllSubmission() {
  const user = useSelector((state: RootState) => state.auth.user); 
  const dispatch = useDispatch()
  const userSubmission = useSelector((state: RootState) => state.code.userSubmission)

  useEffect(() => {
    if(user) dispatch(asyncSubmissionGet(user?._id) as any)
  }, [user])

  if (!user)
    return (
      <div className="grid place-items-center">
        <h1 className="text-3xl">Login to see your previous submission</h1>
      </div>
    );

  return (
    <div>
      <h3 className="text-gray-600 mb-4">{user.displayName+"'s"} Submission</h3>
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
          {userSubmission.map((item, index) => <SingleSubmissionRow key={index} submission={item} />)}
        </tbody>
      </table>
    </div>
  );
}
