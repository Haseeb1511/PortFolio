import { Link } from 'react-router-dom';
import { FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FiInstagram />, url: 'https://www.instagram.com/haseebmanzoor_/', label: 'Instagram' },
        { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/haseeb-manzoor-839458252', label: 'LinkedIn' },
        { icon: <FiGithub />, url: 'https://github.com/Haseeb1511', label: 'GitHub' },
        { icon: <FaWhatsapp />, url: 'https://wa.me/923191140506', label: 'WhatsApp' },
    ];

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/projects', label: 'Projects' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <p className="footer-tagline">Artificial Intelligence</p>
                </div>

                <nav className="footer-nav">
                    <ul className="footer-links">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link to={link.path} className="footer-link">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="footer-social">
                    {socialLinks.map((social, idx) => (
                        <a
                            key={idx}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label={social.label}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                <div className="footer-bottom">
                    <p>
                        Copyright © <Link to="/">CodeWithHaseeb</Link> | {currentYear} - All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
