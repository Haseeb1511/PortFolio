import { useState } from 'react';
import { FiMail, FiPhone, FiSend } from 'react-icons/fi';
import './ContactPage.css';

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

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        // You can integrate with emailjs or other service here
        setSubmitStatus('success');
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setSubmitStatus(null), 3000);
    };

    return (
        <div className="contact-page">
            <section className="section">
                <div className="container">
                    <h1 className="section-title">Let's Work Together</h1>
                    <p className="section-subtitle">Do you have a project in mind? Contact me here</p>

                    <div className="contact-layout">
                        <div className="contact-info">
                            <h2>Find me <span>↘</span></h2>

                            <a href="mailto:iamhaseebmanzoor@gmail.com" className="contact-link">
                                <FiMail className="contact-icon" />
                                <span>iamhaseebmanzoor@gmail.com</span>
                            </a>

                            <a href="tel:+923191140506" className="contact-link">
                                <FiPhone className="contact-icon" />
                                <span>+92 319 114 0506</span>
                            </a>
                        </div>

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
                                <p className="success-message">Message sent successfully!</p>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
