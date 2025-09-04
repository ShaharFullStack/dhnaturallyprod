import React, { JSX, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './Carousel.css';

// Import testimonial images from the index file
import { testimonials } from '../../../../Assets/Images/Testimonials';
import { useLanguage } from '../../../../Contexts/language-context';
import { t } from '../../../../lib/i18b';

export default function Carousel(): JSX.Element {
    const { language } = useLanguage();
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
    const [touchStartX, setTouchStartX] = React.useState(0);
    const [touchEndX, setTouchEndX] = React.useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => 
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    }, []);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [nextSlide, isAutoPlaying]);

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        e.preventDefault(); // Prevent default touch behavior
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        e.preventDefault(); // Prevent default touch behavior
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        
        const distance = touchStartX - touchEndX;
        const isLeftSwipe = distance > 50; // Reduced threshold for better response
        const isRightSwipe = distance < -50; // Reduced threshold for better response

        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
        
        setTouchStartX(0);
        setTouchEndX(0);
    };

    const pauseAutoPlay = () => setIsAutoPlaying(false);
    const resumeAutoPlay = () => setIsAutoPlaying(true);

    return (
        <div className="testimonials-carousel">
            <div className="carousel-header">
                <h2 className="carousel-title">
                    {t('home.testimonials.title', language)}
                </h2>
                <p className="carousel-subtitle">
                    {t('home.testimonials.subtitle', language)}
                </p>
            </div>

            <div 
                className="carousel-container"
                onMouseEnter={pauseAutoPlay}
                onMouseLeave={resumeAutoPlay}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <button 
                    className="carousel-nav carousel-nav--prev" 
                    onClick={prevSlide}
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="carousel-track">
                    <div className="carousel-slides">
                        {testimonials.map((image, index) => {
                            const isActive = index === currentIndex;
                            const isPrev = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
                            const isNext = index === (currentIndex + 1) % testimonials.length;
                            const isPrev2 = index === (currentIndex - 2 + testimonials.length) % testimonials.length;
                            const isNext2 = index === (currentIndex + 2) % testimonials.length;
                            
                            let className = 'carousel-slide';
                            if (isActive) className += ' active';
                            else if (isPrev) className += ' prev';
                            else if (isNext) className += ' next';
                            else if (isPrev2) className += ' prev-2';
                            else if (isNext2) className += ' next-2';
                            else className += ' hidden';

                            return (
                                <div 
                                    key={index}
                                    className={className}
                                >
                                    <div className="carousel-card">
                                        <div className="carousel-image">
                                            <img 
                                                src={image} 
                                                alt={`${language === 'he' ? 'עדות' : 'Testimonial'} ${index + 1}`}
                                                onError={(e) => {
                                                    const target = e.currentTarget;
                                                    target.style.backgroundColor = 'var(--dh-sage)';
                                                    target.style.opacity = '0.8';
                                                    target.alt = language === 'he' ? 'שגיאה בטעינת התמונה' : 'Image load error';
                                                }}
                                            />
                                        </div>
                                        <div className="carousel-overlay">
                                            <Quote className="carousel-quote" size={20} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button 
                    className="carousel-nav carousel-nav--next" 
                    onClick={nextSlide}
                    aria-label="Next testimonial"
                >
                    <ChevronRight size={24} />
                </button>

            </div>
        </div>
    );
}