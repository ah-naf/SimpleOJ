import { Modal } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function ShowSubmission() {
  const currentSubmission = useSelector(
    (state: RootState) => state.submission.currentSubmission
  );

  return (
    <div>
      <Modal closeButton open={!!currentSubmission}>
        <Modal.Header>Dummy header</Modal.Header>
        <Modal.Body>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, rerum.
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ShowSubmission;
