import React, { useEffect, useRef, useState } from "react";
import mqtt from "mqtt";
import "./TreeData.css";
import plant from "./Image/plant.jpeg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TreeData() {

  // =========================
  // STATES
  // =========================
  const [status, setStatus] = useState("OFF");
  const [moisture, setMoisture] = useState("--");
  const [isAuto, setIsAuto] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // MQTT Client Ref
  const clientRef = useRef(null);

  // =========================
  // HIVEMQ CONNECTION
  // =========================
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

    // =========================
    // CONNECT EVENT
    // =========================
    client.on("connect", () => {

      console.log("Connected to HiveMQ");

      setIsConnected(true);

      toast.success("Connected to HiveMQ");

      // Subscribe Topics
      client.subscribe("plant/moisture", (err) => {
        if (!err) {
          console.log("Subscribed : plant/moisture");
        }
      });

      client.subscribe("plant/status", (err) => {
        if (!err) {
          console.log("Subscribed : plant/status");
        }
      });

    });

    // =========================
    // MESSAGE EVENT
    // =========================
    client.on("message", (topic, message) => {

      const data = message.toString();

      console.log("Topic :", topic);
      console.log("Message :", data);

      // Moisture Data
      if (topic === "plant/moisture") {
        setMoisture(data);
      }

      // Motor Status
      if (topic === "plant/status") {
        setStatus(data);
      }

    });

    // =========================
    // ERROR EVENT
    // =========================
    client.on("error", (err) => {

      console.log("MQTT Error :", err);

      toast.error("MQTT Connection Failed");

    });

    // =========================
    // CLOSE EVENT
    // =========================
    client.on("close", () => {

      console.log("Disconnected");

      setIsConnected(false);

      toast.warning("MQTT Disconnected");

    });

    // =========================
    // CLEANUP
    // =========================
    return () => {

      if (client) {
        client.end();
      }

    };

  }, []);

  // =========================
  // MANUAL MOTOR CONTROL
  // =========================
  const handleClick = () => {

    if (!clientRef.current || !isConnected) {
      toast.error("MQTT Not Connected");
      return;
    }

    // Toggle State
    const newState = status === "ON" ? "OFF" : "ON";

    // Publish Message
    clientRef.current.publish("plant/motor", newState);

    // Update UI
    setStatus(newState);

    toast.success(`Motor ${newState}`);

  };

  // =========================
  // AUTO MODE
  // =========================
  const handleAuto = () => {

    if (!clientRef.current || !isConnected) {
      toast.error("MQTT Not Connected");
      return;
    }

    if (!isAuto) {

      clientRef.current.publish("plant/auto", "START");

      toast.success("Auto Mode Enabled");

    } else {

      clientRef.current.publish("plant/auto", "STOP");

      toast.info("Auto Mode Disabled");

    }

    setIsAuto(!isAuto);

  };

  return (

    <div className="container">

      <div className="card">

        <h2>🌱 Smart Plant System</h2>

        {/* Plant Image */}
        <img
          className="plantimg"
          src={plant}
          alt="plant"
        />

        {/* Moisture */}
        <div className="status">
          🌡 Moisture Level :
          <span> {moisture} </span>
        </div>

        {/* Motor Status */}
        <div className="status">
          💧 Motor Status :
          <span> {status} </span>
        </div>

        {/* MQTT Status */}
        <div className="status">
          📡 MQTT :
          <span>
            {isConnected ? " Connected" : " Disconnected"}
          </span>
        </div>

        {/* Manual Button */}
        <button
          onClick={handleClick}
          disabled={isAuto || !isConnected}
          className="btn1"
        >
          {
            status === "ON"
              ? "TURN OFF"
              : "TURN ON"
          }
        </button>

        {/* Auto Button */}
        <button
          onClick={handleAuto}
          disabled={!isConnected}
          className="btn2"
        >
          {
            isAuto
              ? "STOP AUTO"
              : "AUTO MODE"
          }
        </button>

      </div>

      {/* Toast */}
      <ToastContainer />

    </div>

  );
}

export default TreeData;