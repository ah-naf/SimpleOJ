import { Modal, useModal, Button, Checkbox } from "@nextui-org/react";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";

export default function TestcaseModal() {
  const { setVisible, bindings } = useModal();
  const [selected, setSelected] = useState(true);
  const [value, setValue] = useState("**Hello world!!!**");

  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        className="outline-none border shadow bg-slate-100 text-gray-700 border-slate-600 rounded-sm font-mono font-semibold px-5 py-2"
      >
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
            <textarea
              className="border border-slate-400 rounded-sm mb-4 mt-1 outline-none p-2"
              name=""
              id=""
            ></textarea>
            <label htmlFor="">Output</label>
            <textarea
              className="border border-slate-400 rounded-sm mb-2 mt-1 outline-none p-2"
              name=""
              id=""
            ></textarea>
          </div>
          <Checkbox
            isSelected={selected}
            color="primary"
            onChange={setSelected}
          >
            Sample test case
          </Checkbox>
          {selected && (
            <div className="flex flex-col font-mono font-semibold modal-explanation">
              <label className="mb-2 text-md">Explanation</label>
              <MDEditor
                value={value}
                onChange={(e) => setValue(e as string)}
                previewOptions={{
                  rehypePlugins: [[rehypeSanitize]],
                }}
                preview="edit"
              />
            </div>
          )}
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
