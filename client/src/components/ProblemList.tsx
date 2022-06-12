import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

export default function ProblemList() {
  const problems = useSelector((state: RootState) => state.problem.problems);
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {problems.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-300 p-4 px-8 rounded shadow hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={() => navigate(`/problem/${item._id}`)}
        >
          <div>
            <h2 className="text-xl m-0 hover:underline cursor-pointer capitalize">
              {item.title}
            </h2>
            <p className="m-0 max-w-2xl mt-2" style={{wordSpacing: '5px'}}>{item.desc}</p>
          </div>

          <button className="p-2 px-4 bg-slate-600 outline-none rounded shadow text-white">
            Solve Now
          </button>
        </div>
      ))}
    </div>
  );
}
