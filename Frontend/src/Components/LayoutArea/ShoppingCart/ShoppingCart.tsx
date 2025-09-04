import { Minus, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '../../../Contexts/language-context';
import { useCart } from '../../../hooks/use-cart';
import { t } from '../../../lib/i18b';
import { Button } from '../../UI/Button/Button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../UI/Sheet/Sheet';
import './ShoppingCart.css';

interface ShoppingCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShoppingCartSidebar({ isOpen, onClose }: ShoppingCartSidebarProps) {
  const { cartItems, totalPrice, updateQuantity, removeItem, clearCart, isLoading } = useCart();
  const { language } = useLanguage();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity({ id: itemId, quantity: newQuantity });
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  if (isLoading) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={language === 'he' ? 'left' : 'right'} className="w-[400px] sm:w-[540px] shopping-cart">
          <SheetHeader className="cart-header">
            <SheetTitle data-testid="cart-title" className="cart-title">{t('cart.title', language)}</SheetTitle>
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
          <SheetTitle data-testid="cart-title" className="cart-title">{t('cart.title', language)}</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            <div className="flex-1 empty-cart">
              <div className="empty-cart-icon">
                🛒
              </div>
              <p className="empty-cart-text" data-testid="cart-empty">
                {t('cart.empty', language)}
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 dh-scroll">
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const productName = item.product.name;
                    
                    return (
                      <div 
                        key={item.id} 
                        className="cart-item flex items-center space-x-4 rtl:space-x-reverse"
                        data-testid={`cart-item-${item.id}`}
                      >
                        <img
                          src={item.product.imageUrl || '/images/products/default.jpg'}
                          alt={productName}
                          className="cart-item-image"
                          data-testid={`cart-item-image-${item.id}`}
                        />
                        
                        <div className="cart-item-details">
                          <h4 
                            className="cart-item-name"
                            data-testid={`cart-item-name-${item.id}`}
                          >
                            {productName}
                          </h4>
                          <p 
                            className="cart-item-price"
                            data-testid={`cart-item-price-${item.id}`}
                          >
                            {t('common.currency', language)}{item.product.price}
                          </p>
                        </div>
                        
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
                    );
                  })}
                </div>
              </div>
              
              <div className="cart-summary">
                <div className="cart-total">
                  <span data-testid="cart-total-label">{t('cart.total', language)}</span>
                  <span data-testid="cart-total-price" className="cart-total-amount">
                    {t('common.currency', language)}{totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <div className="cart-actions">
                  <Button 
                    className="checkout-btn"
                    data-testid="checkout-button"
                  >
                    {t('cart.checkout', language)}
                  </Button>
                  
                  <Button 
                    className="clear-cart-btn"
                    onClick={() => clearCart()}
                    data-testid="clear-cart-button"
                  >
                    {language === 'he' ? 'נקה עגלה' : 'Clear Cart'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { ShoppingCartSidebar as ShoppingCart };
