import { Link } from 'react-router-dom';
import { FiInstagram, FiLinkedin, FiGithub, FiDownload, FiArrowDown } from 'react-icons/fi';
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
        { icon: <FiInstagram />, url: 'https://www.instagram.com/haseebmanzoor_/' },
        { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/haseeb-manzoor-839458252' },
        { icon: <FiGithub />, url: 'https://github.com/Haseeb1511' },
        { icon: <FaWhatsapp />, url: 'https://wa.me/923191140506' },
    ];

    return (
        <section className="hero" id="home">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Hello I'm Haseeb. <span className="typed-text" ref={typedRef}></span>
                            <span className="cursor">|</span>
                        </h1>
                        <p className="hero-description">
                            I'm an AI enthusiast interested in Generative AI. I work with Python, machine learning, deep
                            learning, and MLOps, and I have experience with TensorFlow, Scikit-learn, and AWS. I enjoy
                            building Chatbots using LangChain, LangGraph, and Agentic AI. I like solving tough problems
                            and I'm always excited to learn more about AI.
                        </p>
                        <div className="hero-buttons">
                            <a
                                href="https://wa.me/923191140506?text=How%20can%20I%20help%20you%3F"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                Hire Me!
                            </a>
                            <a href="/assets/Haseeb_cv.pdf" className="btn btn-primary">
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
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="image-wrapper">
                            <img src="/assets/haseeb-ghibli.png" alt="Haseeb Ghibli-style portrait" />
                        </div>
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
