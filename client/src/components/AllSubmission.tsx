import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { UserSubmissionType } from "../utils/type";
import ShowSubmission from "./ShowSubmission";
import SingleSubmissionRow from "./SingleSubmissionRow";

export default function AllSubmission({
  submissions,
  all = false,
}: {
  submissions: UserSubmissionType[];
  all?: boolean;
}) {
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.code.loading);

  if (!user && !all)
    return (
      <div className="grid place-items-center">
        <h1 className="text-3xl">Login to see your previous submission</h1>
      </div>
    );

  return (
    <div className="max-w-5xl m-auto">
      {!all && user && (
        <h3 className="text-gray-600 mb-4">
          {user.displayName + "'s"} Submission
        </h3>
      )}
      {loading ? (
        <Loading />
      ) : submissions.length ? (
        <>
          <table className="table-auto w-full border shadow rounded">
            <thead>
              <tr className="h-12 text-lg font-sans">
                <td className="pl-3 border">Time Submitted</td>
                <td className="pl-3 border">User</td>
                <td className="pl-3 border">Problem</td>
                <td className="pl-3 border">Status</td>
                <td className="pl-3 border">Runtime</td>
                <td className="pl-3 border">Language</td>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item, index) => (
                <SingleSubmissionRow key={index} submission={item} />
              ))}
            </tbody>
          </table>
          <ShowSubmission />
        </>
      ) : (
        <div>
          <p className="font-mono text-lg">No Previous Submission Found.</p>
        </div>
      )}
    </div>
  );
}

function Loading() {
  return (
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
  );
}
