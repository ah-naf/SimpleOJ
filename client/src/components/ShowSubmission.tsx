import { Modal } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import stubs from "../codeStub";
import { RootState } from "../store/store";
import { clearSubmission } from "../store/submissionSlice";
import CodeEditor from "./CodeEditor";

function ShowSubmission() {
  const dispatch = useDispatch();
  const currentSubmission = useSelector(
    (state: RootState) => state.submission.currentSubmission
  );
  const submissionId = useSelector(
    (state: RootState) => state.submission.submissionId
  );
  const submissionLanguage = useSelector(
    (state: RootState) => state.submission.language
  );

  return (
    <div>
      <Modal
        closeButton
        open={!!currentSubmission}
        width="800px"
        onClose={() => {
          dispatch(clearSubmission() as any);
        }}
      >
        <Modal.Header>
          <p className="font-medium tracking-wide text-lg">
            Submission - #{submissionId}
          </p>
        </Modal.Header>
        <Modal.Body>
          <div>
            <CodeEditor
              language={submissionLanguage}
              codeStub={{ ...stubs, [submissionLanguage]: currentSubmission }}
              disabled={true}
              theme="zenburn"
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ShowSubmission;
