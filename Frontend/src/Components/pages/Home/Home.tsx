import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Globe,
  Heart,
  Mail,
  Phone,
  Shield,
  Users
} from 'lucide-react';
import { JSX, useEffect } from "react";
import { Link } from 'react-router-dom';
import celandineImage from '../../../Assets/Images/etching-celandine.png';
import wormwoodImage from '../../../Assets/Images/etching-wormwood.png';
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import { AnimatedLogo } from "../../Speacials/AnimatedLogo/AnimatedLogo";
import { Button } from "../../UI/Button/Button";
import "./Home.css";

export function Home(): JSX.Element {

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

  // Enhanced scroll-based leaf bending with smoother transitions
  useEffect(() => {
    const homeElement = document.querySelector('.Home');
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          
          // Calculate scroll percentage with better precision
          const scrollPercent = Math.min(scrollY / (windowHeight * 1.5), 1);
          
          // More granular scroll states for smoother leaf bending
          let scrollState = '0';
          if (scrollPercent < 0.1) {
            scrollState = '0';
          } else if (scrollPercent < 0.3) {
            scrollState = 'small';
          } else if (scrollPercent < 0.6) {
            scrollState = 'medium';
          } else {
            scrollState = 'large';
          }
          
          homeElement?.setAttribute('data-scroll', scrollState);
          
          // Debug: log scroll state changes
          console.log('Scroll percent:', scrollPercent.toFixed(2), 'State:', scrollState);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const expertiseFeatures = [
    {
      icon: Award,
      title: language === 'he' ? 'מומחיות מוכחת בנטורופתיה' : 'Proven Naturopathy Expertise',
      description: language === 'he'
        ? 'למעלה מ-15 שנות ניסיון ברפואה טבעית ופיתוח תכשירים הומיאופתיים מתקדמים'
        : 'Over 15 years of experience in natural medicine and advanced homeopathic remedy development',
    },
    {
      icon: BookOpen,
      title: language === 'he' ? 'מבוסס מחקר מדעי' : 'Science-Based Research',
      description: language === 'he'
        ? 'כל תכשיר מפותח על בסיס מחקרים קליניים ועקרונות הרפואה ההומיאופתית המודרנית'
        : 'Every remedy developed based on clinical research and modern homeopathic medicine principles',
    },
    {
      icon: Users,
      title: language === 'he' ? 'אלפי מטופלים מרוצים' : 'Thousands of Satisfied Patients',
      description: language === 'he'
        ? 'רשת של מטפלים מקצועיים ואלפי מטופלים שחוו שיפור משמעותי בבריאותם'
        : 'Network of professional practitioners and thousands of patients who experienced significant health improvements',
    },
    {
      icon: Globe,
      title: language === 'he' ? 'תקנים בינלאומיים' : 'International Standards',
      description: language === 'he'
        ? 'תכשירים עומדים בתקני איכות בינלאומיים ומיוצרים במעבדות מוסמכות'
        : 'Remedies meet international quality standards and are manufactured in certified laboratories',
    },
  ];

  const trustIndicators = [
    {
      icon: Shield,
      title: language === 'he' ? 'בטיחות מוכחת' : 'Proven Safety',
      description: language === 'he'
        ? 'תכשירים טבעיים ללא תופעות לוואי, בדוקים קלינית ובטוחים לשימוש יומיומי'
        : 'Natural remedies without side effects, clinically tested and safe for daily use',
    },
    {
      icon: Clock,
      title: language === 'he' ? 'תוצאות מהירות' : 'Fast Results',
      description: language === 'he'
        ? 'רוב המטופלים מדווחים על שיפור ראשוני תוך 7-14 ימים מתחילת הטיפול'
        : 'Most patients report initial improvement within 7-14 days of starting treatment',
    },
    {
      icon: Heart,
      title: language === 'he' ? 'טיפול הוליסטי' : 'Holistic Treatment',
      description: language === 'he'
        ? 'גישה מקיפה לבריאות הגוף והנפש, לא רק טיפול בתסמינים אלא באסיבת השורש'
        : 'Comprehensive approach to body and mind health, treating root causes not just symptoms',
    },
  ];

  return (
    <div className="Home">
      {/* Floating Leaves */}
      <div className="floating-leaves">
        <img src={wormwoodImage} alt="wormwood" className="floating-leaf leaf-1" />
        <img src={celandineImage} alt="celandine" className="floating-leaf leaf-2" />
        <img src={wormwoodImage} alt="wormwood" className="floating-leaf leaf-3" />
        <img src={celandineImage} alt="celandine" className="floating-leaf leaf-4" />
      </div>

      {/* Clean Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-logo-container" data-scroll-animate>
              <AnimatedLogo
                variant="hero"
                className="hero-logo"
              />
            </div>

            <h1 className="hero-title" data-testid="hero-title" data-scroll-animate>
              <span className="hero-title-text">
                {t('home.hero.title', language)}
              </span>
            </h1>
            <p className="hero-subtitle" data-testid="hero-description" data-scroll-animate>
              {t('home.hero.subtitle', language)}
            </p>

            <div className="hero-cta-container" data-scroll-animate>
              <Link to="/store">
                <Button
                  className="hero-cta-primary"
                  data-testid="hero-cta-products"
                >
                  {t('home.hero.cta.products', language)}
                  <ArrowRight size={18} className="cta-icon" />
                </Button>
              </Link>
              <Button
                className="hero-cta-secondary"
                data-testid="hero-cta-consultation"
              >
                <Calendar size={18} className="cta-icon" />
                {language === 'he' ? 'ייעוץ מקצועי חינם' : 'Free Professional Consultation'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise & Authority Section */}
      <section className="features-section" data-testid="expertise-section" data-scroll-animate>
        <div className="hero-container">
          <div className="section-header">
            <h2 className="section-title">
              {language === 'he' ? ' DHnaturally מובילה בטיפול טבעי' : 'Why DHnaturally is Considered the Leading Authority in Natural Treatment?'}
            </h2>
            <p className="section-description">
              {language === 'he'
                ? 'עשרות שנות מחקר, פיתוח ולמידה בתחום הנטורופתיה וההומיאופתיה הביאו אותנו למעמד של מומחים מובילים בישראל ובעולם'
                : 'Decades of research, development and learning in naturopathy and homeopathy have brought us to the status of leading experts in Israel and worldwide'
              }
            </p>
          </div>
        
          <div className="features-grid">
            {expertiseFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="feature-card"
                  data-testid={`expertise-${index}`}
                >
                  <div className="feature-icon">
                    <IconComponent className="icon" />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="trust-section" data-testid="trust-section" data-scroll-animate>
        <div className="hero-container">
          <div className="section-header">
            <h2 className="section-title">
              {language === 'he' ? 'המחויבות שלנו אליכם' : 'Our Commitment to You'}
            </h2>
            <p className="section-description">
              {language === 'he'
                ? 'אנו מבינים שבריאותכם היא הדבר הכי חשוב. לכן, כל תכשיר עובר בקרת איכות מחמירה ונבחן קלינית לבטיחות ויעילות'
                : 'We understand your health is the most important thing. Therefore, every remedy undergoes strict quality control and is clinically tested for safety and efficacy'
              }
            </p>
          </div>

          <div className="features-grid">
            {trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              return (
                <div
                  key={index}
                  className="feature-card"
                  data-testid={`trust-${index}`}
                >
                  <div className="feature-icon">
                    <IconComponent className="icon" />
                  </div>
                  <h3 className="feature-title">{indicator.title}</h3>
                  <p className="feature-description">{indicator.description}</p>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="trust-cta" data-scroll-animate>
            <h3 className="trust-cta-title">
              {language === 'he' ? 'הזמינו עכשיו שיחת ייעוץ חינם עם נטורופתית מוסמכת' : 'Book Your Free Consultation with a Certified Naturopath Now'}
            </h3>
            <div className="trust-cta-buttons">
              <Button className="trust-cta-primary">
                <Phone size={16} className="cta-icon" />
                {language === 'he' ? 'התקשרו עכשיו' : 'Call Now'}
              </Button>
              <Button className="trust-cta-secondary">
                <Mail size={16} className="cta-icon" />
                {language === 'he' ? 'שלחו הודעה' : 'Send Message'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Approach */}
      <section className="about-section" data-scroll-animate id="approach">
        <div className="container">
          <div className="section-inner">
            <div className="section-header">
              <h2 className="section-title text-center">{t("about.work.title", language)}</h2>
              <div className="section-divider center"></div>
              <p className="section-subtitle text-center">{t("about.work.subtitle", language)}</p>
            </div>

            <div className="cards-grid">
              <div className="approach-card" style={{ animationDelay: '0.1s' }}>
                <div className="card-number">01</div>
                <h3 className="card-title">{t("about.work.cards.assessment.title", language)}</h3>
                <p className="card-desc">{t("about.work.cards.assessment.desc", language)}</p>
              </div>

              <div className="approach-card" style={{ animationDelay: '0.2s' }}>
                <div className="card-number">02</div>
                <h3 className="card-title">{t("about.work.cards.personalized.title", language)}</h3>
                <p className="card-desc">{t("about.work.cards.personalized.desc", language)}</p>
              </div>

              <div className="approach-card" style={{ animationDelay: '0.3s' }}>
                <div className="card-number">03</div>
                <h3 className="card-title">{t("about.work.cards.support.title", language)}</h3>
                <p className="card-desc">{t("about.work.cards.support.desc", language)}</p>
              </div>

              <div className="approach-card" style={{ animationDelay: '0.4s' }}>
                <div className="card-number">04</div>
                <h3 className="card-title">{t("about.work.cards.quality.title", language)}</h3>
                <p className="card-desc">{t("about.work.cards.quality.desc", language)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}
