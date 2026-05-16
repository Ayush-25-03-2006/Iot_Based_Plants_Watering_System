import React, { useRef } from "react";

import "./Demonstration.css";

import mqttVideo from "./Video/mqtt.mp4";
import iotvideo from "./Video/iotvideo.mp4";
import Video1 from "./Video/1stvideo.mp4";
import video2 from "./Video/2ndvideo.mp4";

function Demonstration() {

  const videoRefs = useRef({});

  // Fullscreen Function
  const openFullscreen = (id) => {

    const video = videoRefs.current[id];

    if (video) {

      if (video.requestFullscreen) {

        video.requestFullscreen();

      } else if (video.webkitRequestFullscreen) {

        video.webkitRequestFullscreen();

      } else if (video.msRequestFullscreen) {

        video.msRequestFullscreen();

      }

    }

  };

  // Demo Cards
  const demoCards = [
    {
      id: 1,
      title: "Automatic Irrigation",
      desc:
        "Smart irrigation system automatically waters plants when the soil becomes dry.",
      icon: "💧",
      video: Video1
    },
    {
      id: 2,
      title: "MQTT Cloud Monitoring",
      desc:
        "ESP8266 sends live sensor data to the MQTT cloud dashboard in real-time.",
      icon: "📡",
      video: mqttVideo
    },
    {
      id: 3,
      title: "Relay & Pump Control",
      desc:
        "Automated relay module intelligently controls the water pump system.",
      icon: "⚙️",
      video: video2
    },
    {
      id: 4,
      title: "Complete IoT Setup",
      desc:
        "Integration of NodeMCU, sensors, MQTT and irrigation automation.",
      icon: "🌱",
      video: iotvideo
    }
  ];

  return (

    <div className="demo-container">

      {/* Background Glow */}
      <div className="bg-glow glow1"></div>
      <div className="bg-glow glow2"></div>

      {/* Hero */}
      <section className="hero-section">

        <span className="hero-badge">
          🚀 Smart Irrigation Demonstration
        </span>

        <h1>
          IoT Plant Watering
          <span> System</span>
        </h1>

        <p>
          Modern IoT based irrigation automation system
          using React, MQTT and ESP8266 for efficient
          smart farming and water management.
        </p>

      </section>

      {/* Cards */}
      <section className="cards-section">

        <div className="cards-grid">

          {
            demoCards.map((item, index) => (

              <div
                className="demo-card"
                key={item.id}
                style={{
                  animationDelay: `${index * 0.15}s`
                }}
              >

                {/* Icon */}
                <div className="icon-box">

                  {item.icon}

                </div>

                {/* Content */}
                <div className="card-content">

                  <h3>{item.title}</h3>

                  <p>{item.desc}</p>

                  {/* Video */}
                  <video
                    ref={(el) =>
                      videoRefs.current[item.id] = el
                    }
                    className="demo-video"
                    controls
                  >

                    <source
                      src={item.video}
                      type="video/mp4"
                    />

                  </video>

                  {/* Fullscreen Button */}
                  <button
                    className="view-btn"
                    onClick={() =>
                      openFullscreen(item.id)
                    }
                  >

                    Watch Fullscreen

                  </button>

                </div>

              </div>

            ))
          }

        </div>

      </section>

      {/* Features */}
      <section className="feature-section">

        <h2>
          Why This Project?
        </h2>

        <div className="feature-grid">

          <div className="feature-box">

            <h3>🌱 Smart Farming</h3>

            <p>
              Helps automate irrigation and reduces water wastage efficiently.
            </p>

          </div>

          <div className="feature-box">

            <h3>📡 IoT Connectivity</h3>

            <p>
              MQTT based communication enables live cloud monitoring.
            </p>

          </div>

          <div className="feature-box">

            <h3>⚡ Full Automation</h3>

            <p>
              Water pump activates automatically according to soil moisture.
            </p>

          </div>

        </div>

      </section>

    </div>

  );
}

export default Demonstration;