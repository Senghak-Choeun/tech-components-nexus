
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    specs: string[];
    inStock: boolean;
    featured: boolean;
  };
  onAddToCart: (product: any) => void;
  viewMode: 'grid' | 'list';
}

export const ProductCard = ({ product, onAddToCart, viewMode }: ProductCardProps) => {
  const handleAddToCart = () => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This item is currently unavailable.",
        variant: "destructive",
      });
      return;
    }
    
    onAddToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (viewMode === 'list') {
    return (
      <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Image */}
            <div className="md:w-48 flex-shrink-0">
              <div className="aspect-square bg-slate-700/50 rounded-lg overflow-hidden relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.featured && (
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-cyan-500">
                    Featured
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <ul className="space-y-1 mb-4">
                {product.specs.map((spec, index) => (
                  <li key={index} className="text-sm text-slate-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">
                  ${product.price.toFixed(2)}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300 group">
      <CardContent className="p-4">
        {/* Product Image */}
        <div className="aspect-square bg-slate-700/50 rounded-lg overflow-hidden mb-4 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-cyan-500">
              Featured
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-slate-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Info */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-slate-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">({product.reviews})</span>
        </div>

        <ul className="space-y-1 mb-4">
          {product.specs.slice(0, 2).map((spec, index) => (
            <li key={index} className="text-xs text-slate-300 flex items-center">
              <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 flex-shrink-0" />
              {spec}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-xl font-bold text-white">
          ${product.price.toFixed(2)}
        </div>
        <Button
          size="sm"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};
