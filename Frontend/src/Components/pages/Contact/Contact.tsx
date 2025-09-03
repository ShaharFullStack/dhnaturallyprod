import { JSX, useState, useEffect } from "react";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import "./Contact.css";
import { Mail, Phone, Clock, User, Package, RefreshCw, Smartphone } from "lucide-react";

interface ContactForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    healthConcern: string;
    message: string;
    experience: string;
}

export function Contact(): JSX.Element {
    const { language } = useLanguage();
    const [formData, setFormData] = useState<ContactForm>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        healthConcern: "",
        message: "",
        experience: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const sections = document.querySelectorAll('[data-scroll-animate]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            console.log("Contact form submitted:", formData);
            setIsSubmitting(false);
            // Reset form or show success message
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                subject: "",
                healthConcern: "",
                message: "",
                experience: ""
            });
            alert(t("success.contact.submitted", language));
        }, 2000);
    };

    const contactInfo = [
        {
            icon: <Mail size={20} aria-hidden={false} aria-label="Email" />,
            title: t("contact.info.email", language),
            details: "info@dhnaturally.com",
            description: "Professional consultation and product inquiries"
        },
        {
            icon: <Phone size={20} aria-hidden={false} aria-label="Phone / WhatsApp" />,
            title: t("contact.info.whatsapp", language),
            details: "+972 53-335-3481",
            description: t("contact.info.whatsapp.note", language)
        },
        {
            icon: <Clock size={20} aria-hidden={false} aria-label="Hours" />,
            title: t("contact.hours.title", language),
            details: "Sun-Thu: 9:00-18:00, Fri: 9:00-14:00",
            description: t("contact.hours.emergency", language)
        }
    ];

    const consultationServices = [
        {
            icon: <User size={18} aria-hidden={false} aria-label="Individual" />,
            title: t("contact.consultation.individual", language),
            description: t("contact.consultation.individual.description", language)
        },
        {
            icon: <Package size={18} aria-hidden={false} aria-label="Product" />,
            title: t("contact.consultation.product", language),
            description: t("contact.consultation.product.description", language)
        },
        {
            icon: <RefreshCw size={18} aria-hidden={false} aria-label="Follow-up" />,
            title: t("contact.consultation.followup", language),
            description: t("contact.consultation.followup.description", language)
        }
    ];

    return (
        <div className="contact">
            {/* Hero Section */}
            <div className="contact-hero">
                <div className="hero-background"></div>
                <div className="contact-hero-inner">
                    <h1 className="h1-title" data-scroll-animate>DHnaturally</h1>
                    <h1 className="contact-hero-title" data-scroll-animate>{t("contact.title", language)}</h1>
                    <p className="contact-hero-subtitle" data-scroll-animate>{t("contact.description", language)}</p>
                </div>
            </div>

            <main className="contact-container">
                <div className="contact-grid">
                    {/* Contact Form */}
                    <section className="card form-card">
                        <h2 className="card-title">{t("contact.form.title", language)}</h2>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="row two-up">
                                <div className="field">
                                    <label htmlFor="firstName" className="label">* {t("contact.form.firstName", language)} </label>
                                    <input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="input" />
                                </div>
                                <div className="field">
                                    <label htmlFor="lastName" className="label">* {t("contact.form.lastName", language)} </label>
                                    <input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="input" />
                                </div>
                            </div>

                            <div className="row two-up">
                                <div className="field">
                                    <label htmlFor="email" className="label">* {t("contact.form.email", language)} </label>
                                    <input id="email" name="email" value={formData.email} onChange={handleInputChange} required type="email" className="input" />
                                </div>
                                <div className="field">
                                    <label htmlFor="phone" className="label">* {t("contact.form.phone", language)}</label>
                                    <input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="input" />
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="subject" className="label">* {t("contact.form.subject", language)} </label>
                                <input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="input" />
                            </div>

                            <div className="field">
                                <label htmlFor="message" className="label">* {t("contact.form.message", language)} </label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="input textarea" placeholder="Please describe your health needs and how we can help you..." />
                            </div>

                            <button type="submit" disabled={isSubmitting} className={`btn primary ${isSubmitting ? 'disabled' : ''}`}>
                                {isSubmitting ? "Sending..." : t("contact.form.submit", language)}
                            </button>
                        </form>
                    </section>

                    {/* Contact Information */}
                    <aside className="info-column">
                        <section className="card info-card">
                            <h3 className="card-title">{t("contact.info.title", language)}</h3>
                            <div className="info-list">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="info-item">
                                        <div className="info-icon">{info.icon}</div>
                                        <div className="info-body">
                                            <h4 className="info-title">{info.title}</h4>
                                            <p className="info-details">{info.details}</p>
                                            <p className="info-desc">{info.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="card info-card">
                            <h3 className="card-title">{t("contact.consultation.title", language)}</h3>
                            <div className="info-list">
                                {consultationServices.map((service, index) => (
                                    <div key={index} className="info-item">
                                        <div className="info-icon">{service.icon}</div>
                                        <div className="info-body">
                                            <h4 className="info-title">{service.title}</h4>
                                            <p className="info-desc">{service.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="whatsapp-cta card">
                            <div className="whatsapp-inner">
                                <div className="whatsapp-icon"><Smartphone size={34} aria-hidden={false} aria-label="WhatsApp" /></div>
                                <h3 className="whatsapp-title">Quick WhatsApp Consultation</h3>
                                <p className="whatsapp-desc">Get immediate answers to your questions</p>
                                <button className="btn whatsapp-btn">{t("whatsapp.cta", language)}</button>
                            </div>
                        </section>
                    </aside>
                </div>
            </main>
        </div>
    );
}