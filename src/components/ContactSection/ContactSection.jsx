import { useState } from 'react';
import { useReveal } from '../../hooks/useAnimations';
import './ContactSection.css';

export default function ContactSection() {
  const [headerRef, headerVisible] = useReveal();
  const [infoRef, infoVisible] = useReveal();
  const [formRef, formVisible] = useReveal();
  const [footerRef, footerVisible] = useReveal();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section section-contact">
      <div
        ref={headerRef}
        className={`section-header reveal-element ${headerVisible ? 'revealed' : ''}`}
      >
        <div className="section-label">
          <span className="label-bracket">[</span>
          <span className="label-text">SECTION_04</span>
          <span className="label-bracket">]</span>
        </div>
        <h2
          className="section-title glitch-text"
          data-text="CONTACT_SIGNAL"
        >
          CONTACT_SIGNAL
        </h2>
      </div>

      <div className="contact-grid">
        <div
          ref={infoRef}
          className={`contact-info reveal-element ${infoVisible ? 'revealed' : ''}`}
        >
          <p className="contact-desc">
            Initiating secure communication channel. All transmissions are
            encrypted via VOID_PROTOCOL_V4.
          </p>
          <div className="contact-channels">
            <div className="channel-item">
              <span className="channel-icon material-icons">mail</span>
              <div className="channel-data">
                <span className="channel-label">EMAIL_RELAY</span>
                <span className="channel-value">v.raven@monolith.sys</span>
              </div>
            </div>
            <div className="channel-item">
              <span className="channel-icon material-icons">location_on</span>
              <div className="channel-data">
                <span className="channel-label">PHYSICAL_NODE</span>
                <span className="channel-value">Sector_09, Neo-Tokyo</span>
              </div>
            </div>
            <div className="channel-item">
              <span className="channel-icon material-icons">language</span>
              <div className="channel-data">
                <span className="channel-label">NETWORK_PORTAL</span>
                <span className="channel-value">monolith.sys/vraven</span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={formRef}
          className={`reveal-element ${formVisible ? 'revealed' : ''}`}
        >
          {submitted ? (
            <div className="form-success">
              <span className="success-icon material-icons">check_circle</span>
              <h3 className="success-title">TRANSMISSION_SENT</h3>
              <p className="success-text">
                Signal received. Decryption in progress.
                <br />
                Expected response: 24-48 cycles.
              </p>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              aria-label="Contact form"
            >
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  DESIGNATION
                </label>
                <input
                  type="text"
                  id="contact-name"
                  className="form-input"
                  placeholder="ENTER_NAME"
                  autoComplete="name"
                  required
                />
                <div className="input-line" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  EMAIL_NODE
                </label>
                <input
                  type="email"
                  id="contact-email"
                  className="form-input"
                  placeholder="ENTER_EMAIL"
                  autoComplete="email"
                  required
                />
                <div className="input-line" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  TRANSMISSION
                </label>
                <textarea
                  id="contact-message"
                  className="form-input form-textarea"
                  placeholder="ENTER_MESSAGE"
                  rows="5"
                  required
                />
                <div className="input-line" />
              </div>
              <button type="submit" className="btn-primary">
                <span className="btn-text">SEND_SIGNAL</span>
                <span className="btn-arrow material-icons">send</span>
                <span className="btn-glitch-layer" />
              </button>
            </form>
          )}
        </div>
      </div>

      <div
        ref={footerRef}
        className={`contact-footer reveal-element ${footerVisible ? 'revealed' : ''}`}
      >
        <div className="footer-status">
          <span>SYSTEM_RELIABILITY: OPTIMAL</span>
          <span className="meta-divider">|</span>
          <span>ENCRYPTION_LEVEL: V4</span>
          <span className="meta-divider">|</span>
          <span>MONOLITH_OS © 2088-2094</span>
        </div>
      </div>
    </section>
  );
}
