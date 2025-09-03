import { MessageCircle, X } from "lucide-react";
import { JSX, useState } from "react";
import { useLanguage } from "../../../Contexts/language-context";
import "./WhatsAppBubble.css";

interface WhatsAppBubbleProps {
    phoneNumber?: string;
}

export function WhatsAppBubble({ phoneNumber = "+972533353481" }: WhatsAppBubbleProps): JSX.Element {
    const { language } = useLanguage();
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent(
            language === 'he' 
                ? 'שלום, אני מעוניין/ת בייעוץ נטורופתי מ-DHnaturally'
                : 'Hello, I am interested in naturopathy consultation from DHnaturally'
        );
        
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${message}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="whatsapp-bubble-container">
            {/* Tooltip */}
            {isTooltipVisible && (
                <div className="whatsapp-tooltip">
                    <span className="tooltip-text">
                        {language === 'he' ? 'צ\'אט עם נטורופתית' : 'Chat with Naturopath'}
                    </span>
                    <button 
                        className="tooltip-close"
                        onClick={() => setIsTooltipVisible(false)}
                        aria-label="Close tooltip"
                    >
                        <X size={12} />
                    </button>
                </div>
            )}
            
            {/* WhatsApp Bubble */}
            <button
                className="whatsapp-bubble"
                onClick={handleWhatsAppClick}
                onMouseEnter={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
                aria-label={language === 'he' ? 'פתח צ\'אט וואטסאפ' : 'Open WhatsApp chat'}
                title={language === 'he' ? 'צ\'אט עם נטורופתית בוואטסאפ' : 'Chat with Naturopath on WhatsApp'}
            >
                <MessageCircle size={24} className="whatsapp-icon" />
                
                {/* Pulse animation rings */}
                <div className="pulse-ring pulse-ring-1"></div>
                <div className="pulse-ring pulse-ring-2"></div>
            </button>
        </div>
    );
}