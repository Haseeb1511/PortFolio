import './CertificatesPage.css';

const certificates = [
  {
    id: 1,
    title: 'Generative AI Application Developer',
    issuer: 'Oak Angel',
    image: '/assets/certificates/generative ai application developer certificate(Oak angel.jpg',
    tags: ['Generative AI', 'LLMs', 'Application Development'],
  },
  {
    id: 2,
    title: '6-Week Internship Certificate',
    issuer: 'Developer Hub',
    image: '/assets/certificates/Developer hub 6 week internship certificate.jpg',
    tags: ['Internship', 'Software Development'],
  },
];

const CertificatesPage = () => {
  return (
    <div className="certificates-page">
      <section className="section">
        <div className="container">
          <h1 className="section-title">Certificates</h1>
          <p className="section-subtitle">
            Credentials and achievements that reflect my continuous learning journey
          </p>

          <div className="certificates-grid">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className="certificate-card card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Landscape image wrapper */}
                <div className="certificate-image-wrapper">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="certificate-img"
                    loading="lazy"
                  />
                  <div className="certificate-overlay">
                    <a
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary view-btn"
                    >
                      View Full Size
                    </a>
                  </div>
                </div>

                {/* Card info */}
                <div className="certificate-info">
                  <div className="certificate-meta">
                    <span className="certificate-issuer">{cert.issuer}</span>
                  </div>
                  <h2 className="certificate-title">{cert.title}</h2>
                  <div className="tools-container">
                    {cert.tags.map((tag) => (
                      <span key={tag} className="tool-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificatesPage;
