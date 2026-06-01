import React, { useState, useEffect, useRef } from "react";
import "./TreeData.css";
import plant from "./Image/plant.jpeg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TreeData() {
  const [status, setStatus] = useState("ON");
  const [moisture, setMoisture] = useState("--");

  const [manualLoading, setManualLoading] = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);

  const [isAuto, setIsAuto] = useState(false);

  const autoIntervalRef = useRef(null);

  const BACKEND_URL = "http://192.168.29.34:10000/api/system";

  const fetchData = async () => {
    try {
      // Motor Status
      const statusRes = await fetch(`${BACKEND_URL}/status`);
      const statusText = (await statusRes.text()).trim().toUpperCase();
      setStatus(statusText);

      // Moisture Value
      const moistureRes = await fetch(`${BACKEND_URL}/moisture`);
      const moistureText = await moistureRes.text();
      setMoisture(moistureText);

    } catch (err) {
      console.log("Fetch issue:", err);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

const handleClick = async () => {
  setManualLoading(true);

  try {
    const turnOn = status === "OFF";

    const url = turnOn
      ? `${BACKEND_URL}/on`
      : `${BACKEND_URL}/off`;

    await fetch(url, { method: "POST" });

    setStatus(turnOn ? "ON" : "OFF");

    toast.success(
      `Motor turned ${turnOn ? "OFF" : "ON"}`,
      { autoClose: 1500 }
    );

  } catch (err) {
    toast.warning("Failed to connect");
  } finally {
    setManualLoading(false);
  }
};

  const handleAuto = async () => {
    setAutoLoading(true);

    try {
      if (!isAuto) {
        autoIntervalRef.current = setInterval(() => {
          fetch(`${BACKEND_URL}/auto`, {
            method: "POST",
          });
        }, 2000);

        setIsAuto(true);

        toast.success("Auto Mode Enabled", {
          autoClose: 1500,
        });

      } else {
        clearInterval(autoIntervalRef.current);
        autoIntervalRef.current = null;

        setIsAuto(false);

        toast.info("Auto Mode Stopped", {
          autoClose: 1500,
        });
      }
    } catch (err) {
      toast.warning("Failed to connect");
    } finally {
      setAutoLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (autoIntervalRef.current) {
        clearInterval(autoIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="container">
      <div className="card">

        <h2>🌱 Smart Plant System</h2>

        <img
          className="plantimg"
          src={plant}
          alt="Plant"
        />

        <div className="status">
          💧Turn Motor Status:
          <span> {status}</span>
        </div>

        <div className="status">
          🌱 Moisture Level:
          <span> {moisture}</span>
        </div>

        <button
          onClick={handleClick}
          // disabled={manualLoading || isAuto}
          className="btn1"
        >
          {manualLoading
            ? "Processing..."
            : status === "ON"
            ? "Turn ON"
            : "Turn OFF"}
        </button>

        <button
          onClick={handleAuto}
          disabled={autoLoading}
          className="btn2"
        >
          {autoLoading
            ? "Processing..."
            : isAuto
            ? "STOP AUTO"
            : "AUTO MODE"}
        </button>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={1500}
      />
    </div>
  );
}

export default TreeData;