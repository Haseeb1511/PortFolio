import './ExperiencePage.css';
import { experienceData } from '../data/experience';
import { FiBriefcase, FiCalendar, FiMapPin, FiCheckCircle } from 'react-icons/fi';

const ExperiencePage = () => {
  return (
    <div className="experience-page">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Experience</h1>
          <p className="section-subtitle">My professional journey & work history</p>

          <div className="timeline">
            {experienceData.map((exp, index) => (
              <div key={index} className="timeline-item">
                {/* Timeline dot */}
                <div className="timeline-dot">
                  <FiBriefcase />
                </div>

                {/* Timeline line */}
                {index < experienceData.length - 1 && (
                  <div className="timeline-line" />
                )}

                <div className="timeline-content card">
                  {/* Header */}
                  <div className="exp-header">
                    <div className="exp-title-group">
                      <h2 className="exp-role">{exp.role}</h2>
                      <div className="exp-company">
                        <span className="company-name">{exp.company}</span>
                        <span className="exp-meta">
                          <FiMapPin className="meta-icon" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className="exp-badge">
                      <FiCalendar className="meta-icon" />
                      {exp.duration}
                    </div>
                  </div>

                  {/* Points */}
                  <ul className="exp-points">
                    {exp.points.map((point, idx) => (
                      <li key={idx} className="exp-point">
                        <FiCheckCircle className="point-icon" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencePage;
