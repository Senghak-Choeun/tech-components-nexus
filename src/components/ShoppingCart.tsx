
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const ShoppingCart = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }: ShoppingCartProps) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-slate-900 border-slate-700 text-white w-full sm:max-w-lg">
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
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {items.map((item) => (
                <Card key={item.id} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
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
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 border-slate-600"
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-white font-medium text-sm w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 border-slate-600"
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
                              className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
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
            <div className="border-t border-slate-700 pt-4 mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tax</span>
                  <span className="text-white">${(total * 0.08).toFixed(2)}</span>
                </div>
                <Separator className="bg-slate-700" />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-white">${(total * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3"
                size="lg"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Checkout
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
