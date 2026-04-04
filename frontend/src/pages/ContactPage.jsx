import { useState } from 'react';
import { FiMail, FiPhone, FiSend, FiLinkedin, FiGithub, FiYoutube } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './ContactPage.css';

// Get API URL from .env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error("Error sending contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 4000);
    }
  };

  const socialLinks = [
    {
      icon: <FiLinkedin />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/haseeb-manzoor-839458252',
      color: '#0077b5',
    },
    {
      icon: <FiGithub />,
      label: 'GitHub',
      url: 'https://github.com/Haseeb1511',
      color: '#333',
    },
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp',
      url: 'https://wa.me/923191140506',
      color: '#25d366',
    },
  ];

  return (
    <div className="contact-page">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Let's Work Together</h1>
          <p className="section-subtitle">Have a project in mind? Let's build something great.</p>

          <div className="contact-layout">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>Find me <span>↘</span></h2>

              <a href="mailto:iamhaseebmanzoor@gmail.com" className="contact-link">
                <span className="contact-icon-wrap"><FiMail className="contact-icon" /></span>
                <div>
                  <span className="contact-link-label">Email</span>
                  <span className="contact-link-value">iamhaseebmanzoor@gmail.com</span>
                </div>
              </a>

              <a href="tel:+923191140506" className="contact-link">
                <span className="contact-icon-wrap"><FiPhone className="contact-icon" /></span>
                <div>
                  <span className="contact-link-label">Phone</span>
                  <span className="contact-link-value">+92 319 114 0506</span>
                </div>
              </a>

              {/* Social Links */}
              <div className="contact-socials">
                <p className="contact-socials-label">Also find me on</p>
                <div className="contact-social-row">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-btn"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <span className="contact-social-icon">{social.icon}</span>
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="form-input"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="form-input"
                />
              </div>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="form-input"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write Your Message here..."
                required
                className="form-textarea"
                rows="6"
              />

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send'} <FiSend />
              </button>

              {submitStatus === 'success' && (
                <p className="success-message">✅ Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="error-message">❌ Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
