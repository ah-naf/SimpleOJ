import { Avatar } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-screen relative h-20">
      <div className="flex items-center font-mono h-full px-12 justify-between z-50">
        <h1 className="text-4xl font-black text-slate-200 z-50">
          <Link to={"/"} className="text-inherit">SimpleOJ</Link>
        </h1>
        <div className="flex items-center z-50">
          <Link to={'/create'} className="mr-8 p-2 px-4 border border-slate-300 rounded-sm text-white">
            Add Problem
          </Link>
          <Avatar
            size="xl"
            src="https://i.pravatar.cc/150?u=a042581f4e25056704b"
          />
        </div>
      </div>
      <div className="absolute w-full h-full bg-[#322b39] top-0 -z-1"></div>
    </div>
  );
}
