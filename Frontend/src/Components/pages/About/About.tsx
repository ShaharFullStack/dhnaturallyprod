import { JSX, useState, useEffect } from "react";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import "./About.css";
import { ShieldCheck, RefreshCw, Scale, Microscope, CheckCircle, User, Star, Award, ArrowRight, Quote, Heart, BookOpen, Users } from 'lucide-react';
import { Button } from '../../UI/Button/Buttons';
import cert1 from '../../../Assets/Images/certifications/IMG_0003.jpg';
import cert2 from '../../../Assets/Images/certifications/IMG_0004.jpg';
import cert3 from '../../../Assets/Images/certifications/IMG_0005.jpg';
import cert4 from '../../../Assets/Images/certifications/IMG_0006.jpg';
import cert5 from '../../../Assets/Images/certifications/IMG_0007.jpg';
import cert6 from '../../../Assets/Images/certifications/IMG_0008.jpg';
import dafnaImg from '../../../Assets/Images/dafna.png';
import storyImage from '../../../Assets/Images/logo.png';
export function About(): JSX.Element {
    const { language } = useLanguage();
    const [lightbox, setLightbox] = useState<{ src: string; title?: string; description?: string } | null>(null);

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

    const certifications = [
        {
            title: t("about.certifications.naturopathy.title", language),
            description: t("about.certifications.naturopathy.description", language),
            image: cert1
        },
        {
            title: t("about.certifications.integrative.title", language),
            description: t("about.certifications.integrative.description", language),
            image: cert2
        },
        {
            title: t("about.certifications.homeopathy.title", language),
            description: t("about.certifications.homeopathy.description", language),
            image: cert3
        }
    ];

    // gallery items (primary certifications + extra visual badges)
    const galleryItems: { src: string; title?: string; description?: string }[] = [
        ...certifications.map((c) => ({ src: c.image as string, title: c.title, description: c.description })),
        { src: cert4 },
        { src: cert5 },
        { src: cert6 }
    ];

    const values = [
        {
            icon: ShieldCheck,
            title: t("about.values.prevention", language),
            description: t("about.values.prevention.description", language)
        },
        {
            icon: RefreshCw,
            title: t("about.values.restoration", language),
            description: t("about.values.restoration.description", language)
        },
        {
            icon: Scale,
            title: t("about.values.balance", language),
            description: t("about.values.balance.description", language)
        },
        {
            icon: Microscope,
            title: t("about.values.evidence", language),
            description: t("about.values.evidence.description", language)
        },
        {
            icon: CheckCircle,
            title: t("about.values.safety", language),
            description: t("about.values.safety.description", language)
        },
        {
            icon: User,
            title: t("about.values.individualized", language),
            description: t("about.values.individualized.description", language)
        }
    ];

    const testimonials = [
        {
            name: t("about.testimonials.1.name", language),
            role: t("about.testimonials.1.role", language),
            text: t("about.testimonials.1.text", language),
            rating: 5
        },
        {
            name: t("about.testimonials.2.name", language),
            role: t("about.testimonials.2.role", language),
            text: t("about.testimonials.2.text", language),
            rating: 5
        },
        {
            name: t("about.testimonials.3.name", language),
            role: t("about.testimonials.3.role", language),
            text: t("about.testimonials.3.text", language),
            rating: 5
        }
    ];

    return (
        <div className="about">
            {/* Hero Section */}
            <div className="about-hero">
                <div className="hero-background"></div>
                <div className="about-hero-inner">

                    <h1 className="h1-title" data-scroll-animate>DHnaturally</h1>
                    <h1 className="about-hero-title" data-scroll-animate>{t("about.title", language)}</h1>
                    <p className="about-hero-subtitle" data-scroll-animate>{t("about.subtitle", language)}</p>
                    <div className="hero-cta" data-scroll-animate>
                        <Button className="primary lg">
                            {t("cta.getConsultation", language)}
                            <ArrowRight size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <section className="about-section about-story" data-scroll-animate id="story">
                <div className="story-container">
                    <div className="story-section-inner">
                        <div className="section-header">
                            <h2 className="section-title">{t("about.story.title", language)}</h2>
                            <div className="section-divider"></div>
                        </div>
                        <div className="story-content">
                            <div className="story-text">
                                <p className="lead-text">{t("about.story.paragraph1", language)}</p>
                                <p>{t("about.story.paragraph2", language)}</p>
                            </div>
                            <div className="story-visual">
                                <div className="story-card">
                                    <img src={storyImage} alt={t("about.story.imageAlt", language)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-section" >
                <div className="about-mission" data-scroll-animate id="mission">
                    <div className="container">
                        <div className="section-inner text-center">
                            <h2 className="section-title">{t("about.mission.title", language)}</h2>
                            <p className="section-subtitle large">{t("about.mission.subtitle", language)}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dafna's Personal Story Section */}
            <section className="about-section about-dafna" data-scroll-animate id="dafna">
                <div className="container">
                    <div className="section-inner">
                        <div className="section-header">
                            <h2 className="section-title text-center">{t("home.expertise.title", language)}</h2>
                            <div className="section-divider center"></div>
                            <p className="section-subtitle">{t("home.expertise.description", language)}</p>
                        </div>

                        <div className="dafna-features-grid">
                            <div className="dafna-photo-wrap" style={{ animationDelay: '0.05s' }}>
                                <div className="dafna-photo-frame">
                                    <img src={dafnaImg} alt={t("about.dafna.photoAlt", language) || 'Dafna'} className="dafna-photo" />
                                </div>
                                <div className="dafna-photo-caption">
                                    <h3 className="dafna-name">{t("about.dafna.name", language) || 'Dafna Haliwa-Marcus'}</h3>
                                    <p className="dafna-title">{t("about.dafna.title", language) || t("home.expertise.dafna.title", language) || 'Naturopath & Homeopath'}</p>
                                </div>
                            </div>

                            <div className="dafna-features">
                                <div className="dafna-feature-card" style={{ animationDelay: '0.1s' }}>
                                    <div className="feature-icon">
                                        <Award size={28} />
                                    </div>
                                    <h3 className="feature-title">{t("home.expertise.dafna.education", language)}</h3>
                                    <p className="feature-description">{t("home.expertise.dafna.education.desc", language)}</p>
                                </div>

                                <div className="dafna-feature-card" style={{ animationDelay: '0.2s' }}>
                                    <div className="feature-icon">
                                        <Heart size={28} />
                                    </div>
                                    <h3 className="feature-title">{t("home.expertise.personal.journey", language)}</h3>
                                    <p className="feature-description">{t("home.expertise.personal.journey.desc", language)}</p>
                                </div>

                                <div className="dafna-feature-card" style={{ animationDelay: '0.3s' }}>
                                    <div className="feature-icon">
                                        <BookOpen size={28} />
                                    </div>
                                    <h3 className="feature-title">{t("home.expertise.unique.formulas", language)}</h3>
                                    <p className="feature-description">{t("home.expertise.unique.formulas.desc", language)}</p>
                                </div>

                                <div className="dafna-feature-card" style={{ animationDelay: '0.4s' }}>
                                    <div className="feature-icon">
                                        <Users size={28} />
                                    </div>
                                    <h3 className="feature-title">{t("home.expertise.patient.success", language)}</h3>
                                    <p className="feature-description">{t("home.expertise.patient.success.desc", language)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="about-section" data-scroll-animate id="values">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title text-center">{t("about.values.title", language)}</h2>
                        <div className="section-divider center"></div>
                    </div>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <article key={index} className="value-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="value-icon">{
                                    (() => {
                                        const Icon = value.icon as any;
                                        return <Icon size={28} />;
                                    })()
                                }</div>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-desc">{value.description}</p>
                                <div className="value-accent"></div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="about-section about-certifications" data-scroll-animate id="certifications">
                <div className="container">
                    <div className="text-center">
                        <div className="section-header">
                            <h2 className="section-title">{t("about.certifications.title", language)}</h2>
                            <div className="section-divider center"></div>
                            <p className="section-subtitle">{t("about.certifications.subtitle", language)}</p>
                        </div>
                    </div>

                    <div className="cert-grid">
                        {galleryItems.map((item, i) => (
                            <button
                                key={i}
                                className="cert-thumb"
                                onClick={() => setLightbox(item)}
                                aria-label={item.title || t("about.certifications.alt", language)}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="cert-image-wrap">
                                    <img src={item.src} alt={item.title || t("about.certifications.alt", language)} className="cert-image" loading="lazy" />
                                    <div className="cert-overlay">
                                        <Award size={24} />
                                    </div>
                                </div>
                                {item.title && <div className="cert-thumb-caption">{item.title}</div>}
                            </button>
                        ))}
                    </div>

                    {lightbox && (
                        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
                            <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
                                <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">×</button>
                                <img src={lightbox.src} alt={lightbox.title || t("about.certifications.alt", language)} className="lightbox-image" />
                                {lightbox.title && <div className="lightbox-caption">{lightbox.title}</div>}
                                {lightbox.description && <div className="lightbox-desc">{lightbox.description}</div>}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Professional Consultation Section */}
            <section className="consultation-section" data-testid="consultation-section">
                <div className="hero-container">
                    <div className="section-header">
                        <h2 className="section-title">
                            {language === 'he' ? 'ייעוץ מקצועי בנטורופתיה' : 'Professional Naturopathy Consultation'}
                        </h2>
                        <p className="section-description">
                            {language === 'he'
                                ? 'ייעוץ אישי מנטורופתית מוסמכת להתאמת תכשירים טבעיים.'
                                : 'Personalized consultation from a certified naturopath to find the most suitable natural remedies.'
                            }
                        </p>
                    </div>

                    <div className="consultation-grid">
                        <div className="consultation-left">
                            <h3 className="section-subtitle">
                                {language === 'he' ? 'מה כולל הייעוץ?' : 'What Does the Consultation Include?'}
                            </h3>
                            <div className="consultation-list">
                                <div className="list-item">
                                    <CheckCircle className="icon" />
                                    <div>
                                        <h4 className="feature-title">
                                            {language === 'he' ? 'הערכה מקיפה' : 'Comprehensive Assessment'}
                                        </h4>
                                        <p className="feature-description">
                                            {language === 'he'
                                                ? 'בחינה מפורטת של המצב הבריאותי והתסמינים'
                                                : 'Detailed examination of health condition and symptoms'
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="list-item">
                                    <CheckCircle className="icon" />
                                    <div>
                                        <h4 className="feature-title">
                                            {language === 'he' ? 'המלצות מותאמות אישית' : 'Personalized Recommendations'}
                                        </h4>
                                        <p className="feature-description">
                                            {language === 'he'
                                                ? 'תכשירים טבעיים מותאמים לצרכים האישיים שלכם'
                                                : 'Natural remedies tailored to your individual needs'
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="list-item">
                                    <CheckCircle className="icon" />
                                    <div>
                                        <h4 className="feature-title">
                                            {language === 'he' ? 'מעקב ותמיכה' : 'Follow-up & Support'}
                                        </h4>
                                        <p className="feature-description">
                                            {language === 'he'
                                                ? 'ליווי מקצועי לאורך תהליך הטיפול'
                                                : 'Professional guidance throughout the treatment process'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="feature-card consultation-card">
                            <div className="card-content">
                                <h3 className="section-subtitle">
                                    {language === 'he' ? 'היעצו עכשיו' : 'Consult Now'}
                                </h3>
                                <p className="feature-description">
                                    {language === 'he'
                                        ? 'ייעוץ ראשוני ללא עלות - בדקו אם הנטורופתיה מתאימה לכם'
                                        : 'Initial consultation at no cost - see if naturopathy is right for you'
                                    }
                                </p>
                                <Button className="primary full-width" data-testid="consultation-cta">
                                    {language === 'he' ? 'התחל בייעוץ חינם' : 'Start Free Consultation'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action in testimonials */}
                    <div className="text-center mt-16">
                        <h3 className="section-subtitle">
                            {language === 'he' ? 'התחילו את הדרך לבריאות טובה יותר.' : 'Begin your path to better health.'}
                        </h3>
                        <Button className="primary" data-testid="testimonials-consultation-cta">
                            {language === 'he' ? 'קבלו ייעוץ מקצועי חינם' : 'Get Free Professional Consultation'}
                        </Button>
                        <Button className="outline" data-testid="testimonials-shop-cta">
                            {language === 'he' ? 'החיים הטבעיים שלך מחכים' : 'Your Natural Life Awaits'}
                        </Button>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="about-section about-testimonials" data-scroll-animate id="testimonials">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title text-center">{t("home.testimonials.title", language)}</h2>
                        <div className="section-divider center"></div>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card" style={{ animationDelay: `${index * 0.15}s` }}>
                                <div className="testimonial-quote">
                                    <Quote size={24} />
                                </div>
                                <div className="testimonial-rating">{[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="testimonial-star" />
                                ))}</div>
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <div className="testimonial-meta">
                                    <div className="testimonial-name">{testimonial.name}</div>
                                    <div className="testimonial-role">{testimonial.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta" data-scroll-animate id="cta">
                <div className="cta-background"></div>
                <div className="container text-center">
                    <h2 className="cta-title">{t("about.cta.title", language)}</h2>
                    <p className="cta-subtitle">{t("about.cta.subtitle", language)}</p>
                    <div className="cta-buttons">
                        <Button className="primary lg">
                            {t("cta.getConsultation", language)}
                            <ArrowRight size={18} />
                        </Button>
                        <Button className="outline lg">{t("cta.shopNow", language)}</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}