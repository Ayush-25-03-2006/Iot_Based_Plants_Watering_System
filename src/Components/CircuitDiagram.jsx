import React from "react";

import relay from "./Image/relay.jpeg";
import motor from "./Image/motorwithpump.jpeg";
import all1 from "./Image/nodemcurelay.jpeg";
import all2 from "./Image/motornodemcurelay.jpeg";
import all3 from "./Image/allcircuit.jpeg";
import soilinterface from "./Image/interfacesoil.jpeg";
import soil from "./Image/soilmoisture.jpeg";
import circuit from "./Image/circuitdiagramimage.png";
import Full_Image from "./Image/iotplant.jpeg";

import "./CircuitDiagram.css";

function CircuitDiagram() {

    const components = [
        {
            image: relay,
            title: "Relay Module",
            desc: "Controls high voltage devices using low voltage NodeMCU signals."
        },
        {
            image: motor,
            title: "Water Pump Motor",
            desc: "Supplies water automatically for irrigation and plant hydration."
        },
        {
            image: all1,
            title: "NodeMCU + Relay",
            desc: "NodeMCU connected with relay module for smart automation."
        },
        {
            image: all2,
            title: "Integrated Setup",
            desc: "Complete setup connecting NodeMCU, relay and water pump."
        },
        {
            image: all3,
            title: "Complete Circuit",
            desc: "Entire irrigation circuit including sensor, relay and motor."
        },
        {
            image: soilinterface,
            title: "Sensor Interface",
            desc: "Processes soil moisture sensor signals for automation logic."
        },
        {
            image: soil,
            title: "Soil Moisture Sensor",
            desc: "Detects soil water level and activates automatic watering."
        },
        {
            image: Full_Image,
            title: "Full Diagram",
            desc: "True Diagramatic Representation."
        }

    ];

    return (

        <div className="main-container">

            {/* Hero */}
            <div className="hero-section">

                <h1>
                    Smart IoT Plant Watering System
                </h1>

                <p>
                    Intelligent irrigation automation using ESP8266,
                    MQTT cloud communication and real-time soil monitoring.
                </p>

            </div>

            {/* Components */}
            <div className="section-title">

                <span></span>

                <h2>Components Used</h2>

                <span></span>

            </div>

            <div className="card-grid">

                {
                    components.map((item, index) => (

                        <div className="modern-card" key={index}>

                            <div className="image-container">

                                <img
                                    src={item.image}
                                    alt={item.title}
                                />

                            </div>

                            <div className="card-content">

                                <h3>{item.title}</h3>

                                <p>{item.desc}</p>

                            </div>

                        </div>

                    ))
                }

            </div>

            {/* Circuit Diagram */}
            <div className="section-title">

                <span></span>

                <h2>Circuit Diagram Representation</h2>

                <span></span>

            </div>

            <div className="diagram-card">

                <img
                    src={circuit}
                    alt="Circuit Diagram"
                />

                <div className="diagram-content">

                    <h3>Complete Circuit Architecture</h3>

                    <p>
                        Full schematic representation of the Smart Plant
                        Watering System including NodeMCU, relay module,
                        moisture sensor and water pump integration.
                    </p>

                </div>

            </div>

        </div>

    );
}

export default CircuitDiagram;