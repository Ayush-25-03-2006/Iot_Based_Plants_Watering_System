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

      toast.success("Connected To HiveMQ", {
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

      toast.warning("MQTT Disconnected", {
        autoClose: 1000
      });

    });

    client.on("error", () => {

      toast.error("MQTT Connection Failed", {
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

      toast.error("MQTT Not Connected");

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

      toast.error("MQTT Not Connected", {
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

        {/* Buttons */}
        <div className="button-group">

          <button
            onClick={handleClick}
            disabled={isAuto || !isConnected}
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
            disabled={!isConnected}
            className="auto-btn"
          >

            {
              isAuto
                ? "STOP AUTO"
                : "AUTO MODE"
            }

          </button>

        </div>

      </div>

      <ToastContainer />

    </div>

  );
}

export default TreeData;