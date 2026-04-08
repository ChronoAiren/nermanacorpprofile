import { useState } from 'react';
import { useReveal } from '../../hooks/useAnimations';
import './ContactSection.css';
import data from '../../data.json';

export default function ContactSection() {
  const [headerRef, headerVisible] = useReveal();
  const [infoRef, infoVisible] = useReveal();
  const [footerRef, footerVisible] = useReveal();

  const { personal, social } = data;

  // Smart link generation based on email provider and location
  const getSmartEmailLink = (email) => {
    if (!email) return null;
    // Gmail users get Gmail compose link
    if (email.includes('@gmail.com')) {
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    }
    // Outlook/Hotmail users
    if (email.includes('@outlook.com') || email.includes('@hotmail.com')) {
      return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}`;
    }
    // Yahoo users
    if (email.includes('@yahoo.com')) {
      return `https://compose.mail.yahoo.com/?to=${encodeURIComponent(email)}`;
    }
    // Default mailto for others
    return `mailto:${email}`;
  };

  const getSmartLocationLink = (location) => {
    if (!location) return null;
    // Open Google Maps with location search
    return `https://www.google.com/maps/search/${encodeURIComponent(location)}`;
  };

  // Define contact channels based on data availability
  const channels = [
    {
      key: 'email',
      icon: 'mail',
      label: 'EMAIL',
      value: personal?.email,
      href: getSmartEmailLink(personal?.email),
      external: personal?.email?.includes('@gmail.com') || personal?.email?.includes('@outlook.com') || personal?.email?.includes('@hotmail.com') || personal?.email?.includes('@yahoo.com')
    },
    {
      key: 'location',
      icon: 'location_on',
      label: 'LOCATION',
      value: personal?.location,
      href: getSmartLocationLink(personal?.location),
      external: true
    },
    {
      key: 'phone',
      icon: 'phone',
      label: 'PHONE',
      value: personal?.phone || personal?.subnetId,
      href: personal?.phone || personal?.subnetId ? `tel:${(personal?.phone || personal?.subnetId).replace(/\s/g, '')}` : null,
      external: false
    }
  ].filter(c => c.value); // Only keep channels with values

  // Define social links
  const socialLinks = [
    { key: 'linkedin', icon: 'linkedin', label: 'LINKEDIN', baseUrl: 'linkedin.com/in/' },
    { key: 'github', icon: 'github', label: 'GITHUB', baseUrl: 'github.com/' },
    { key: 'twitter', icon: 'twitter', label: 'TWITTER', baseUrl: 'twitter.com/' },
    { key: 'facebook', icon: 'facebook', label: 'FACEBOOK', baseUrl: 'facebook.com/' },
    { key: 'instagram', icon: 'instagram', label: 'INSTAGRAM', baseUrl: 'instagram.com/' },
  ].map(platform => {
    const username = social?.[platform.key] || personal?.[platform.key];
    return username ? {
      ...platform,
      value: username,
      href: `https://${platform.baseUrl}${username}`
    } : null;
  }).filter(Boolean);

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
        {(channels.length > 0 || socialLinks.length > 0 || personal?.name) && (
          <div
            ref={infoRef}
            className={`contact-info reveal-element ${infoVisible ? 'revealed' : ''}`}
          >
            <p className="contact-desc">
              Initiating secure communication channel. Click any link to connect directly.
            </p>

            {/* Contact Channels - Direct Links */}
            {channels.length > 0 && (
              <div className="contact-channels">
                {channels.map(channel => (
                  <a
                    key={channel.key}
                    href={channel.href || '#'}
                    className="channel-item"
                    target={channel.href?.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span className="channel-icon material-icons">{channel.icon}</span>
                    <div className="channel-data">
                      <span className="channel-label">{channel.label}</span>
                      <span className="channel-value">{channel.value}</span>
                    </div>
                    <span className="channel-arrow material-icons">open_in_new</span>
                  </a>
                ))}
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="social-links">
                <h4 className="social-title">SOCIAL_NETWORKS</h4>
                <div className="social-grid">
                  {socialLinks.map(social => (
                    <a
                      key={social.key}
                      href={social.href}
                      className="social-item"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <span className="social-icon">{social.label}</span>
                      <span className="social-arrow material-icons">open_in_new</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
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
