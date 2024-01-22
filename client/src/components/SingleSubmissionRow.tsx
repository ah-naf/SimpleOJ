import moment from "moment";
import { useDispatch } from "react-redux";
import {
  asyncSubmissionContent,
  setSubmissionId,
} from "../store/submissionSlice";
import { UserSubmissionType } from "../utils/type";

export default function SingleSubmissionRow({
  submission,
}: {
  submission: UserSubmissionType;
}) {
  const dispatch = useDispatch();
  // console.log(submission)
  const handleCodeFetch = () => {
    dispatch(asyncSubmissionContent((submission as any)._id) as any);
    dispatch(setSubmissionId(submission as any) as any);
  };

  return (
    <>
      <tr className="h-12 text-md even:bg-[white] odd:bg-slate-100 font-mono">
        <td className="pl-3 border">
          {moment(submission.submittedAt).format("LLL")}
        </td>
        <td className="pl-3 border">{submission.userId.email}</td>
        <td className="pl-3 border">{submission.problemId.slug}</td>
        <td
          className={`pl-3 border ${
            submission.verdict === "ac" ? "text-green-600" : "text-red-600"
          } font-bold underline cursor-pointer`}
        >
          <button className="hover:underline" onClick={handleCodeFetch}>
            <span>
              {submission.verdict === "ac"
                ? "Accpeted"
                : submission.verdict === "wa"
                ? "Wrong Answer"
                : "Time Limit Exceed"}
            </span>
          </button>
        </td>
        <td className="pl-3 border">
          {moment(submission.completedAt).diff(
            moment(submission.startedAt),
            "seconds",
            true
          )}
        </td>
        <td className="pl-3 border">{submission.language}</td>
      </tr>
    </>
  );
}
