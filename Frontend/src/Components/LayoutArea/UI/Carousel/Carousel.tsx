import React, { JSX } from 'react';
import './Carousel.css';

// Import testimonial images from the index file
import { testimonials } from '../../../../Assets/Images/Testimonials';

export default function Carousel(): JSX.Element {

    
    console.log('Testimonial images:', testimonials);
    
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="carousel">
            <div className="carousel__wrap">
                <div className="carousel__inner">
                    <button className="carousel__btn carousel__btn--prev" onClick={prevSlide}>
                        <i className="carousel__btn-arrow carousel__btn-arrow--left" />
                    </button>
                    
                    <div className="carousel__container">
                        <div className="carousel__slide-list">
                            {testimonials.map((image, index) => (
                                <div 
                                    key={index}
                                    className={`carousel__slide-item ${index === currentIndex ? 'active' : ''}`}
                                    style={{
                                        transform: `translate(-50%, calc(-50% + ${(index - currentIndex) * 22}rem))`,
                                        opacity: index === currentIndex ? 1 : 0.3,
                                        zIndex: index === currentIndex ? 10 : 1,
                                        backgroundColor: index === currentIndex ? '#ffeb3b' : '#e0e0e0', // Debug colors
                                    }}
                                >
                                    <div className="carousel__slide-item-img-link">
                                        <img 
                                            src={image} 
                                            alt={`Testimonial ${index + 1}`}
                                            onError={(e) => {
                                                console.error('Image failed to load:', e.currentTarget.src);
                                                e.currentTarget.style.backgroundColor = '#f0f0f0';
                                                e.currentTarget.style.display = 'block';
                                                e.currentTarget.style.width = '100%';
                                                e.currentTarget.style.height = '100%';
                                            }}
                                            onLoad={() => console.log('Image loaded successfully:', image)}
                                            style={{
                                                minWidth: '100%',
                                                minHeight: '100%',
                                                backgroundColor: '#f9f9f9'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <button className="carousel__btn carousel__btn--next" onClick={nextSlide}>
                        <i className="carousel__btn-arrow carousel__btn-arrow--right" />
                    </button>
                    
                    <div className="carousel__dots">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
