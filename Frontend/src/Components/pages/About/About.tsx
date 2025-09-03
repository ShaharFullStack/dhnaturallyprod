import { ArrowRight, Award, BookOpen, CheckCircle, Heart, Microscope, Quote, RefreshCw, Scale, ShieldCheck, Star, User, Users } from 'lucide-react';
import { JSX, useEffect } from "react";
import bsyaLogo from '../../../Assets/Images/certifications/BSYA.png';
import maayanotLogo from '../../../Assets/Images/certifications/Maayanot2.png';
import dafnaImg from '../../../Assets/Images/dafna.png';
import herbalsImg from '../../../Assets/Images/herbals.png';
import labWidthImg from '../../../Assets/Images/labWidth.jpeg';
import makingMedImg from '../../../Assets/Images/makingMed.png';
import makingMedsImg from '../../../Assets/Images/makingMeds.png';
import powdersImg from '../../../Assets/Images/powders.png';
import labHeightImg from '../../../Assets/Images/product2.png';
import video1 from '../../../Assets/Videos/video1.mp4';
import video2 from '../../../Assets/Videos/video2.mp4';
import video3 from '../../../Assets/Videos/video3.mp4';
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import { Button } from '../../UI/Button/Buttons';
import "./About.css";
export function About(): JSX.Element {
    const { language } = useLanguage();

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

    const institutes = [
        {
            title: t("about.institutes.bsya.title", language),
            description: t("about.institutes.bsya.description", language),
            image: bsyaLogo
        },
        {
            title: t("about.institutes.maayanot.title", language),
            description: t("about.institutes.maayanot.description", language),
            image: maayanotLogo
        }
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

                        {/* Mission Section */}
                <div className="about-mission" data-scroll-animate id="mission">
                    <div className="container">
                        <div className="section-inner text-center">
                            <h2 className="section-title">{t("about.mission.title", language)}</h2>
                            <p className="section-subtitle large">{t("about.mission.subtitle", language)}</p>
                        </div>
                    </div>
                    </div>

            {/* Medicine Making Process Section */}
            <section className="about-section about-process" data-scroll-animate id="process">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title text-center">{t("about.process.title", language)}</h2>
                        <div className="section-divider center"></div>
                        <p className="section-subtitle">{t("about.process.subtitle", language)}</p>
                    </div>

                    {/* Traditional Medicine Making */}
                    <div className="process-content">
                        <div className="process-intro">
                            <div className="process-images-grid">
                                <div className="process-image-card traditional">
                                    <img src={makingMedImg} alt={t("about.process.traditional.imageAlt", language)} />
                                    <div className="image-overlay">
                                        <h4>{t("about.process.traditional.title", language)}</h4>
                                    </div>
                                </div>
                                <div className="process-image-card mortar">
                                    <img src={makingMedsImg} alt={t("about.process.mortar.imageAlt", language)} />
                                    <div className="image-overlay">
                                        <h4>{t("about.process.mortar.title", language)}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="process-description">
                                <h3>{t("about.process.tradition.title", language)}</h3>
                                <p>{t("about.process.tradition.description", language)}</p>
                            </div>
                        </div>

                        {/* Ingredients Section */}
                        <div className="ingredients-showcase">
                            <div className="ingredients-content">
                                <h3>{t("about.process.ingredients.title", language)}</h3>
                                <p>{t("about.process.ingredients.description", language)}</p>
                            </div>
                            <div className="ingredients-images">
                                <div className="ingredient-image-card">
                                    <img src={herbalsImg} alt={t("about.process.herbs.imageAlt", language)} />
                                    <div className="ingredient-label"></div>
                                </div>
                                <div className="ingredient-image-card">
                                    <img src={powdersImg} alt={t("about.process.powders.imageAlt", language)} />
                                    <div className="ingredient-label"></div>
                                </div>
                            </div>
                        </div>

                        {/* Modern Laboratory */}
                        <div className="lab-showcase">
                            <div className="lab-content">
                                <h3>{t("about.process.lab.title", language)}</h3>
                                <p>{t("about.process.lab.description", language)}</p>
                            </div>
                            <div className="lab-images">
                                <div className="lab-image-card">
                                    <img src={labWidthImg} alt={t("about.process.lab.workspace.imageAlt", language)} />
                                    <div className="lab-label"></div>
                                </div>
                                <div className="lab-image-card">
                                    <img src={labHeightImg} alt={t("about.process.lab.equipment.imageAlt", language)} />
                                    <div className="lab-label"></div>
                                </div>
                            </div>
                        </div>

                        {/* Video Process Documentation */}
                        <div className="video-showcase">
                            <div className="video-header">
                                <h3>{t("about.process.videos.title", language)}</h3>
                                <p>{t("about.process.videos.description", language)}</p>
                            </div>
                            <div className="video-grid">
                                <div className="video-card">
                                    <video
                                        controls
                                        preload="metadata"
                                        className="process-video"
                                        aria-label={t("about.process.video1.alt", language)}
                                    >
                                        <source src={video1} type="video/mp4" />
                                        {t("about.process.video.notSupported", language)}
                                    </video>
                                    <div className="video-caption">
                                        <h4>{t("about.process.video1.title", language)}</h4>
                                        <p>{t("about.process.video1.description", language)}</p>
                                    </div>
                                </div>
                                <div className="video-card">
                                    <video
                                        controls
                                        preload="metadata"
                                        className="process-video"
                                        aria-label={t("about.process.video2.alt", language)}
                                    >
                                        <source src={video2} type="video/mp4" />
                                        {t("about.process.video.notSupported", language)}
                                    </video>
                                    <div className="video-caption">
                                        <h4>{t("about.process.video2.title", language)}</h4>
                                        <p>{t("about.process.video2.description", language)}</p>
                                    </div>
                                </div>
                                <div className="video-card">
                                    <video
                                        controls
                                        preload="metadata"
                                        className="process-video"
                                        aria-label={t("about.process.video3.alt", language)}
                                    >
                                        <source src={video3} type="video/mp4" />
                                        {t("about.process.video.notSupported", language)}
                                    </video>
                                    <div className="video-caption">
                                        <h4>{t("about.process.video3.title", language)}</h4>
                                        <p>{t("about.process.video3.description", language)}</p>
                                    </div>
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

            {/* Educational Institutes */}
            <section className="about-section about-certifications" data-scroll-animate id="institutes">
                <div className="container">
                    <div className="text-center">
                        <div className="section-header">
                            <h2 className="section-title">{t("about.institutes.title", language)}</h2>
                            <div className="section-divider center"></div>
                            <p className="section-subtitle">{t("about.institutes.subtitle", language)}</p>
                        </div>
                    </div>

                    <div className="cert-grid">
                        {institutes.map((institute, i) => (
                            <div
                                key={i}
                                className="cert-thumb"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            >
                                <div className="cert-image-wrap">
                                    <img src={institute.image as string} alt={institute.title} className="cert-image" loading="lazy" />
                                </div>
                                <div className="cert-thumb-caption">{institute.title}</div>
                            </div>
                        ))}
                    </div>
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
            {/* <section className="about-cta" data-scroll-animate id="cta">
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
            </section> */}
        </div>
    );
}