import { JSX, useState } from "react";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import "./Contact.css";

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
            icon: "📧",
            title: t("contact.info.email", language),
            details: "info@dhnaturally.com",
            description: "Professional consultation and product inquiries"
        },
        {
            icon: "📱",
            title: t("contact.info.whatsapp", language),
            details: "+972-50-123-4567",
            description: t("contact.info.whatsapp.note", language)
        },
        {
            icon: "🕒",
            title: t("contact.hours.title", language),
            details: "Sun-Thu: 9:00-18:00, Fri: 9:00-14:00",
            description: t("contact.hours.emergency", language)
        }
    ];

    const consultationServices = [
        {
            icon: "👤",
            title: t("contact.consultation.individual", language),
            description: "One-on-one consultation for personalized treatment planning"
        },
        {
            icon: "🏷️",
            title: t("contact.consultation.product", language),
            description: "Expert guidance in selecting the right natural remedies"
        },
        {
            icon: "📋",
            title: t("contact.consultation.followup", language),
            description: "Ongoing support and treatment monitoring"
        }
    ];

    return (
        <div className="Contact min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-dh-navy to-dh-ocean text-white">
                <div className="container mx-auto px-4 py-8 lg:py-12">
                    <div className="text-center">
                        <h1 className="text-2xl lg:text-4xl font-bold mb-4">
                            {t("contact.title", language)}
                        </h1>
                        <p className="text-dh-pale text-sm lg:text-lg max-w-3xl mx-auto">
                            {t("contact.description", language)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
                            {t("contact.form.title", language)}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t("contact.form.firstName", language)} *
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dh-ocean focus:border-transparent text-sm lg:text-base"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t("contact.form.lastName", language)} *
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dh-ocean focus:border-transparent text-sm lg:text-base"
                                    />
                                </div>
                            </div>

                            {/* Contact Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t("contact.form.email", language)} *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dh-ocean focus:border-transparent text-sm lg:text-base"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t("contact.form.phone", language)}
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dh-ocean focus:border-transparent text-sm lg:text-base"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t("contact.form.subject", language)} *
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dh-ocean focus:border-transparent text-sm lg:text-base"
                                >
                                    <option value="">Select a subject</option>
                                    <option value="consultation">Professional Consultation</option>
                                    <option value="product">Product Information</option>
                                    <option value="order">Order Support</option>
                                    <option value="general">General Inquiry</option>
                                </select>
                            </div>

                            {/* Health Concern */}
                            <div>
                                <label htmlFor="healthConcern" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t("contact.form.healthConcern", language)}
                                </label>
                                <select
                                    id="healthConcern"
                                    name="healthConcern"
                                    value={formData.healthConcern}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dh-ocean focus:border-transparent text-sm lg:text-base"
                                >
                                    <option value="">Select primary health concern</option>
                                    <option value="digestive">Digestive Health</option>
                                    <option value="immune">Immune Support</option>
                                    <option value="stress">Stress & Anxiety</option>
                                    <option value="sleep">Sleep Issues</option>
                                    <option value="pain">Pain Management</option>
                                    <option value="hormonal">Hormonal Balance</option>
                                    <option value="skin">Skin Conditions</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Experience */}
                            <div>
                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t("contact.form.experience", language)}
                                </label>
                                <select
                                    id="experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dh-ocean focus:border-transparent text-sm lg:text-base"
                                >
                                    <option value="">Select your experience level</option>
                                    <option value="none">No previous experience</option>
                                    <option value="some">Some experience</option>
                                    <option value="experienced">Experienced user</option>
                                    <option value="professional">Healthcare professional</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    {t("contact.form.message", language)} *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dh-ocean focus:border-transparent text-sm lg:text-base resize-vertical"
                                    placeholder="Please describe your health needs and how we can help you..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-dh-ocean hover:bg-dh-navy disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-colors text-sm lg:text-base"
                            >
                                {isSubmitting ? "Sending..." : t("contact.form.submit", language)}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {/* Contact Details */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                {t("contact.info.title", language)}
                            </h3>
                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="text-2xl">{info.icon}</div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">
                                                {info.title}
                                            </h4>
                                            <p className="text-dh-ocean font-medium mb-1">
                                                {info.details}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {info.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Consultation Services */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                {t("contact.consultation.title", language)}
                            </h3>
                            <div className="space-y-4">
                                {consultationServices.map((service, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="text-2xl">{service.icon}</div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">
                                                {service.title}
                                            </h4>
                                            <p className="text-gray-600 text-sm">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* WhatsApp CTA */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <div className="text-center">
                                <div className="text-4xl mb-3">📱</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Quick WhatsApp Consultation
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Get immediate answers to your questions
                                </p>
                                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    {t("whatsapp.cta", language)}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}