import { Modal, useModal, Button, Checkbox } from "@nextui-org/react";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import rehypeSanitize from "rehype-sanitize";
import { addTestcase } from "../store/ProblemSlice";
import { RootState } from "../store/store";

export default function TestcaseModal() {
  const { setVisible, bindings } = useModal();
  const [value, setValue] = useState({
    input: "",
    output: "",
    sample: false,
    explanation: "",
  });
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addTestcase(value));
    setVisible(false)
    setValue({input: '', output: '', sample: false, explanation: ''})
  };

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
              value={value.input}
              onChange={(e) => setValue({ ...value, input: e.target.value })}
            ></textarea>
            <label htmlFor="">Output</label>
            <textarea
              className="border border-slate-400 rounded-sm mb-2 mt-1 outline-none p-2"
              value={value.output}
              onChange={(e) => setValue({ ...value, output: e.target.value })}
            ></textarea>
          </div>
          <Checkbox
            isSelected={value.sample}
            color="primary"
            onChange={(e) => setValue({ ...value, sample: e.valueOf() })}
          >
            Sample test case
          </Checkbox>
          {value.sample && (
            <div className="flex flex-col font-mono modal-explanation">
              <label className="mb-2 text-md font-semibold">Explanation</label>
              <MDEditor
                value={value.explanation}
                onChange={(e) =>
                  setValue({ ...value, explanation: e as string })
                }
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
          <Button auto onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
