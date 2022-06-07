import SingleTestcaseRow from "./SingleTestcaseRow";


export default function TestcaseContainer() {
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
            <SingleTestcaseRow />
            <SingleTestcaseRow />
        </tbody>
    </table></>
  )
}
