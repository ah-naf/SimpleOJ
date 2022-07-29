import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";


export default function ProblemList() {
  const problems = useSelector((state: RootState) => state.problem.problems);
  const user = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.problem.loading);
  
  const isItSolved = (solvedArr: any) => {
    if(!solvedArr) return false
    return solvedArr.includes(user?._id)
  }

  return (
    <div className="space-y-4">
      {!loading
        ? problems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[whitesmoke] p-4 px-8 rounded shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
              onClick={() => navigate(`/problem/${item._id}`)}
            >
              <div>
                <h2 className="text-xl m-0 hover:underline cursor-pointer capitalize">
                  {item.title}
                </h2>
                <p
                  className="m-0 max-w-2xl mt-2"
                  style={{ wordSpacing: "5px" }}
                >
                  {item.desc}
                </p>
              </div>

              <button className={`p-2 px-4 outline-none rounded shadow text-white ${isItSolved(item.whoSolved) ? "bg-green-600 font-semibold line-through" : "bg-black hover:bg-white hover:text-black hover:border"}`}>
                {isItSolved(item.whoSolved) ? 'Solved' : "Solve Now"}
        
              </button>
            </div>
          ))
        : [0, 1, 2].map((item) => (
            <div
              key={item}
              className="border border-blue-300 shadow rounded-md p-4 max-w-4xl w-full mx-auto"
            >
              <div className="animate-pulse flex items-center space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-3 bg-slate-700 rounded max-w-md"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-5 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-3 max-w-xs"></div>
                    </div>
                  </div>
                </div>
                <div className="h-8 bg-slate-500 rounded w-24"></div>
              </div>
            </div>
          ))}
    </div>
  );
}
