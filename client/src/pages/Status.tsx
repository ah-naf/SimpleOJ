import { useEffect, useState } from "react";
import AllSubmission from "../components/AllSubmission";

function Status() {
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/code/submissions", {
          credentials: "include",
        });
        const data = await res.json();
        setSubmissions(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      {loading ? (
        <Loading />
      ) : (
        <AllSubmission submissions={submissions} all={true} />
      )}
    </div>
  );
}

export default Status;

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
