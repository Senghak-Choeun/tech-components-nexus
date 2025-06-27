
import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { Button } from '@/components/ui/button';
import { Grid3X3, List } from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (product: any) => void;
  searchQuery: string;
}

const mockProducts = [
  {
    id: '1',
    name: 'AMD Ryzen 9 7950X',
    category: 'processors',
    price: 699.99,
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: 124,
    specs: ['16 Cores, 32 Threads', '4.5GHz Base Clock', 'AM5 Socket'],
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'NVIDIA GeForce RTX 4090',
    category: 'graphics-cards',
    price: 1599.99,
    image: '/placeholder.svg',
    rating: 4.9,
    reviews: 89,
    specs: ['24GB GDDR6X', '2.5GHz Boost Clock', 'Ray Tracing'],
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'ASUS ROG Strix X670E-E',
    category: 'motherboards',
    price: 449.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 67,
    specs: ['AM5 Socket', 'DDR5 Support', 'WiFi 6E'],
    inStock: true,
    featured: false
  },
  {
    id: '4',
    name: 'Corsair Vengeance DDR5-6000',
    category: 'memory',
    price: 329.99,
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: 203,
    specs: ['32GB Kit (2x16GB)', '6000MHz', 'RGB Lighting'],
    inStock: true,
    featured: false
  },
  {
    id: '5',
    name: 'Samsung 980 PRO 2TB',
    category: 'storage',
    price: 199.99,
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: 445,
    specs: ['NVMe SSD', '7000MB/s Read', 'PCIe 4.0'],
    inStock: true,
    featured: true
  },
  {
    id: '6',
    name: 'Corsair RM850x',
    category: 'power-supplies',
    price: 149.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 156,
    specs: ['850W', '80+ Gold', 'Fully Modular'],
    inStock: false,
    featured: false
  }
];

export const ProductCatalog = ({ onAddToCart, searchQuery }: ProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    let filtered = mockProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default: // featured
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedCategory === 'all' ? 'All Components' : selectedCategory.replace('-', ' ').toUpperCase()}
                </h2>
                <p className="text-slate-400">{filteredProducts.length} products found</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">No products found matching your criteria.</p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSortBy('featured');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
