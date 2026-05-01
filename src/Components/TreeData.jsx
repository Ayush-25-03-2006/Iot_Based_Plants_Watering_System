import React, { useState, useEffect, useRef } from "react";
import "./TreeData.css";
import plant from "./Image/plant.jpeg";
import { toast, ToastContainer } from "react-toastify";

function TreeData() {
  const [status, setStatus] = useState("ON");

  // 🔥 Separate loading states
  const [manualLoading, setManualLoading] = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);

  // 🔁 Track AUTO mode
  const [isAuto, setIsAuto] = useState(false);

  // ⏱ Store interval safely
  const autoIntervalRef = useRef(null);

  // const BACKEND_URL = "http://192.168.29.34:10000/api/system";
  const BACKEND_URL = "http://10.35.111.151:10000/api/system";

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/status`);
      const text = (await res.text()).trim().toUpperCase();
      setStatus(text);
    } catch (err) {
      console.log("Fetch issue");
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleClick = async () => {
    setManualLoading(true);

    try {
      const isTurningOn = status !== "ON";

      const url = isTurningOn
        ? `${BACKEND_URL}/on`
        : `${BACKEND_URL}/off`;

      await fetch(url, { method: "POST" });

      setStatus(isTurningOn ? "ON" : "OFF");

      toast.success(`Motor turned ${isTurningOn ? "OFF" : "ON"}`, {
        autoClose: 1500,
      });

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
          fetch(`${BACKEND_URL}/auto`, { method: "POST" });
        }, 2000);

        setIsAuto(true);
        toast.success("Auto Mode Enabled", { autoClose: 1500 });

      } else {
        clearInterval(autoIntervalRef.current);
        autoIntervalRef.current = null;

        setIsAuto(false);
        toast.info("Auto Mode Stopped", { autoClose: 1500 });
      }

    } catch (err) {
      toast.warning("Failed to connect");
    } finally {
      setAutoLoading(false);
    }
  };

  // 🧹 CLEANUP (IMPORTANT)
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

        <img className="plantimg" src={plant} alt="plant" />

        <div className="status">
          💧Turn Motor Status: <span>{status}</span>
        </div>

        {/* 🔘 MANUAL BUTTON */}
        <button
          onClick={handleClick}
          disabled={manualLoading || isAuto} // disable if auto running
          className="btn1"
        >
          {manualLoading
            ? "Processing..."
            : status === "ON"
            ? "Turn ON"
            : "Turn OFF"}
        </button>

        {/* 🔁 AUTO BUTTON */}
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

      <ToastContainer />
    </div>
  );
}

export default TreeData;