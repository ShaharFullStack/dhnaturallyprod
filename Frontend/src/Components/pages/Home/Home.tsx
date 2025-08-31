import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Globe,
  Heart,
  Shield,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { JSX } from "react";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import { AnimatedLogo } from "../../Speacials/AnimatedLogo/AnimatedLogo";
import { Button } from "../../UI/Button/Button";
import "./Home.css";

export function Home(): JSX.Element {

  const { language } = useLanguage();

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
      {/* Clean Hero Section */}
      <section className="hero-section" data-testid="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-logo-container">
              <AnimatedLogo
                variant="hero"
                className="hero-logo"
              />
            </div>

            <h1 className="hero-title" data-testid="hero-title">
              <span className="hero-title-text">
                {t('home.hero.title', language)}
              </span>
            </h1>
            <p className="hero-subtitle" data-testid="hero-description">
              {t('home.hero.subtitle', language)}
            </p>

            <div className="hero-cta-container">
              <Link to="/store">
                <Button
                  className="hero-cta-primary"
                  data-testid="hero-cta-products"
                >
                  {t('home.hero.cta.products', language)}
                </Button>
              </Link>
              <Button
                className="hero-cta-secondary"
                data-testid="hero-cta-consultation"
              >
                {language === 'he' ? 'ייעוץ מקצועי חינם' : 'Free Professional Consultation'}
              </Button>
            </div>
          </div>
        </div>
  </section>

  {/* Expertise & Authority Section */}
      <section className="features-section" data-testid="expertise-section">
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
      <section className="trust-section" data-testid="trust-section">
        <div className="hero-container">
          <div className="section-header">
            <h2 className="section-title">
              {language === 'he' ? 'בטיחות ויעילות - המחויבות שלנו אליכם' : 'Safety & Efficacy - Our Commitment to You'}
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
        </div>
      </section>

      {/* Featured Products with Enhanced Messaging */}
      {/* <section className="py-20 bg-white" data-testid="featured-products-section">
        <div className="hero-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-dh-navy mb-6" data-testid="featured-title">
              {t('home.featured.title', language)}
            </h2>
            <p className="text-xl text-gray-600 mb-4" data-testid="featured-description">
              {t('home.featured.description', language)}
            </p>
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                {language === 'he' ? 'מבוסס מחקר קליני' : 'Clinically Researched'}
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                {language === 'he' ? 'ללא תופעות לוואי' : 'No Side Effects'}
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                {language === 'he' ? 'איכות מעבדתית' : 'Laboratory Quality'}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p data-testid="featured-loading">{t('common.loading', language)}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} featured />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/store">
              <Button 
                className="bg-dh-ocean text-white px-10 py-4 rounded-full font-semibold hover:bg-dh-navy transition-colors shadow-lg"
                data-testid="featured-cta"
              >
                {t('home.featured.cta', language)}
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              {language === 'he' ? '✨ משלוח חינם מעל ₪600 | אחריות החזר כספי לשביעות רצון מלאה' : '✨ Free shipping over ₪150 | Money-back satisfaction guarantee'}
            </p>
          </div>
        </div>
      </section> */}

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
                <Link to="/contact">
                  <Button
                    className="hero-cta-primary full-width"
                    data-testid="consultation-cta"
                  >
                    {language === 'he' ? 'התחל בייעוץ חינם' : 'Start Free Consultation'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        {/* Call to Action in testimonials */}
        <div className="text-center mt-16">
          <h3 className="section-subtitle">
            {language === 'he' ? 'התחילו את הדרך לבריאות טובה יותר.' : 'Begin your path to better health.'}
          </h3>
          <Link to="/contact">
            <Button
              className="testimonial-cta"
              data-testid="testimonials-consultation-cta"
            >
              {language === 'he' ? 'קבלו ייעוץ מקצועי חינם' : 'Get Free Professional Consultation'}
            </Button>
          </Link>
          <Link to="/store">
            <Button
              className="testimonial-cta-outline"
              data-testid="testimonials-shop-cta"
            >
              {language === 'he' ? 'התחילו את המסע לבריאות' : 'Start Your Health Journey'}
            </Button>
          </Link>
        </div>
      </section>
    </div>

  );
}
