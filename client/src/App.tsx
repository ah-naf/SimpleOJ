import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProblem from "./pages/AddProblem";
import Home from "./pages/Home";
import ProblemPage from "./pages/ProblemPage";
import Status from "./pages/Status";
import { asyncLogin } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncLogin() as any);
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
        <Route path="/create" element={<AddProblem />} />
        <Route path="/status" element={<Status />} />
        {/* This route was added for testing purpose */}
        {/* <Route path="/test" element={<Test />} /> */}
      </Routes>
    </div>
  );
}

export default App;
