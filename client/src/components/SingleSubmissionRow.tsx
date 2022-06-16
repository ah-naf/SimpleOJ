import React from "react";
import { UserSubmissionType } from "../utils/type";
import moment from "moment";

export default function SingleSubmissionRow({submission}: {submission: UserSubmissionType}) {
  console.log()
  return (
    <tr className="h-12 text-md even:bg-[white] odd:bg-slate-100 font-mono">
      <td className="pl-3 border">{moment(submission.submittedAt).format('LLL')}</td>
      <td className={`pl-3 border ${submission.verdict === 'ac' ? 'text-green-600' : 'text-red-600'} font-bold underline cursor-pointer`}>
        {submission.verdict === 'ac' ? 'Accpeted' : submission.verdict === 'wa' ? 'Wrong Answer' : "Time Limit Exceed"}
      </td>
      <td className="pl-3 border">{moment(submission.completedAt).diff(moment(submission.startedAt), "seconds", true)}</td>
      <td className="pl-3 border">{submission.language}</td>
    </tr>
  );
}
