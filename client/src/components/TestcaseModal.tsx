import { Modal, useModal, Button, Text } from "@nextui-org/react";

export default function TestcaseModal() {
  const { setVisible, bindings } = useModal(true);
  return (
    <div>
      <button onClick={() => setVisible(true)} className="outline-none border shadow bg-slate-100 text-gray-700 border-slate-600 rounded-sm font-mono font-semibold px-5 py-2">
          Add Testcase
        </button>
      <Modal
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <h1 className="text-xl">Add Custom Testcase</h1>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col font-mono font-semibold">
            <label htmlFor="">Input</label>
            <textarea className="border border-slate-400 rounded-sm mb-4 mt-1 outline-none p-2" name="" id=""></textarea>
            <label htmlFor="">Output</label>
            <textarea className="border border-slate-400 rounded-sm mb-4 mt-1 outline-none p-2" name="" id=""></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
          <Button auto onClick={() => setVisible(false)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
