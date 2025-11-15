"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);

      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";

      // Focus close button when opened
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      // Load MailChimp script if not already loaded
      const existingScript = document.querySelector('script[src*="mc-validate.js"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
        script.async = true;
        document.body.appendChild(script);

        // Initialize MailChimp field names
        script.onload = () => {
          if (typeof window !== "undefined") {
            const win = window as unknown as {
              fnames?: unknown[];
              ftypes?: unknown[];
            };
            if (!win.fnames) {
              win.fnames = [];
            }
            if (!win.ftypes) {
              win.ftypes = [];
            }
            win.fnames[0] = "EMAIL";
            win.ftypes[0] = "email";
            win.fnames[1] = "FNAME";
            win.ftypes[1] = "text";
            win.fnames[2] = "LNAME";
            win.ftypes[2] = "text";
            win.fnames[4] = "PHONE";
            win.ftypes[4] = "phone";
            win.fnames[5] = "BIRTHDAY";
            win.ftypes[5] = "birthday";
          }
        };
      } else {
        // Script already loaded, just initialize fields
        const win = window as unknown as {
          fnames?: unknown[];
          ftypes?: unknown[];
        };
        if (!win.fnames) {
          win.fnames = [];
        }
        if (!win.ftypes) {
          win.ftypes = [];
        }
        win.fnames[0] = "EMAIL";
        win.ftypes[0] = "email";
        win.fnames[1] = "FNAME";
        win.ftypes[1] = "text";
        win.fnames[2] = "LNAME";
        win.ftypes[2] = "text";
        win.fnames[4] = "PHONE";
        win.ftypes[4] = "phone";
        win.fnames[5] = "BIRTHDAY";
        win.ftypes[5] = "birthday";
      }

      return () => {
        document.body.style.overflow = "";
      };
    } else {
      setIsMounted(false);
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen && !isMounted) {
    return null;
  }

  return (
    <div
      className={`subscribe-overlay fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}
      aria-hidden={!isOpen}
      onClick={handleBackdropClick}
    >
      <div className="subscribe-backdrop fixed inset-0 bg-black/50" aria-hidden="true" />
      <div
        ref={dialogRef}
        className="subscribe-dialog fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-neutral-ui-surface p-6 shadow-soft focus:outline-none surface-chamfer"
        style={{ backgroundColor: "var(--magazine-white)" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-title"
        tabIndex={-1}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="subscribe-close absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-2xl text-neutral-ui-text hover:text-brand-purple800 focus:outline-none focus:ring-2 focus:ring-brand-purple800"
          onClick={onClose}
          aria-label="Close subscribe form"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div id="mc_embed_shell">
          <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css" />

          <style jsx global>{`
            #mc_embed_signup {
              background: var(--magazine-white);
              font: 16px var(--font-body), Helvetica, Arial, sans-serif;
              max-width: 600px;
              width: 100%;
              margin: 0 auto;
              padding: 22px 22px 16px;
              border-radius: 14px;
              box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
              color: var(--brand-purple-800);
            }
            .btb-form__logo {
              display: block;
              margin: 4px auto 14px auto;
              max-width: 200px;
              height: auto;
            }
            #mc_embed_signup h2 {
              margin: 6px 0 8px 0;
              color: var(--brand-purple-800);
              font-weight: 800;
              letter-spacing: 0.02em;
            }
            .btb-note {
              margin: 0 0 14px 0;
              color: var(--brand-purple-600);
              line-height: 1.4;
              font-size: 0.95rem;
            }
            #mc_embed_signup .mc-field-group {
              margin-bottom: 12px;
            }
            #mc_embed_signup label {
              display: block;
              margin-bottom: 6px;
              color: var(--brand-purple-800);
              font-weight: 700;
            }
            #mc_embed_signup input[type="email"],
            #mc_embed_signup input[type="text"],
            #mc_embed_signup input[type="tel"] {
              width: 100%;
              padding: 12px 14px;
              border: 1px solid rgba(0, 0, 0, 0.08);
              border-radius: 10px;
              background: #fff;
              outline: none;
              transition: box-shadow 0.15s ease, border-color 0.15s ease;
              box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
            }
            #mc_embed_signup input:focus {
              border-color: var(--brand-pink-500);
              box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand-pink-100) 35%, transparent);
            }
            #mc_embed_signup .indicates-required {
              color: var(--brand-purple-600);
              margin-bottom: 10px;
            }
            #mc_embed_signup .asterisk {
              color: var(--brand-pink-500);
              font-weight: 800;
              margin-left: 2px;
            }
            #mc_embed_signup .btb-trap {
              display: inline-block;
            }
            #mc_embed_signup #mc-embedded-subscribe {
              all: unset;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: var(--space-3) var(--space-4);
              min-height: 44px;
              font-family: var(--font-display), Helvetica, Arial, sans-serif;
              font-size: 0.875rem;
              font-weight: 600;
              letter-spacing: 0.06em;
              text-transform: uppercase;
              color: var(--brand-pink-100);
              background-color: var(--brand-purple-800);
              border: none;
              cursor: pointer;
              user-select: none;
              white-space: nowrap;
              box-shadow: var(--shadow-soft);
              transition: background-color 160ms ease, box-shadow 160ms ease;
              border-radius: 0;
              -webkit-clip-path: polygon(
                var(--ch) 0,
                calc(100% - var(--ch)) 0,
                100% var(--ch),
                100% calc(100% - var(--ch)),
                calc(100% - var(--ch)) 100%,
                var(--ch) 100%,
                0 calc(100% - var(--ch)),
                0 var(--ch)
              );
              clip-path: polygon(
                var(--ch) 0,
                calc(100% - var(--ch)) 0,
                100% var(--ch),
                100% calc(100% - var(--ch)),
                calc(100% - var(--ch)) 100%,
                var(--ch) 100%,
                0 calc(100% - var(--ch)),
                0 var(--ch)
              );
            }
            #mc_embed_signup #mc-embedded-subscribe:hover {
              background-color: var(--brand-purple-600);
            }
            #mc_embed_signup #mc-embedded-subscribe:focus-visible {
              outline: 2px solid color-mix(in oklab, var(--brand-purple-800) 55%, transparent);
              outline-offset: 4px;
            }
            #mc_embed_signup .btb-actions {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 10px;
              margin-top: 12px;
            }
            #mc_embed_signup .btb-badge {
              opacity: 0.85;
            }
            #mc_embed_signup .btb-badge img {
              width: 180px;
              height: auto;
              display: block;
              margin: 0 auto;
              filter: none;
            }
            #mc_embed_signup .response {
              color: var(--brand-purple-800);
              margin-top: 8px;
            }
            @media (max-width: 420px) {
              #mc_embed_signup {
                padding: 18px 16px 14px;
              }
              .btb-actions {
                flex-direction: column;
                align-items: stretch;
                gap: 12px;
              }
              #mc_embed_signup .btb-badge img {
                width: 160px;
              }
            }
          `}</style>

          <div id="mc_embed_signup">
            <Image
              className="btb-form__logo"
              src="/images/logo.png"
              alt="Behind The Beat logo"
              width={200}
              height={78}
              priority
            />

            <form
              action="https://github.us22.list-manage.com/subscribe/post?u=f1b69e21f3230273dacff4ed5&id=9df3622d09&f_id=00e5c2e1f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
              noValidate
            >
              <div id="mc_embed_signup_scroll">
                <h2 id="subscribe-title">Subscribe</h2>
                <p className="btb-note">
                  Hey! We hate pop-up forms as much as you, so thank you for choosing to click on the subscribe button.
                  We promise to never spam your inbox, and unsubscribing is sad for us but easy for you.
                </p>
                <div className="indicates-required">
                  <span className="asterisk">*</span> indicates required
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-EMAIL">
                    Email Address <span className="asterisk">*</span>
                  </label>
                  <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required value="" />
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-FNAME">
                    First Name <span className="asterisk">*</span>
                  </label>
                  <input type="text" name="FNAME" className="text" id="mce-FNAME" value="" />
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-LNAME">
                    Last Name <span className="asterisk">*</span>
                  </label>
                  <input type="text" name="LNAME" className="text" id="mce-LNAME" value="" />
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-PHONE">Phone Number</label>
                  <input type="text" name="PHONE" className="REQ_CSS" id="mce-PHONE" value="" />
                </div>
                <div id="mce-responses" className="clear foot">
                  <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                  <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
                </div>
                <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                  <input
                    type="text"
                    name="b_f1b69e21f3230273dacff4ed5_9df3622d09"
                    tabIndex={-1}
                    value=""
                  />
                </div>
                <div className="optionalParent">
                  <div className="btb-actions">
                    <span className="btb-trap">
                      <input
                        type="submit"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        value="Subscribe"
                        aria-label="Subscribe"
                      />
                    </span>
                    <p className="btb-badge" style={{ margin: 0 }}>
                      <a href="http://eepurl.com/jpl9DA" title="Mailchimp - email marketing made easy and fun">
                        <span style={{ display: "inline-block", backgroundColor: "transparent", borderRadius: "4px" }}>
                          <img
                            className="refferal_badge"
                            src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                            alt="Intuit Mailchimp"
                          />
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

