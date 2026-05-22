import React, { useState, useEffect } from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {

    const navigate = useNavigate();

    const [scrollY, setScrollY] = useState(0);
    const [hoveredFeature, setHoveredFeature] = useState(null);

    useEffect(() => {
        document.title = "IOT-Based-Plant-Watering-System";
    }, []);

    useEffect(() => {

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    return (

        <div className="landing-container">

            {/* GLOW EFFECTS */}
            <div className="glow glow1"></div>
            <div className="glow glow2"></div>

            {/* PARTICLES */}
            <div className="particles">

                {[...Array(20)].map((_, i) => (

                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.4}s`
                        }}
                    ></div>

                ))}

            </div>

            {/* HERO SECTION */}
            <section className="hero-section">

                {/* LEFT CONTENT */}
                <div
                    className="hero-left"
                    style={{
                        transform: `translateY(${scrollY * 0.15}px)`
                    }}
                >

                    <h1 className="hero-title">

                        Smart
                        <span className="highlight"> Plant Watering </span>
                        System

                    </h1>

                    <p className="hero-description">

                        Intelligent irrigation automation using ESP8266,
                        MQTT and soil moisture monitoring for smart farming
                        and automatic watering.

                    </p>

                    {/* BUTTONS */}
                    <div className="hero-buttons">

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/Circuit")}
                        >

                            Explore Project
                            <span className="btn-arrow">→</span>

                        </button>

                        <button className="btn btn-secondary">

                            Water Your Plant

                        </button>

                    </div>

                    {/* STATS */}
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

                {/* RIGHT SPLINE */}
                <div className="hero-right">

                    <div className="spline-box">

                        <spline-viewer
                            url="https://prod.spline.design/lYbuz2J86XzIr-Jn/scene.splinecode">
                        </spline-viewer>

                    </div>

                </div>

            </section>

            {/* FEATURES */}
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
                            description:
                                "Real-time soil moisture monitoring using IoT sensors.",
                            color: "#10b981"
                        },

                        {
                            icon: "💧",
                            title: "Auto Irrigation",
                            description:
                                "Automatic watering when soil moisture becomes low.",
                            color: "#3b82f6"
                        },

                        {
                            icon: "📡",
                            title: "MQTT Connectivity",
                            description:
                                "Cloud communication for remote monitoring.",
                            color: "#f59e0b"
                        },

                        {
                            icon: "⚡",
                            title: "Low Power",
                            description:
                                "Energy-efficient ESP8266 microcontroller system.",
                            color: "#8b5cf6"
                        }

                    ].map((feature, index) => (

                        <div
                            key={index}
                            className="feature-card"
                            onMouseEnter={() => setHoveredFeature(index)}
                            onMouseLeave={() => setHoveredFeature(null)}
                            style={{
                                transform:
                                    hoveredFeature === index
                                        ? "translateY(-10px)"
                                        : "translateY(0)"
                            }}
                        >

                            <div
                                className="feature-icon"
                                style={{
                                    color: feature.color
                                }}
                            >

                                {feature.icon}

                            </div>

                            <h3>{feature.title}</h3>

                            <p>{feature.description}</p>

                            <div className="feature-shine"></div>

                        </div>

                    ))}

                </div>

            </section>

            {/* TECH STACK */}
            <section className="tech-section">

                <div className="section-header">

                    <div className="section-line"></div>

                    <h2>Tech Stack</h2>

                    <div className="section-line"></div>

                </div>

                <div className="tech-grid">

                    {[
                        { name: "ESP8266", icon: "⚙️" },
                        { name: "MQTT", icon: "📡" },
                        { name: "React", icon: "⚛️" },
                        { name: "SpringBoot", icon: "🟢" },
                        { name: "MySQL", icon: "🛢️" },
                        { name: "WebSocket", icon: "🔗" }

                    ].map((tech, index) => (

                        <div
                            key={index}
                            className="tech-card"
                        >

                            <span className="tech-icon">

                                {tech.icon}

                            </span>

                            <span>{tech.name}</span>

                        </div>

                    ))}

                </div>

            </section>

            {/* CTA */}
            <section className="cta-section">

                <div className="cta-content">

                    <h2>

                        Ready to Automate Your Garden?

                    </h2>

                    <p>

                        Join smart farmers optimizing irrigation systems
                        using IoT technology.

                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/TreeData")}
                    >

                        Get Started Now
                        <span className="btn-arrow">→</span>

                    </button>

                </div>

            </section>

            {/* FOOTER */}
            <footer className="footer">

                <div className="footer-content">

                    <div className="footer-column">

                        <h3>Smart Watering</h3>

                        <p>

                            Intelligent irrigation for sustainable farming.

                        </p>

                    </div>

                </div>

                <div className="footer-bottom">

                    <p>

                        © 2026 Smart Plant Watering System • React • MQTT • ESP8266

                    </p>

                </div>

            </footer>

        </div>

    );
}

export default Landing;