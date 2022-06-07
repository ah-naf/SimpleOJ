import { Checkbox } from "@nextui-org/react";
import React from "react";

export default function SingleTestcaseRow() {
  return (
    <tr className="h-10 text-lg even:bg-[whitesmoke] odd:bg-slate-50">
      <td>0</td>
      <td className="text-blue-500 underline">Input0</td>
      <td className="text-blue-500 underline">Output0</td>
      <td>
        <Checkbox color="success" />
      </td>
      <td>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-red-600 cursor-pointer"
        >
          <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
        </svg>
      </td>
    </tr>
  );
}
