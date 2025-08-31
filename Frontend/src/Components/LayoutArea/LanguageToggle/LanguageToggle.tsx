import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import { Button } from "../../UI/Button/Button";
import "./LanguageToggle.css";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleHebrewClick = () => {
    console.log('Hebrew button clicked, current language:', language);
    setLanguage('he');
  };

  const handleEnglishClick = () => {
    console.log('English button clicked, current language:', language);
    setLanguage('en');
  };

  return (
    <div className="language-toggle-container" data-testid="language-toggle">
      <Button
        onClick={handleHebrewClick}
        className={`lang-btn ${language === 'he' ? 'active' : ''}`}
        data-testid="language-button-he"
      >
        {t('nav.language.he', language)}
      </Button>
      <Button
        onClick={handleEnglishClick}
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        data-testid="language-button-en"
      >
        {t('nav.language.en', language)}
      </Button>
    </div>
  );
}