import React, { useEffect, useRef, useState } from "react";
import mqtt from "mqtt";

import "./TreeData.css";

import plant from "./Image/plant.jpeg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TreeData() {

  const [status, setStatus] = useState("OFF");
  const [moisture, setMoisture] = useState("--");
  const [isAuto, setIsAuto] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const clientRef = useRef(null);

  useEffect(() => {

    const client = mqtt.connect(
      "wss://e1deeeb0340c413192f1b542fb15bdc1.s1.eu.hivemq.cloud:8884/mqtt",
      {
        username: "ayush",
        password: "Ayush@123",

        protocol: "wss",

        reconnectPeriod: 1000,
        connectTimeout: 4000,
        clean: true,
      }
    );

    clientRef.current = client;

    client.on("connect", () => {

      console.log("Connected");

      setIsConnected(true);

      toast.success("Connected", {
        autoClose: 1000,
        transition: null
      });

      client.subscribe("plant/moisture");

      client.subscribe("plant/status");

    });

    client.on("message", (topic, message) => {

      const data = message.toString();

      if (topic === "plant/moisture") {

        setMoisture(data);

      }

      if (topic === "plant/status") {

        setStatus(data);

      }

    });

    client.on("close", () => {

      setIsConnected(false);

      toast.warning("Disconnected", {
        autoClose: 1000
      });

    });

    client.on("error", () => {

      toast.error("Connection Failed", {
        autoClose: 1000
      });

    });

    return () => {

      if (client) {

        client.end();

      }

    };

  }, []);

  // Manual Control
  const handleClick = () => {

    if (!clientRef.current || !isConnected) {

      toast.error("Not Connected", { autoClose: 1000 });

      return;
    }

    const newState =
      status === "ON"
        ? "OFF"
        : "ON";

    clientRef.current.publish(
      "plant/motor",
      newState
    );

    setStatus(newState);

    toast.success(`Motor ${newState}`);

  };

  // Auto Mode
  const handleAuto = () => {

    if (!clientRef.current || !isConnected) {

      toast.error("Not Connected", {
        autoClose: 1000,
        transition: null
      });

      return;
    }

    if (isAuto) {

      clientRef.current.publish(
        "plant/auto",
        "STOP"
      );

      setIsAuto(false);

      toast.info("Auto Mode Disabled", {
        autoClose: 1000,
        transition: null
      });

    } else {

      clientRef.current.publish(
        "plant/auto",
        "START"
      );

      setIsAuto(true);

      toast.success("Auto Mode Enabled", {
        autoClose: 1000,
        transition: null
      });

    }

  };

  return (
    <>
      <div className="tree-container">

        {/* Glow */}
        <div className="bg-glow glow1"></div>
        <div className="bg-glow glow2"></div>

        {/* Main Card */}
        <div className="tree-card">

          {/* Heading */}
          <div className="heading-section">

            <h1>
              Smart Plant
              <span> Watering</span>
            </h1>

            <p>
              IoT Based Smart Irrigation System
            </p>

          </div>

          {/* Image */}
          <div className="image-box">

            <img
              src={plant}
              alt="Plant"
              className="plant-image"
            />

            <div className="image-overlay"></div>

          </div>

          {/* Status Cards */}
          <div className="status-wrapper">

            <div className="status-card">

              <div className="status-icon">
                🌡
              </div>

              <div>
                <p>Moisture Level</p>
                <h3>{moisture}</h3>
              </div>
            </div>
            <div className="status-card">
              <div className="status-icon">
                💧
              </div>
              <div>
                <p>Motor Status</p>
                <h3
                  className={
                    status === "ON"
                      ? "green-text"
                      : "red-text"
                  }
                >
                  {status}
                </h3>
              </div>
            </div>
            <div className="status-card">
              <div className="status-icon">
                📡
              </div>
              <div>
                <p>Connection</p>
                <h3
                  className={
                    isConnected
                      ? "green-text"
                      : "red-text"
                  }
                >
                  {
                    isConnected
                      ? "Connected"
                      : "Disconnected"
                  }
                </h3>
              </div>
            </div>
          </div>
          <div className="button-group">
            <button
              onClick={handleClick}
              className="manual-btn"
            >
              {
                status === "ON"
                  ? "TURN OFF"
                  : "TURN ON"
              }
            </button>
            <button
              onClick={handleAuto}
              className="auto-btn"
            >
              {
                "AUTO MODE"
              }
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              About Soil Moisture Level
            </button>
          </h2>
          <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">1. if moisture level shows [600 to 949] (means Plant Need Water) you can manually water the plant or click the auto mode the pump will automatically perform the work.
              <br />
              <br />
              2. soil moisture value shows from [0 - 1024]
              <br /><br />
              3. value from [950 - 1024] means the soil moisture is not plug in to the soil (i.e in Air). 
              <br /><br />
              4. value from [0 - 599] means the soil is wet no need to water your plant.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              About Connection
            </button>
          </h2>
          <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">1. The mqtt protocol will be connected with the springboot application (backend).
              <br /><br />
              2. springboot will perform connection with the react (frontend).
              <br /><br />
              3. Now, because of mqtt we can access the system from anywhere around the world.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TreeData;