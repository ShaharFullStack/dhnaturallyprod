import { ArrowRight, Minus, PackageCheck, Plus, ShieldCheck, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../../Contexts/language-context';
import { useCart } from '../../../hooks/use-cart';
import { t } from '../../../lib/i18b';
import { Button } from '../../UI/Button/Button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from '../../UI/Sheet/Sheet';
import './ShoppingCart.css';

interface ShoppingCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShoppingCartSidebar({ isOpen, onClose }: ShoppingCartSidebarProps) {
  const { cartItems, totalPrice, updateQuantity, removeItem, clearCart, isLoading, totalItems } = useCart();
  const { language } = useLanguage();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  // Set up animations after the cart opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the drawer is visible first
      setTimeout(() => setAnimateItems(true), 100);
    } else {
      setAnimateItems(false);
    }
  }, [isOpen]);

  // Free shipping threshold
  const FREE_SHIPPING_THRESHOLD = 150;
  const isEligibleForFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isEligibleForFreeShipping ? 0 : 25;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - totalPrice;
  
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity({ id: itemId, quantity: newQuantity });
  };

  const handleRemoveItem = (itemId: string) => {
    setRemovingItemId(itemId);
    
    // Delay actual removal to allow animation to complete
    setTimeout(() => {
      removeItem(itemId);
      setRemovingItemId(null);
    }, 300);
  };
  
  const handleClearCart = () => {
    setShowConfirmClear(true);
  };
  
  const confirmClearCart = () => {
    clearCart();
    setShowConfirmClear(false);
  };
  
  const cancelClearCart = () => {
    setShowConfirmClear(false);
  };

  const itemIsRemoving = (itemId: string) => removingItemId === itemId;

  // Helper function for directional elements based on language
  // Will be used in future updates

  if (isLoading) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={language === 'he' ? 'left' : 'right'} className="w-[400px] sm:w-[540px] shopping-cart">
          <SheetHeader className="cart-header">
            <SheetTitle data-testid="cart-title" className="cart-title">{t('cart.title', language)}</SheetTitle>
            <SheetClose onClose={onClose} className="absolute top-4 right-4 cart-close-btn" />
          </SheetHeader>
          <div className="cart-loading">
            <div className="loading-spinner"></div>
            <p data-testid="cart-loading" className="text-dh-navy font-medium">{t('common.loading', language)}</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side={language === 'he' ? 'left' : 'right'} className="w-[400px] sm:w-[540px] shopping-cart">
        <SheetHeader className="cart-header">
          <div className="cart-header-content">
            <ShoppingBag className="cart-icon" />
            <SheetTitle data-testid="cart-title" className="cart-title">{t('cart.title', language)}</SheetTitle>
            <span className="cart-item-count">{totalItems}</span>
          </div>
          <SheetClose onClose={onClose} className="absolute top-4 right-4 cart-close-btn">
            <X className="h-5 w-5" />
          </SheetClose>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex-1 empty-cart">
              <div className="empty-cart-icon">
                <ShoppingBag size={36} />
              </div>
              <p className="empty-cart-text" data-testid="cart-empty">
                {t('cart.empty', language)}
              </p>
              <Button 
                onClick={onClose}
                className="continue-shopping-btn"
              >
                {t('cart.continue', language)}
              </Button>
            </div>
          ) : (
            <>
              {/* Free shipping progress bar */}
              <div className="shipping-progress-container">
                {isEligibleForFreeShipping ? (
                  <div className="free-shipping-badge">
                    <PackageCheck className="h-4 w-4 mr-1" />
                    {t('cart.freeShipping', language)}
                  </div>
                ) : (
                  <>
                    <div className="shipping-progress-text">
                      {t('common.currency', language)}{amountToFreeShipping.toFixed(2)} {t('cart.freeShipping', language)}
                    </div>
                    <div className="shipping-progress-bar">
                      <div 
                        className="shipping-progress-fill" 
                        style={{ width: `${(totalPrice / FREE_SHIPPING_THRESHOLD) * 100}%` }}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className={`flex-1 overflow-y-auto py-4 dh-scroll cart-items-container ${animateItems ? 'animate-items' : ''}`}>
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const productName = item.product.name;
                    const itemTotal = item.product.price * item.quantity;
                    
                    return (
                      <div 
                        key={item.id} 
                        className={`cart-item flex items-center space-x-4 rtl:space-x-reverse ${itemIsRemoving(item.id) ? 'removing' : ''}`}
                        data-testid={`cart-item-${item.id}`}
                      >
                        <div className="cart-item-image-container">
                          <img
                            src={item.product.imageUrl || '/images/products/default.jpg'}
                            alt={productName}
                            className="cart-item-image"
                            data-testid={`cart-item-image-${item.id}`}
                          />
                        </div>
                        
                        <div className="cart-item-details">
                          <h4 
                            className="cart-item-name"
                            data-testid={`cart-item-name-${item.id}`}
                          >
                            {productName}
                          </h4>
                          <div className="cart-item-price-container">
                            <p 
                              className="cart-item-price"
                              data-testid={`cart-item-price-${item.id}`}
                            >
                              {t('common.currency', language)}{item.product.price}
                            </p>
                            
                            {item.quantity > 1 && (
                              <p className="cart-item-total">
                                {t('common.currency', language)}{itemTotal.toFixed(2)}
                              </p>
                            )}
                          </div>
                          
                          <div className="cart-item-controls">
                            <div className="quantity-controls">
                              <Button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="quantity-btn"
                                data-testid={`decrease-quantity-${item.id}`}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              
                              <span 
                                className="quantity-display"
                                data-testid={`cart-item-quantity-${item.id}`}
                              >
                                {item.quantity}
                              </span>
                              
                              <Button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="quantity-btn"
                                data-testid={`increase-quantity-${item.id}`}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Button
                              onClick={() => handleRemoveItem(item.id)}
                              className="remove-btn"
                              data-testid={`remove-item-${item.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="cart-summary">
                <div className="cart-summary-rows">
                  <div className="cart-summary-row">
                    <span className="summary-label">{t('checkout.subtotal', language)}</span>
                    <span className="summary-value">{t('common.currency', language)}{totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="cart-summary-row">
                    <span className="summary-label">{t('cart.shipping', language)}</span>
                    <span className="summary-value">
                      {isEligibleForFreeShipping 
                        ? <span className="free-shipping">{t('cart.freeShipping', language)}</span>
                        : `${t('common.currency', language)}${shippingCost.toFixed(2)}`
                      }
                    </span>
                  </div>
                  
                  <div className="cart-total">
                    <span data-testid="cart-total-label">{t('cart.total', language)}</span>
                    <span data-testid="cart-total-price" className="cart-total-amount">
                      {t('common.currency', language)}{(totalPrice + (isEligibleForFreeShipping ? 0 : shippingCost)).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="secure-checkout-badge">
                  <ShieldCheck className="secure-icon" />
                  <span>{language === 'he' ? 'תשלום מאובטח' : 'Secure Checkout'}</span>
                </div>
                
                {showConfirmClear ? (
                  <div className="confirm-clear">
                    <p className="confirm-message">{language === 'he' ? 'האם אתה בטוח שברצונך לנקות את העגלה?' : 'Are you sure you want to clear your cart?'}</p>
                    <div className="confirm-actions">
                      <Button 
                        className="confirm-yes"
                        onClick={confirmClearCart}
                      >
                        {language === 'he' ? 'כן, נקה עגלה' : 'Yes, Clear Cart'}
                      </Button>
                      <Button 
                        className="confirm-no"
                        onClick={cancelClearCart}
                      >
                        {language === 'he' ? 'לא, שמור פריטים' : 'No, Keep Items'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="cart-actions">
                    <Button 
                      className="checkout-btn"
                      data-testid="checkout-button"
                    >
                      {t('cart.checkout', language)}
                      <ArrowRight className={`checkout-arrow ${language === 'he' ? 'flip-arrow' : ''}`} />
                    </Button>
                    
                    <div className="secondary-actions">
                      <Button 
                        className="continue-btn"
                        onClick={onClose}
                      >
                        {t('cart.continue', language)}
                      </Button>
                      
                      <Button 
                        className="clear-cart-btn"
                        onClick={handleClearCart}
                        data-testid="clear-cart-button"
                      >
                        {language === 'he' ? 'נקה עגלה' : 'Clear Cart'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { ShoppingCartSidebar as ShoppingCart };
