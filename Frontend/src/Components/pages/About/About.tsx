import { JSX } from "react";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import "./About.css";

export function About(): JSX.Element {
    const { language } = useLanguage();

    const certifications = [
        {
            title: t("about.certifications.naturopathy.title", language),
            description: t("about.certifications.naturopathy.description", language),
            image: "/images/certifications/naturopathy-cert.jpg"
        },
        {
            title: t("about.certifications.integrative.title", language),
            description: t("about.certifications.integrative.description", language),
            image: "/images/certifications/integrative-cert.jpg"
        },
        {
            title: t("about.certifications.homeopathy.title", language),
            description: t("about.certifications.homeopathy.description", language),
            image: "/images/certifications/homeopathy-cert.jpg"
        }
    ];

    const values = [
        {
            icon: "🛡️",
            title: t("about.values.prevention", language),
            description: "Focus on preventing illness through natural health maintenance"
        },
        {
            icon: "🔄",
            title: t("about.values.restoration", language),
            description: "Restoring natural balance and healing capacity"
        },
        {
            icon: "⚖️",
            title: t("about.values.balance", language),
            description: "Achieving harmony between mind, body, and spirit"
        },
        {
            icon: "🔬",
            title: t("about.values.evidence", language),
            description: "Combining traditional wisdom with modern research"
        },
        {
            icon: "✨",
            title: t("about.values.safety", language),
            description: "Ensuring purity and safety in all our remedies"
        },
        {
            icon: "👤",
            title: t("about.values.individualized", language),
            description: "Personalized treatment approaches for each individual"
        }
    ];

    const testimonials = [
        {
            name: "Dr. Sarah Cohen",
            role: "Integrative Medicine Physician",
            text: "DHnaturally provides the highest quality homeopathic remedies I've found. My patients consistently report excellent results.",
            rating: 5
        },
        {
            name: "Rachel Levi",
            role: "Patient",
            text: "After years of conventional treatments, the natural approach at DHnaturally finally helped me find lasting relief from chronic digestive issues.",
            rating: 5
        },
        {
            name: "Dr. Michael Rosen",
            role: "Naturopathic Doctor",
            text: "The expertise and quality of products from DHnaturally makes them my go-to recommendation for patients seeking natural solutions.",
            rating: 5
        }
    ];

    return (
        <div className="About min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-dh-navy to-dh-ocean text-white">
                <div className="container mx-auto px-4 py-12 lg:py-20">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                            {t("about.title", language)}
                        </h1>
                        <p className="text-dh-pale text-lg lg:text-xl leading-relaxed">
                            {t("about.subtitle", language)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8">
                            {t("about.story.title", language)}
                        </h2>
                        <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
                            <p className="text-base lg:text-lg mb-6">
                                DHnaturally was founded with a vision to bridge the gap between traditional healing wisdom 
                                and modern scientific understanding. Our journey began with a deep appreciation for the 
                                natural healing capabilities of the human body and a commitment to supporting this process 
                                through carefully selected, high-quality natural remedies.
                            </p>
                            <p className="text-base lg:text-lg mb-6">
                                With years of clinical experience and extensive training in homeopathy, naturopathy, and 
                                integrative medicine, we have helped thousands of individuals achieve optimal health through 
                                natural, gentle, and effective treatment approaches.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 lg:py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                            {t("about.mission.title", language)}
                        </h2>
                        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                            {t("about.mission.subtitle", language)}
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-12 lg:py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                            {t("about.certifications.title", language)}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            {t("about.certifications.subtitle", language)}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {certifications.map((cert, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-gray-100 rounded-lg aspect-square w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                                    {cert.image ? (
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-cover rounded-lg"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <span className="text-4xl text-gray-400">🏆</span>
                                    )}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    {cert.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {cert.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Treatment Approach */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8">
                            {t("about.work.title", language)}
                        </h2>
                        <p className="text-gray-600 text-center mb-12 text-base lg:text-lg">
                            {t("about.work.subtitle", language)}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Individual Assessment
                                </h3>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    Each person is unique, and so is their path to healing. We conduct thorough 
                                    assessments to understand your individual constitution, lifestyle, and health challenges.
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Personalized Treatment
                                </h3>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    Based on your individual needs, we create customized treatment plans using 
                                    the most appropriate natural remedies and therapeutic approaches.
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Ongoing Support
                                </h3>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    Healing is a journey, not a destination. We provide continuous guidance and 
                                    adjustments to ensure you achieve and maintain optimal health.
                                </p>
                            </div>
                            
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Quality Assurance
                                </h3>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    All our remedies undergo rigorous quality control and are sourced from 
                                    reputable suppliers who share our commitment to purity and potency.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-12 lg:py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
                        {t("home.testimonials.title", language)}
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-6">
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i}>⭐</span>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4 text-sm lg:text-base italic">
                                    "{testimonial.text}"
                                </p>
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 lg:py-16 bg-gradient-to-r from-dh-navy to-dh-ocean text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                        Ready to Start Your Natural Healing Journey?
                    </h2>
                    <p className="text-dh-pale mb-8 text-base lg:text-lg max-w-2xl mx-auto">
                        Get personalized guidance from our natural medicine experts and discover 
                        the right remedies for your unique health needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-dh-light hover:bg-white text-dh-navy px-6 py-3 rounded-lg font-medium transition-colors">
                            {t("cta.getConsultation", language)}
                        </button>
                        <button className="border-2 border-dh-light hover:bg-dh-light hover:text-dh-navy text-dh-light px-6 py-3 rounded-lg font-medium transition-colors">
                            {t("cta.shopNow", language)}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}