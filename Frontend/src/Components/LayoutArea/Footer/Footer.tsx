import { JSX } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import "./Footer.css";

export function Footer(): JSX.Element {
    const { language } = useLanguage();
    const year = new Date().getFullYear();

    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-section">
                        <h3 className="footer-brand-title">DHnaturally</h3>
                        <p className="footer-tagline">
                            {t('footer.tagline', language)}
                        </p>
                        <div className="footer-brand-note">
                            <Heart className="heart-icon" />
                            <span>{t('footer.natural_wellness', language)}</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">
                            {t('footer.quick_links', language)}
                        </h4>
                        <nav className="footer-links">
                            <Link to="/store" className="footer-link">
                                {t('nav.store', language)}
                            </Link>
                            <Link to="/articles" className="footer-link">
                                {t('nav.articles', language)}
                            </Link>
                            <Link to="/about" className="footer-link">
                                {t('nav.about', language)}
                            </Link>
                            <Link to="/contact" className="footer-link">
                                {t('nav.contact', language)}
                            </Link>
                        </nav>
                    </div>

                    {/* Customer Support */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">
                            {t('footer.support', language)}
                        </h4>
                        <div className="footer-contact">
                            <div className="contact-item">
                                <Mail className="contact-icon" />
                                <a href="mailto:info@dhnaturally.com" className="contact-link">
                                    info@dhnaturally.com
                                </a>
                            </div>
                            <div className="contact-item">
                                <Phone className="contact-icon" />
                                <a href="tel:+972501234567" className="contact-link">
                                    +972-50-123-4567
                                </a>
                            </div>
                            <div className="contact-item">
                                <MapPin className="contact-icon contact-icon-location" />
                                <span className="contact-text">{t('footer.location', language)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Trust & Certifications */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">
                            {t('footer.trust', language)}
                        </h4>
                        <div className="footer-trust">
                            <p>✓ {t('footer.natural_ingredients', language)}</p>
                            <p>✓ {t('footer.quality_assured', language)}</p>
                            <p>✓ {t('footer.authentic_products', language)}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p className="footer-copyright">
                            © {year} DHnaturally. {t('footer.rights_reserved', language)}
                        </p>
                        <div className="footer-legal-links">
                            <Link to="/privacy" className="footer-legal-link">
                                {t('footer.privacy_policy', language)}
                            </Link>
                            <Link to="/terms" className="footer-legal-link">
                                {t('footer.terms_service', language)}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
