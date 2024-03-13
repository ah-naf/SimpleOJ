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
  console.log(submission);
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
        <td className="pl-3 border">{submission.userId?.email}</td>
        <td className="pl-3 border">{submission.problemId?.slug}</td>
        <td
          className={`pl-3 border ${
            submission.verdict === "ac" ? "text-green-600" : "text-red-600"
          } font-bold underline cursor-pointer`}
        >
          <button className="hover:underline" onClick={handleCodeFetch}>
            <span className="capitalize">{renderStatus(submission)}</span>
          </button>
        </td>
        <td className="pl-3 border">
          {moment(submission.completedAt).diff(
            moment(submission.startedAt),
            "seconds",
            true
          ) / 2}
        </td>
        <td className="pl-3 border">{renderLanguage(submission.language)}</td>
      </tr>
    </>
  );
}

function renderLanguage(language: string) {
  switch (language) {
    case "cpp":
      return "C++";
    case "c":
      return "C";
    case "py":
      return "Python";
    default:
      return language;
  }
}

function renderStatus(submission: { status?: string; verdict?: string }) {
  if (submission.status === "c_error") {
    return "Compilation Error";
  } else if (submission.status === "r_error") {
    return "Runtime Error";
  } else if (submission.status === "success") {
    switch (submission.verdict) {
      case "ac":
        return "Accepted";
      case "wa":
        return "Wrong Answer";
      default:
        return "Time Limit Exceed";
    }
  } else {
    return submission.status; // For any other status
  }
}
