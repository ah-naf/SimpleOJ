import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import AllSubmission from "../components/AllSubmission";
import ProblemEditor from "../components/ProblemEditor";
import ProblemStatement from "../components/ProblemStatement";
import { asyncSubmissionGet } from "../store/CodeSlice";
import { asyncSingleProblemGet } from "../store/ProblemSlice";
import { RootState } from "../store/store";

function ProblemPage() {
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const drawer = searchParams.get("drawer");
  const user = useSelector((state: RootState) => state.auth.user);
  const submissions = useSelector(
    (state: RootState) => state.code.userSubmission
  );

  useEffect(() => {
    dispatch(asyncSingleProblemGet(location) as any);
  }, [location]);
  
  useEffect(() => {
    if (user) dispatch(asyncSubmissionGet(location) as any);
  }, [user, location, drawer]);

  return (
    <div className="flex">
      <PanelGroup direction="horizontal">
        <Panel
          defaultSize={50}
          minSize={30}
          collapsible={true}
          collapsedSize={0}
        >
          <div className="flex-grow h-screen overflow-y-auto sc1 problemPage pb-2 relative">
            <div className="flex items-center font-mono font-bold justify-around absolute top-0 z-20 left-0 bg-[whitesmoke] shadow  h-full flex-col w-10">
              <button
                className={`h-1/2 w-full relative py-2 ${
                  drawer === "submission" && "shadow bg-gray-300/50 rounded "
                }`}
                onClick={() =>
                  navigate(`/problem/${location}?drawer=description`)
                }
              >
                <span className="absolute -rotate-90 font-bold font-sans left-1/2 -translate-x-1/2">
                  Description
                </span>
              </button>
              <button
                className={`h-1/2 w-full relative py-2 ${
                  (drawer === "description" || !drawer) &&
                  "shadow bg-gray-300/50 rounded"
                }`}
                onClick={() =>
                  navigate(`/problem/${location}?drawer=submission`)
                }
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
                <AllSubmission submissions={submissions} />
              )}
            </div>
          </div>
        </Panel>
        <PanelResizeHandle
          style={{ zIndex: "70", width: "7px" }}
          className="grid place-items-center hover:bg-gray-300 bg-[whitesmoke]"
        >
          <div className="flex flex-col justify-center items-center">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </PanelResizeHandle>

        {(drawer === "description" || !drawer) && (
          <Panel
            defaultSize={50}
            minSize={30}
            collapsible={true}
            collapsedSize={0}
          >
            <ProblemEditor />
          </Panel>
        )}
      </PanelGroup>
    </div>
  );
}

export default ProblemPage;
