import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import TreeData from "./Components/TreeData";
import Demonstration from "./Components/Demonstration";
import CircuitDiagram from "./Components/CircuitDiagram";
import DetailsPlant from "./Components/DetailsPlant";
import Landing from "./Components/Landing";

function App() {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/TreeData" element={<TreeData/>}/>
        <Route path="/Demonstration" element={<Demonstration/>}/>
        <Route path="/Circuit" element={<CircuitDiagram/>}/>
        <Route path="/DetailsPlant" element={<DetailsPlant/>}/>
      </Routes>
    </>
  )
}
export default App;