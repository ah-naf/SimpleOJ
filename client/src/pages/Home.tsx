import React from "react";
import ProblemList from "../components/ProblemList";

export default function Home() {
  return (
    <>
      <div className="max-w-4xl mx-auto mb-8">
        <div>
          <img src="/cta.webp" alt="" className="mx-auto" />
        </div>
        <div className="font-mono mt-8">
          <h1 className="text-3xl mb-8">Select a problem to solve</h1>
          <div>
            <ProblemList />
          </div>
        </div>
      </div>
      <footer>
        <p className="text-xs m-0">
          Made By <a href="https://github.com/ah-naf">Ahnaf</a>
        </p>
      </footer>
    </>
  );
}
