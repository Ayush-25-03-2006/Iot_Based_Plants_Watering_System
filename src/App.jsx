import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import TreeData from "./Components/TreeData";
import Demonstration from "./Components/Demonstration";
import CircuitDiagram from "./Components/CircuitDiagram";
import DetailsPlant from "./Components/DetailsPlant";

function App() {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/TreeData" element={<TreeData/>}/>
        <Route path="/Demonstration" element={<Demonstration/>}/>
        <Route path="Circuit" element={<CircuitDiagram/>}/>
        <Route path="/DetailsPlant" element={<DetailsPlant/>}/>
      </Routes>
    </>
  )
}
export default App;