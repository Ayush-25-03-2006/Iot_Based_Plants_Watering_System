import "./Dashboard.css";
import planttree from "./Image/planttree.png";
import plantwatering from "./Image/plantwatering.jpg";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div id="con">
      
      {/* Heading */}
      <h1>🌿 Take Care Of Your Plants</h1>

      {/* Cards Container */}
      <div className="card-container">
        
        {/* Card 1 */}
        <div className="card" style={{ width: "18rem" }}>
          <img src={planttree} className="card-img-top" alt="Plant Growth" />
          <div className="card-body">
            <h5 className="card-title">Plant Growth</h5>
            <p style={{color:"white"}} className="card-text">
              Monitor your plant health and growth in real-time with smart tracking.
            </p>
            <Link to="/DetailsPlant"><button className="btn btn-success">View Details</button></Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card" style={{ width: "18rem" }}>
          <img src={plantwatering} className="card-img-top" alt="Watering System" />
          <div className="card-body">
            <h5 className="card-title">Watering Plant</h5>
            <p style={{color:"white"}} className="card-text">
              Control and automate watering system using IoT from anywhere.
            </p>
            <Link to="/TreeData"><button className="btn btn-primary"> Start Watering </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;