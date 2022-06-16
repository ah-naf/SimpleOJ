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
      <div className="flex-grow h-screen overflow-y-auto sc1 problemPage pb-2">
        <div className="flex items-center font-mono font-bold justify-around">
          <button
            className={`w-full py-2 ${
              drawer === "submission" && "shadow bg-[whitesmoke] rounded"
            }`}
            // onClick={() => dispatch(setDrawer("description"))}
            onClick={() => navigate(`/problem/${location}?drawer=description`)}
          >
            <span>Description</span>
          </button>
          <button
            className={`w-full py-2 ${
              (drawer === "description" || !drawer) && "shadow bg-[whitesmoke] rounded"
            }`}
            // onClick={() => dispatch(setDrawer("submission"))}
            onClick={() => navigate(`/problem/${location}?drawer=submission`)}
          >
            <span>Submission</span>
          </button>
        </div>
        <div className="px-5 mt-4">
          {drawer === "description" || !drawer ? (
            <ProblemStatement />
          ) : (
            <AllSubmission />
          )}
        </div>
      </div>
      <ProblemEditor />
    </div>
  );
}

export default ProblemPage;
