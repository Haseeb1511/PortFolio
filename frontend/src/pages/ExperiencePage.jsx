import './ExperiencePage.css';
import { experienceData } from '../data/experience';

const ExperiencePage = () => {
  return (
    <div className="experience-page">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Experience</h1>

          <div className="experience-list">
            {experienceData.map((exp, index) => (
              <div key={index} className="experience-card card">
                <div className="experience-header">
                  <h2 className="role">{exp.role}</h2>
                  <span className="duration">{exp.duration}</span>
                </div>

                <div className="company">
                  {exp.company} <span className="location">({exp.location})</span>
                </div>

                <ul className="experience-points">
                  {exp.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencePage;
