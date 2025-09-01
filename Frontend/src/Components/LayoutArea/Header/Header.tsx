import { JSX, useState } from "react";
import { Menu, X, ShoppingCart } from 'lucide-react';
import "./Header.css";
import { useCart } from '../../../hooks/use-cart';
import { useHapticFeedback } from '../../../hooks/use-haptic-feedback';
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../../Contexts/language-context";
import { t } from "../../../lib/i18b";
import logoImage from "../../../Assets/Images/darkLogo.png";
import { LanguageToggle } from "../LanguageToggle/LanguageToggle";
import { ShoppingCartSidebar } from "../ShoppingCart/ShoppingCart";

export function Header(): JSX.Element {
    return (
        <Navigation />
    );
}

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();
  const { totalItems } = useCart();
  const { buttonPress, selection } = useHapticFeedback();

  const navItems = [
    { path: '/', label: t('nav.home', language), testId: 'nav-home' },
    { path: '/store', label: t('nav.store', language), testId: 'nav-store' },
    { path: '/articles', label: t('nav.articles', language), testId: 'nav-articles' },
    { path: '/about', label: t('nav.about', language), testId: 'nav-about' },
    { path: '/contact', label: t('nav.contact', language), testId: 'nav-contact' },
  ];

  const toggleMobileMenu = () => {
    buttonPress();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="header-nav">
        <div className="header-container">
          <div className="header-content">
            {/* Logo Section */}
            <Link to="/" data-testid="logo-link" className="logo-section">
              <img src={logoImage} alt="DHnaturally Logo" className="logo-image" />
              <div className="logo-text">
                <span className="brand-name">DHnaturally</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  data-testid={item.testId}
                  className={`nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Section - Language + Cart */}
            <div className="header-actions">
              {/* Desktop Language Toggle */}
              <div className="desktop-language">
                <LanguageToggle />
              </div>
              
              {/* Cart Button */}
              <button
                onClick={() => {
                  selection();
                  setIsCartOpen(true);
                }}
                className="cart-button"
                data-testid="cart-button"
              >
                <ShoppingCart className="cart-icon" />
                {totalItems > 0 && (
                  <span className="cart-badge">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-button"
                data-testid="mobile-menu-button"
              >
                {isMobileMenuOpen ? (
                  <X className="menu-icon" />
                ) : (
                  <Menu className="menu-icon" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="mobile-menu" data-testid="mobile-menu">
              <div className="mobile-nav-links">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    data-testid={`${item.testId}-mobile`}
                    className={`mobile-nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                    onClick={() => {
                      selection();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Language Toggle */}
                <div className="mobile-language">
                  <LanguageToggle />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <ShoppingCartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
