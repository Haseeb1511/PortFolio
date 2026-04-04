import { Link } from 'react-router-dom';
import { FiInstagram, FiLinkedin, FiGithub, FiDownload, FiArrowDown, FiYoutube } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
    const typedRef = useRef(null);
    const roles = ['AI Engineer', 'ML Engineer', 'Agentic AI Developer', 'MLOps Engineer'];

    useEffect(() => {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                if (typedRef.current) {
                    typedRef.current.textContent = currentRole.substring(0, charIndex - 1);
                }
                charIndex--;
                typingSpeed = 50;
            } else {
                if (typedRef.current) {
                    typedRef.current.textContent = currentRole.substring(0, charIndex + 1);
                }
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        };

        const timeout = setTimeout(type, 500);
        return () => clearTimeout(timeout);
    }, []);

    const socialLinks = [
        { icon: <FiInstagram />, url: 'https://www.instagram.com/haseebmanzoor_/', label: 'Instagram' },
        { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/haseeb-manzoor-839458252', label: 'LinkedIn' },
        { icon: <FiGithub />, url: 'https://github.com/Haseeb1511', label: 'GitHub' },
        { icon: <FaWhatsapp />, url: 'https://wa.me/923191140506', label: 'WhatsApp' },
        { icon: <FiYoutube />, url: 'https://www.youtube.com/@AIwithHaseeb1511', label: 'YouTube' },
    ];

    return (
        <section className="hero" id="home">
            {/* Animated gradient mesh background */}
            <div className="hero-bg">
                <div className="hero-orb orb-1" />
                <div className="hero-orb orb-2" />
                <div className="hero-orb orb-3" />
            </div>

            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-badge">👋 Available for hire</div>
                        <h1 className="hero-title">
                            Hi, I'm <span className="hero-name">Haseeb.</span>
                            <br />
                            <span className="typed-text" ref={typedRef}></span>
                            <span className="cursor">|</span>
                        </h1>
                        <p className="hero-description">
                            I engineer AI systems that go from research to production — building
                            LLM-powered agents, RAG pipelines, and MLOps workflows that scale.
                            Specialized in LangChain, LangGraph, AWS &amp; Agentic AI.
                        </p>
                        <div className="hero-buttons">
                            <a
                                href="https://wa.me/923191140506?text=How%20can%20I%20help%20you%3F"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary hero-cta"
                            >
                                Hire Me!
                            </a>
                            <a href="/assets/Haseeb_cv.pdf" className="btn btn-outline hero-cta" download>
                                Download CV <FiDownload />
                            </a>
                        </div>
                        <div className="hero-social">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="icon-box"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div className="hero-image">
                        <div className="image-wrapper">
                            <div className="image-ring" />
                            <img
                                src="/assets/profile_pic/haseeb_image.jpg"
                                alt="Haseeb Manzoor — AI Engineer"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-number">5+</span>
                        <span className="stat-label">Projects Deployed</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <span className="stat-number">3+</span>
                        <span className="stat-label">LLM Systems Built</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <span className="stat-number">2</span>
                        <span className="stat-label">Certifications</span>
                    </div>
                    <div className="stat-divider" />
                    <div className="stat-item">
                        <span className="stat-number">1+</span>
                        <span className="stat-label">Year Experience</span>
                    </div>
                </div>

                <a href="#about" className="scroll-indicator">
                    <FiArrowDown className="scroll-icon" />
                    <span>Scroll Down</span>
                </a>
            </div>
        </section>
    );
};

export default Hero;
