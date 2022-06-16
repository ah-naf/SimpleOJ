import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import AllSubmission from "../components/AllSubmission";
import ProblemEditor from "../components/ProblemEditor";
import ProblemStatement from "../components/ProblemStatement";
import { asyncSingleProblemGet } from "../store/ProblemSlice";
import { RootState } from "../store/store";

function ProblemPage() {
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const drawer = searchParams.get("drawer");

  useEffect(() => {
    dispatch(asyncSingleProblemGet(location) as any);
  }, []);

  return (
    <div className="flex">
      <div className="flex-grow h-screen overflow-y-auto sc1 problemPage pb-2 relative">
        <div className="flex items-center font-mono font-bold justify-around fixed top-0 z-20 bg-[whitesmoke] shadow  h-full flex-col w-10">
          <button
            className={`h-1/2 w-full relative py-2 ${
              drawer === "submission" && "shadow bg-gray-300 rounded "
            }`}
            // onClick={() => dispatch(setDrawer("description"))}
            onClick={() => navigate(`/problem/${location}?drawer=description`)}
          >
            <span className="absolute -rotate-90 font-bold font-sans left-1/2 -translate-x-1/2">
              Description
            </span>
          </button>
          <button
            className={`h-1/2 w-full relative py-2 ${
              (drawer === "description" || !drawer) &&
              "shadow bg-gray-300 rounded"
            }`}
            // onClick={() => dispatch(setDrawer("submission"))}
            onClick={() => navigate(`/problem/${location}?drawer=submission`)}
          >
            <span className="absolute font-bold -rotate-90 font-sans left-1/2 -translate-x-1/2">
              Submission
            </span>
          </button>
        </div>
        <div className="px-4 pl-16 mt-4">
          {drawer === "description" || !drawer ? (
            <ProblemStatement />
          ) : (
            <AllSubmission />
          )}
        </div>
      </div>
      {(drawer === "description" || !drawer) && <ProblemEditor />}
    </div>
  );
}

export default ProblemPage;
