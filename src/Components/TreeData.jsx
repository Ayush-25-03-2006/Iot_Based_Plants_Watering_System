import React, { useEffect, useRef, useState } from "react";
import mqtt from "mqtt";

import "./TreeData.css";
import plant from "./Image/plant.jpeg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TreeData() {

  useEffect(() => {
    document.title = "TreeData";
  }, []);

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

        clean: true,

        reconnectPeriod: 500,

        connectTimeout: 2000,

        keepalive: 30,
      }
    );

    clientRef.current = client;

    client.on("connect", () => {

      console.log("MQTT Connected");

      setIsConnected(true);

      toast.success("Connected", {
        autoClose: 1000,
        transition: null
      });

      client.subscribe(
        [
          "plant/moisture",
          "plant/status"
        ],
        (err) => {

          if (!err) {

            console.log("Subscribed Successfully");

            client.publish(
              "plant/getStatus",
              "GET"
            );

            client.publish(
              "plant/getMoisture",
              "GET"
            );
          }
        }
      );
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

      console.log("Disconnected");

      setIsConnected(false);

      toast.warning("Disconnected", {
        autoClose: 1000
      });
    });

    client.on("error", (err) => {

      console.error(err);

      toast.error("Connection Failed", {
        autoClose: 1000
      });
    });

    return () => {

      if (client) {

        client.removeAllListeners();

        client.end(true);
      }
    };

  }, []);

  const handleClick = () => {

    if (!clientRef.current || !isConnected) {

      toast.error("Not Connected", {
        autoClose: 1000
      });

      return;
    }

    const newState =
      status === "OFF"
        ? "ON"
        : "OFF";

    clientRef.current.publish(
      "plant/motor",
      newState
    );

    setStatus(newState);

    toast.success(`Motor ${newState}`);
  };

  const handleAuto = () => {

    if (!clientRef.current || !isConnected) {

      toast.error("Not Connected", {
        autoClose: 1000
      });

      return;
    }

    const moistureValue = Number(moisture);

    if (!isAuto) {

      if (
        moistureValue >= 600 &&
        moistureValue <= 949
      ) {

        clientRef.current.publish(
          "plant/auto",
          "STOP"
        );

        setIsAuto(true);

        toast.success(
          "Auto Mode Enabled",
          {
            autoClose: 1000
          }
        );

      } else {

        toast.warning(
          "Auto Mode only works for moisture 600 - 949",
          {
            autoClose: 1500
          }
        );
      }

    } else {

      clientRef.current.publish(
        "plant/auto",
        "START"
      );

      setIsAuto(false);

      toast.info(
        "Auto Mode Disabled",
        {
          autoClose: 1000
        }
      );
    }
  };

  return (
    <>
      <div className="tree-container">

        <div className="bg-glow glow1"></div>
        <div className="bg-glow glow2"></div>

        <div className="tree-card">

          <div className="heading-section">
            <h1>
              Smart Plant
              <span> Watering</span>
            </h1>
            <p>
              IoT Based Smart Irrigation System
            </p>
          </div>

          <div className="image-box">
            <img
              src={plant}
              alt="Plant"
              className="plant-image"
            />
            <div className="image-overlay"></div>
          </div>

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
              AUTO MODE
            </button>

          </div>

        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default TreeData;