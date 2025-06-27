
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, CheckCircle, Truck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ImprovedShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const ImprovedShoppingCart = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity 
}: ImprovedShoppingCartProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = total > 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      
      toast({
        title: "Order Successful!",
        description: `Your order of ${itemCount} items has been placed successfully.`,
      });

      // Reset checkout success after 3 seconds
      setTimeout(() => {
        setCheckoutSuccess(false);
        onClose();
      }, 3000);
    }, 2000);
  };

  if (checkoutSuccess) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="bg-slate-900 border-slate-700 text-white w-full sm:max-w-lg">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="text-center">
              <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-white mb-2">Order Successful!</h2>
              <p className="text-slate-300 mb-4">
                Thank you for your purchase! Your order has been confirmed.
              </p>
              <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Order Total:</span>
                  <span className="text-white font-semibold">${finalTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Items:</span>
                  <span className="text-white">{itemCount}</span>
                </div>
                <div className="flex items-center justify-center text-sm text-green-400 mt-3">
                  <Truck className="h-4 w-4 mr-2" />
                  <span>Free shipping on orders over $100</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                You will receive a confirmation email shortly.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-slate-900 border-slate-700 text-white w-full sm:max-w-lg overflow-hidden">
        <SheetHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-blue-400" />
            <SheetTitle className="text-white text-xl">
              Shopping Cart
              {itemCount > 0 && (
                <Badge className="ml-2 bg-blue-500">
                  {itemCount} item{itemCount !== 1 ? 's' : ''}
                </Badge>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ShoppingBag className="h-16 w-16 text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-400 mb-2">Your cart is empty</h3>
            <p className="text-slate-500 mb-4">Add some awesome tech components to get started!</p>
            <Button onClick={onClose} className="bg-gradient-to-r from-blue-500 to-cyan-500">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-120px)]">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
              {items.map((item) => (
                <Card key={item.id} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-3">
                    <div className="flex space-x-3">
                      {/* Product Image */}
                      <div className="w-12 h-12 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm mb-1 truncate">
                          {item.name}
                        </h4>
                        <p className="text-slate-400 text-xs mb-2">
                          ${item.price.toFixed(2)} each
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0 border-slate-600"
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-white font-medium text-sm w-6 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 w-6 p-0 border-slate-600"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-white font-semibold text-sm">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                              onClick={() => onRemove(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t border-slate-700 pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Shipping</span>
                  <span className={shipping === 0 ? "text-green-400" : "text-white"}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tax</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <Separator className="bg-slate-700" />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-white">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {total < 100 && (
                <div className="text-xs text-amber-400 text-center p-2 bg-amber-400/10 rounded">
                  Add ${(100 - total).toFixed(2)} more for free shipping!
                </div>
              )}

              <Button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3"
                size="lg"
              >
                {isCheckingOut ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Checkout ${finalTotal.toFixed(2)}
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-800"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
