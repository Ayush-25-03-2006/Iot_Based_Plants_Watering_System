import relay from "./Image/relay.jpeg";
import motor from "./Image/motorwithpump.jpeg";
import all1 from "./Image/nodemcurelay.jpeg";
import all2 from "./Image/motornodemcurelay.jpeg";
import all3 from "./Image/allcircuit.jpeg";
import soilinterface from "./Image/interfacesoil.jpeg";
import soil from "./Image/soilmoisture.jpeg";
import circuit from "./Image/circuitdiagramimage.png";

import "./CircuitDiagram.css";
function CircuitDiagram() {
    return (
        <>
            <div className="card-group">
                <hr className="hr" />
                <h3 style={{ color: "white" }}>Components Used</h3>
                <hr className="hr" />
                <div className="card">
                    <img src={relay} className="card-img-top" alt="Relay" />
                    <div className="card-body">
                        <h5 className="card-title">Relay</h5>
                        <p className="card-text">
                            A relay module used to control high voltage devices through low voltage signals.
                        </p>
                    </div>
                </div>
                <div className="card">
                    <img src={motor} className="card-img-top" alt="Motor" />
                    <div className="card-body">
                        <h5 className="card-title">Motor</h5>
                        <p className="card-text">
                            A water pump motor used to supply water in the irrigation system.
                        </p>
                    </div>
                </div>
                <div className="card">
                    <img src={all1} className="card-img-top" alt="NodeMCURelay" />
                    <div className="card-body">
                        <h5 className="card-title">NodeMCU & Relay</h5>
                        <p className="card-text">
                            Connection setup showing how NodeMCU interfaces with the relay module.
                        </p>
                    </div>
                </div>
                <div className="card">
                    <img src={all2} className="card-img-top" alt="NodeMCURelayMotor" />
                    <div className="card-body">
                        <h5 className="card-title">NodeMCU, Relay & Motor</h5>
                        <p className="card-text">
                            Integrated setup of NodeMCU, relay, and motor for automated control.
                        </p>
                    </div>
                </div>
                <div className="card">
                    <img src={all3} className="card-img-top" alt="Full Circuit" />
                    <div className="card-body">
                        <h5 className="card-title">Full Circuit</h5>
                        <p className="card-text">
                            Complete circuit diagram including NodeMCU, relay, motor, and sensor connections.
                        </p>
                    </div>
                </div>
                <div className="card">
                    <img src={soilinterface} className="card-img-top" alt="Soil Moisture Interface" />
                    <div className="card-body">
                        <h5 className="card-title">Soil Moisture Interface</h5>
                        <p className="card-text">
                            Interface module that processes signals from the soil moisture sensor.
                        </p>
                    </div>
                </div>
                <div className="card">
                    <img src={soil} className="card-img-top" alt="Soil Moisture" />
                    <div className="card-body">
                        <h5 className="card-title">Soil Moisture</h5>
                        <p className="card-text">
                            Soil moisture sensor used to detect water levels in the soil for automation.
                        </p>
                    </div>
                </div>
            </div>
            <div className="card-group">
                <hr className="hr" />
                <h3 style={{ color: "white" }}>Diagramatic Representation Of Circuit</h3>
                <hr className="hr" />
                <div className="cards" style={{ alignItems: "center", alignContent: "center" }}>
                    <img src={circuit} className="card-img-top" alt="Soil Moisture" />
                    <div className="card-body">
                        <h5 className="card-title">Circuit Diagram</h5>
                        <p className="card-text">
                            Soil moisture sensor used to detect water levels in the soil for automation.
                        </p>
                    </div>
                </div>
            </div>
        </>

    )
}
export default CircuitDiagram;