import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProblem from "./pages/AddProblem";
import ProblemPage from "./pages/ProblemPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/problem/:id" element={<ProblemPage />} />
        <Route path="/create" element={<AddProblem />} />
      </Routes>
    </div>
  );
}

export default App;
