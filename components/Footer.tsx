"use client";

import { useState } from "react";
import { ButtonTrapezoid } from "./ButtonTrapezoid";
import { XIcon } from "./icons/X";
import { InstagramIcon } from "./icons/Instagram";
import { YouTubeIcon } from "./icons/YouTube";
import { LinkedInIcon } from "./icons/LinkedIn";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up newsletter subscription API
    // For now, use mailto template
    window.location.href = `mailto:newsletter@behindthebeat.com?subject=Newsletter Subscription&body=Email: ${encodeURIComponent(email)}`;
  };

  return (
    <footer className="site-footer">
      <div className="container-page">
        <div className="footer-content stack-lg">
          <div className="footer-social">
            <h3 className="footer-heading">Follow us</h3>
            <ul className="footer-social-list">
              <li>
                <a
                  href="https://twitter.com/behindthebeat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Follow us on X/Twitter"
                >
                  <XIcon className="footer-social-icon" />
                  <span>X/Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/behindthebeat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Follow us on Instagram"
                >
                  <InstagramIcon className="footer-social-icon" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@behindthebeat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Subscribe on YouTube"
                >
                  <YouTubeIcon className="footer-social-icon" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/behindthebeat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Follow us on LinkedIn"
                >
                  <LinkedInIcon className="footer-social-icon" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3 className="footer-heading">Newsletter</h3>
            <p className="footer-newsletter-text">
              Get the latest reviews and podcast episodes delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
              <label htmlFor="newsletter-email" className="footer-newsletter-label">
                Email address
              </label>
              <div className="footer-newsletter-input-group">
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="footer-newsletter-input"
                  required
                  aria-label="Email address for newsletter"
                />
                <ButtonTrapezoid
                  type="submit"
                  tone="primary"
                  size="md"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </ButtonTrapezoid>
              </div>
            </form>
          </div>

          <div className="footer-copyright">
            <p>Behind the Beat © {currentYear}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

