import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProblem from "./pages/AddProblem";
import Home from "./pages/Home";
import ProblemPage from "./pages/ProblemPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
        <Route path="/create" element={<AddProblem />} />
      </Routes>
      <footer>
        <p className="text-xs m-0">Made By <a href="https://github.com/ah-naf">Ahnaf</a></p>
      </footer>
    </div>
  );
}

export default App;
