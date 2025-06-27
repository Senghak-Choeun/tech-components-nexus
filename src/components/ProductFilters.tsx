
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const categories = [
  { id: 'all', name: 'All Components', count: 156 },
  { id: 'processors', name: 'Processors', count: 24 },
  { id: 'graphics-cards', name: 'Graphics Cards', count: 18 },
  { id: 'motherboards', name: 'Motherboards', count: 32 },
  { id: 'memory', name: 'Memory (RAM)', count: 28 },
  { id: 'storage', name: 'Storage', count: 45 },
  { id: 'power-supplies', name: 'Power Supplies', count: 9 },
];

export const ProductFilters = ({ selectedCategory, onCategoryChange, sortBy, onSortChange }: ProductFiltersProps) => {
  return (
    <div className="space-y-6">
      {/* Sort */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className={`w-full justify-between text-left h-auto p-3 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <span>{category.name}</span>
              <Badge 
                variant="secondary" 
                className={`${
                  selectedCategory === category.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {category.count}
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center">
            🤖 AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-300 mb-3">
            Based on current trends and compatibility
          </p>
          <div className="space-y-2">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              RTX 4070 + Ryzen 7
            </Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              Budget Build: $800-1200
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              Gaming Focused
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
