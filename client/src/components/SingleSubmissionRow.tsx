import React from "react";
import { UserSubmissionType } from "../utils/type";
import moment from "moment";
import { Popover } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { asyncSubmissionDownload } from "../store/CodeSlice";

export default function SingleSubmissionRow({submission}: {submission: UserSubmissionType}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch()

  const handleDownload = () => {
    dispatch(asyncSubmissionDownload((submission as any)._id) as any)
    setIsOpen(false)
  };

  return (
    <tr className="h-12 text-md even:bg-[white] odd:bg-slate-100 font-mono">
      <td className="pl-3 border">
        {moment(submission.submittedAt).format("LLL")}
      </td>
      <td
        className={`pl-3 border ${
          submission.verdict === "ac" ? "text-green-600" : "text-red-600"
        } font-bold underline cursor-pointer`}
      >
        <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger>
            <span>
              {submission.verdict === "ac"
                ? "Accpeted"
                : submission.verdict === "wa"
                ? "Wrong Answer"
                : "Time Limit Exceed"}
            </span>
          </Popover.Trigger>
          <Popover.Content>
            <div className="text-center p-2">
              <h2 className="text-xl mb-1 underline">Confirm</h2>
              <p className="m-0 mb-3">
                Are you sure you want to download this file?
              </p>
              <button className="w-1/2 py-2 font-bold active:bg-gray-100 rounded" onClick={() => setIsOpen(false)}>Cancel</button>
              <button className="w-1/2 py-2 rounded font-bold bg-green-400 text-white active:bg-green-600" onClick={handleDownload}>Download</button>
            </div>
          </Popover.Content>
        </Popover>
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
  );
}
