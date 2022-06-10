import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SingleTestcaseRow from "./SingleTestcaseRow";

export default function TestcaseContainer() {
  const testcase = useSelector((state: RootState) => state.problem.testcase);

  if (testcase.length < 1) return <div></div>;

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Testcase</h1>
      <table className="table-auto w-full text-center border rounded-lg border-gray-300 shadow">
        <thead className="border h-12 text-lg">
          <tr>
            <th>Order</th>
            <th>Input</th>
            <th>Output</th>
            <th>Sample</th>
          </tr>
        </thead>
        <tbody>
          {testcase.map((item, index) => (
            <SingleTestcaseRow key={index} testcase={item} index={index} />
          ))}
        </tbody>
      </table>
    </>
  );
}
