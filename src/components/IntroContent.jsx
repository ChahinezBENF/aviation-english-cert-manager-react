import React from 'react'
import '../styles/components.css';

export default function IntroContent() {
    return (
        <div className="intro-content">
            <section className="intro-header">
                <h1>Welcome to ICAO Certification Management</h1>
                <p>
                    Your gateway to efficient and seamless aviation certification management. 
                    Discover a platform that ensures compliance, improves efficiency, and enhances safety for aviation professionals worldwide.
                </p>
            </section>
            <section className="info-section">
                <h2>What We Offer</h2>
                <div className="features">
                    <div className="feature">
                        <h3>Track Certifications</h3>
                        <p>
                            Easily manage ICAO English certifications for air traffic controllers and pilots, ensuring they remain current and valid.
                        </p>
                    </div>
                    <div className="feature">
                        <h3>Streamline Processes</h3>
                        <p>
                            Automated reminders, detailed analytics, and scheduling tools to save time and improve accuracy.
                        </p>
                    </div>
                    <div className="feature">
                        <h3>Enhance Compliance</h3>
                        <p>
                            Stay updated with international aviation standards and streamline the recertification process.
                        </p>
                    </div>
                </div>
            </section>
            <section className="importance-section">
                <h2>Why ICAO Certification Matters</h2>
                <p>
                    ICAO English proficiency certification is vital for safe, effective communication in global aviation. 
                    Our platform supports aviation professionals in maintaining the highest standards of operational excellence.
                </p>
                <ul>
                    <li>Ensure global safety and compliance.</li>
                    <li>Enable seamless communication across international airspace.</li>
                    <li>Plan certifications with confidence and efficiency.</li>
                </ul>
            </section>
            <section className="cta-section">
                <h2>Get Started Today</h2>
                <p>
                    Join the growing community of aviation professionals and organizations using ICAO Certification Management. 
                    Stay ahead with cutting-edge tools and insights tailored to your needs.
                </p>
                <button>Learn More</button>
            </section>
        </div>
    );
}