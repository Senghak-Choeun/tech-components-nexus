
import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { Button } from '@/components/ui/button';
import { Grid3X3, List } from 'lucide-react';

interface EnhancedProductCatalogProps {
  onAddToCart: (product: any) => void;
  searchQuery: string;
}

const expandedProductDatabase = [
  // Processors
  {
    id: 'cpu-1',
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
    id: 'cpu-2',
    name: 'Intel Core i9-13900K',
    category: 'processors',
    price: 589.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 98,
    specs: ['24 Cores, 32 Threads', '3.0GHz Base Clock', 'LGA1700 Socket'],
    inStock: true,
    featured: true
  },
  {
    id: 'cpu-3',
    name: 'AMD Ryzen 7 7700X',
    category: 'processors',
    price: 399.99,
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: 156,
    specs: ['8 Cores, 16 Threads', '4.5GHz Base Clock', 'AM5 Socket'],
    inStock: true,
    featured: false
  },
  {
    id: 'cpu-4',
    name: 'Intel Core i5-13600K',
    category: 'processors',
    price: 319.99,
    image: '/placeholder.svg',
    rating: 4.5,
    reviews: 203,
    specs: ['14 Cores, 20 Threads', '3.5GHz Base Clock', 'LGA1700 Socket'],
    inStock: true,
    featured: false
  },

  // Graphics Cards
  {
    id: 'gpu-1',
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
    id: 'gpu-2',
    name: 'NVIDIA GeForce RTX 4070 Ti',
    category: 'graphics-cards',
    price: 799.99,
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: 156,
    specs: ['12GB GDDR6X', '2.6GHz Boost Clock', 'DLSS 3'],
    inStock: true,
    featured: true
  },
  {
    id: 'gpu-3',
    name: 'NVIDIA GeForce RTX 4070',
    category: 'graphics-cards',
    price: 599.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 234,
    specs: ['12GB GDDR6X', '2.5GHz Boost Clock', 'Ray Tracing'],
    inStock: true,
    featured: false
  },
  {
    id: 'gpu-4',
    name: 'AMD Radeon RX 7800 XT',
    category: 'graphics-cards',
    price: 499.99,
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: 178,
    specs: ['16GB GDDR6', '2.4GHz Game Clock', 'RDNA 3'],
    inStock: true,
    featured: false
  },

  // Motherboards
  {
    id: 'mb-1',
    name: 'ASUS ROG Strix X670E-E',
    category: 'motherboards',
    price: 449.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 67,
    specs: ['AM5 Socket', 'DDR5 Support', 'WiFi 6E'],
    inStock: true,
    featured: true
  },
  {
    id: 'mb-2',
    name: 'MSI Pro B760M-A WiFi',
    category: 'motherboards',
    price: 179.99,
    image: '/placeholder.svg',
    rating: 4.5,
    reviews: 134,
    specs: ['Intel B760', 'DDR5 Support', 'WiFi 6E'],
    inStock: true,
    featured: false
  },
  {
    id: 'mb-3',
    name: 'Gigabyte B650 AORUS Elite',
    category: 'motherboards',
    price: 229.99,
    image: '/placeholder.svg',
    rating: 4.4,
    reviews: 89,
    specs: ['AM5 Socket', 'DDR5 Support', 'RGB Fusion'],
    inStock: true,
    featured: false
  },

  // Memory
  {
    id: 'ram-1',
    name: 'Corsair Vengeance DDR5-6000',
    category: 'memory',
    price: 329.99,
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: 203,
    specs: ['32GB Kit (2x16GB)', '6000MHz', 'RGB Lighting'],
    inStock: true,
    featured: true
  },
  {
    id: 'ram-2',
    name: 'G.Skill Trident Z5 DDR5-5600',
    category: 'memory',
    price: 279.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 145,
    specs: ['32GB Kit (2x16GB)', '5600MHz', 'RGB Lighting'],
    inStock: true,
    featured: false
  },
  {
    id: 'ram-3',
    name: 'Corsair Vengeance LPX DDR4-3200',
    category: 'memory',
    price: 159.99,
    image: '/placeholder.svg',
    rating: 4.5,
    reviews: 456,
    specs: ['32GB Kit (2x16GB)', '3200MHz', 'Low Profile'],
    inStock: true,
    featured: false
  },

  // Storage
  {
    id: 'ssd-1',
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
    id: 'ssd-2',
    name: 'WD Black SN850X 1TB',
    category: 'storage',
    price: 129.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 289,
    specs: ['NVMe SSD', '7300MB/s Read', 'PCIe 4.0'],
    inStock: true,
    featured: false
  },
  {
    id: 'hdd-1',
    name: 'Seagate Barracuda 4TB',
    category: 'storage',
    price: 89.99,
    image: '/placeholder.svg',
    rating: 4.3,
    reviews: 678,
    specs: ['HDD', '5400 RPM', 'SATA 6Gb/s'],
    inStock: true,
    featured: false
  },

  // Power Supplies
  {
    id: 'psu-1',
    name: 'Corsair RM850x',
    category: 'power-supplies',
    price: 149.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 156,
    specs: ['850W', '80+ Gold', 'Fully Modular'],
    inStock: true,
    featured: true
  },
  {
    id: 'psu-2',
    name: 'EVGA SuperNOVA 750 G5',
    category: 'power-supplies',
    price: 119.99,
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: 234,
    specs: ['750W', '80+ Gold', 'Fully Modular'],
    inStock: true,
    featured: false
  },
  {
    id: 'psu-3',
    name: 'Seasonic Focus GX-650',
    category: 'power-supplies',
    price: 99.99,
    image: '/placeholder.svg',
    rating: 4.5,
    reviews: 178,
    specs: ['650W', '80+ Gold', 'Semi Modular'],
    inStock: false,
    featured: false
  }
];

export const EnhancedProductCatalog = ({ onAddToCart, searchQuery }: EnhancedProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState(expandedProductDatabase);

  useEffect(() => {
    let filtered = expandedProductDatabase;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
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

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'all': 'All Components',
      'processors': 'Processors',
      'graphics-cards': 'Graphics Cards',
      'motherboards': 'Motherboards',
      'memory': 'Memory (RAM)',
      'storage': 'Storage',
      'power-supplies': 'Power Supplies'
    };
    return categoryMap[category] || category;
  };

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
                <h2 className="text-3xl font-bold text-white mb-2">
                  {getCategoryDisplayName(selectedCategory)}
                </h2>
                <p className="text-slate-400">
                  {filteredProducts.length} products found
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
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
                <p className="text-slate-400 text-lg mb-4">
                  {searchQuery 
                    ? `No products found for "${searchQuery}"`
                    : 'No products found matching your criteria.'
                  }
                </p>
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
