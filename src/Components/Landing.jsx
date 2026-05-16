import React, { useState, useEffect } from "react";
import "./Landing.css";
import plantImage from "./Image/plant.jpeg";
import heroVideo from "./Video/iotvideo.mp4";

function Landing() {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track mouse position for gradient shift
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="landing-container">
      {/* Animated Background Glows */}
      <div
        className="glow glow1"
        style={{
          opacity: 0.6 + Math.sin(scrollY * 0.002) * 0.2,
        }}
      ></div>
      <div
        className="glow glow2"
        style={{
          opacity: 0.4 + Math.cos(scrollY * 0.002) * 0.2,
        }}
      ></div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.sin(i) * 50 + 50}%`,
              top: `${Math.cos(i) * 50 + 50}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Left Content */}
        <div className="hero-left" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <div className="tag">
            <span className="tag-icon">🚀</span>
            <span>IoT Based Smart Irrigation</span>
          </div>

          <h1 className="hero-title">
            Smart
            <span className="highlight"> Plant Watering </span>
            System
          </h1>

          <p className="hero-description">
            Intelligent irrigation automation using ESP8266, MQTT and soil
            moisture monitoring for smart farming and automatic watering.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary">
              <span>Explore Project</span>
              <span className="btn-arrow">→</span>
            </button>

            <button className="btn btn-secondary">
              <span>Water Your Plant</span>
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">96%</span>
              <span className="stat-label">Water Saved</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Auto Control</span>
            </div>
            <div className="stat">
              <span className="stat-number">IoT</span>
              <span className="stat-label">Connected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <div className="section-line"></div>
          <h2>Core Features</h2>
          <div className="section-line"></div>
        </div>

        <div className="feature-grid">
          {[
            {
              icon: "🌱",
              title: "Smart Monitoring",
              description: "Real-time soil moisture monitoring using IoT sensors for precise plant care.",
              color: "#10b981",
            },
            {
              icon: "💧",
              title: "Auto Irrigation",
              description: "Water pump automatically activates when soil becomes dry.",
              color: "#3b82f6",
            },
            {
              icon: "📡",
              title: "MQTT Connectivity",
              description: "Cloud communication for remote monitoring and control.",
              color: "#f59e0b",
            },
            {
              icon: "⚡",
              title: "Low Power",
              description: "Energy-efficient design using ESP8266 microcontroller.",
              color: "#8b5cf6",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{
                "--accent-color": feature.color,
                transform:
                  hoveredFeature === index
                    ? "translateY(-8px)"
                    : "translateY(0)",
              }}
            >
              <div className="feature-icon" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-shine"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-section">
        <h2>Tech Stack</h2>
        <div className="tech-grid">
          {[
            { name: "ESP8266", icon: "⚙️" },
            { name: "MQTT Protocol", icon: "📡" },
            { name: "React", icon: "⚛️" },
            { name: "SpringBoot", icon: "🟢" },
            { name: "Mysql", icon: "🍃" },
            { name: "WebSockets", icon: "🔗" },
          ].map((tech, index) => (
            <div key={index} className="tech-card">
              <span className="tech-icon">{tech.icon}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Automate Your Garden?</h2>
          <p>Join hundreds of smart farmers optimizing their irrigation today</p>
          <button className="btn btn-primary btn-lg">
            Get Started Now
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Smart Watering</h3>
            <p>Intelligent irrigation for sustainable farming</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Smart Plant Watering System. Built with ~ Springboot ~ React • MQTT • ESP8266 • IoT</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
