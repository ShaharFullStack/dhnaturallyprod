import { JSX, useState } from "react";
import { Menu, X, ShoppingCart } from 'lucide-react';
import "./Header.css";
import { ShoppingCartSidebar } from './shopping-cart';
import { useCart } from '../../../hooks/use-cart';
import { useHapticFeedback } from '../../../hooks/use-haptic-feedback';
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../../Contexts/language-context";
import { LanguageToggle } from "./language-toggle";
import { t } from "../../../lib/i18b";
import { Button } from "../../UI/Button/Button";
import { Badge } from "../../UI/Badge/Badge";
import logoImage from "../../../Assets/Images/logo.png";

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
    buttonPress(); // Haptic feedback for menu toggle
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="bg-dh-pale/60 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 xl:py-0">
            {/* Logo */}
            <Link to="/" data-testid="logo-link">
              <div className="flex items-center rtl:space-between">
                  <img src={logoImage} alt="DHnaturally Logo" className="logo-image" />
                <span className="text-lg xl:text-xl header-title font-bold text-dh-ocean">DHnaturally</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-4 rtl:space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  data-testid={item.testId}
                  className={`
                    nav-link relative px-3 py-2 rounded-lg font-medium
                    transition-all duration-300 ease-out
                    hover:bg-dh-ocean/10 hover:backdrop-blur-sm
                    ${isActiveLink(item.path) 
                      ? 'active text-dh-ocean bg-dh-ocean/10' 
                      : 'text-dh-navy hover:text-dh-ocean'
                    }
                  `}
                >
                  {item.label}
                  {isActiveLink(item.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-dh-ocean rounded-full"></div>
                  )}
                </Link>
              ))}
              
              <LanguageToggle />
              
              {/* Cart Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  selection(); // Haptic feedback for cart open
                  setIsCartOpen(true);
                }}
                className="
                  relative text-dh-navy hover:text-dh-ocean
                  hover:bg-dh-ocean/10 rounded-lg
                  transition-all duration-300 ease-out
                "
                data-testid="cart-button"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button - Thumb-Friendly */}
            <div className="xl:hidden flex items-center space-x-2 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => {
                  selection(); // Haptic feedback for cart open
                  setIsCartOpen(true);
                }}
                className="
                  relative min-w-[48px] min-h-[48px] 
                  rounded-full p-3
                  hover:bg-dh-sage/20 active:scale-95
                  transition-all duration-200
                "
                data-testid="cart-button-mobile"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center p-0 text-sm font-bold"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={toggleMobileMenu}
                className="
                  min-w-[48px] min-h-[48px] 
                  rounded-full p-3
                  hover:bg-dh-sage/20 active:scale-95
                  transition-all duration-200
                "
                data-testid="mobile-menu-button"
              >
                {isMobileMenuOpen ? (
                  <X className="h-7 w-7 text-dh-navy" />
                ) : (
                  <Menu className="h-7 w-7 text-dh-navy" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation - Thumb-Friendly Design */}
          {isMobileMenuOpen && (
            <div className="xl:hidden pb-4 bg-white/95 backdrop-blur-md" data-testid="mobile-menu">
              <div className="space-y-1 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    data-testid={`${item.testId}-mobile`}
                    className={`
                       px-6 py-4 rounded-xl text-base xl:text-lg font-medium
                      min-h-[48px] flex items-center
                      transition-all duration-200
                      hover:bg-dh-sage/20 active:scale-95
                      nav-link ${isActiveLink(item.path) ? 'active bg-dh-sage/30 text-dh-ocean' : 'text-dh-navy'}
                    `}
                    onClick={() => {
                      selection(); // Haptic feedback for navigation
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-6 py-4 min-h-[48px] flex items-center">
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
