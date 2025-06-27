
import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { Button } from '@/components/ui/button';
import { Grid3X3, List, Eye } from 'lucide-react';

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
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
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
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
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
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
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
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
    rating: 4.5,
    reviews: 203,
    specs: ['14 Cores, 20 Threads', '3.5GHz Base Clock', 'LGA1700 Socket'],
    inStock: true,
    featured: false
  },

  // NVIDIA Graphics Cards (Full Generation)
  {
    id: 'nvidia-1',
    name: 'NVIDIA GeForce RTX 4090 Founders Edition',
    category: 'graphics-cards',
    price: 1599.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.9,
    reviews: 342,
    specs: ['24GB GDDR6X', '2.52GHz Boost', '450W TDP', 'Ada Lovelace'],
    inStock: true,
    featured: true
  },
  {
    id: 'nvidia-2',
    name: 'NVIDIA GeForce RTX 4080 SUPER',
    category: 'graphics-cards',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.8,
    reviews: 267,
    specs: ['16GB GDDR6X', '2.55GHz Boost', '320W TDP', 'Ada Lovelace'],
    inStock: true,
    featured: true
  },
  {
    id: 'nvidia-3',
    name: 'NVIDIA GeForce RTX 4070 Ti SUPER',
    category: 'graphics-cards',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.7,
    reviews: 189,
    specs: ['16GB GDDR6X', '2.61GHz Boost', '285W TDP', 'Ada Lovelace'],
    inStock: true,
    featured: true
  },
  {
    id: 'nvidia-4',
    name: 'NVIDIA GeForce RTX 4070 SUPER',
    category: 'graphics-cards',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.7,
    reviews: 421,
    specs: ['12GB GDDR6X', '2.48GHz Boost', '220W TDP', 'Ada Lovelace'],
    inStock: true,
    featured: false
  },
  {
    id: 'nvidia-5',
    name: 'NVIDIA GeForce RTX 4060 Ti 16GB',
    category: 'graphics-cards',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.6,
    reviews: 356,
    specs: ['16GB GDDR6', '2.54GHz Boost', '165W TDP', 'Ada Lovelace'],
    inStock: true,
    featured: false
  },
  {
    id: 'nvidia-6',
    name: 'NVIDIA GeForce RTX 4060 Ti 8GB',
    category: 'graphics-cards',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.6,
    reviews: 298,
    specs: ['8GB GDDR6', '2.54GHz Boost', '165W TDP', 'Ada Lovelace'],
    inStock: true,
    featured: false
  },
  {
    id: 'nvidia-7',
    name: 'NVIDIA GeForce RTX 4060',
    category: 'graphics-cards',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.5,
    reviews: 412,
    specs: ['8GB GDDR6', '2.46GHz Boost', '115W TDP', 'Ada Lovelace'],
    inStock: true,
    featured: false
  },

  // Motherboards
  {
    id: 'mb-1',
    name: 'ASUS ROG Strix X670E-E Gaming WiFi',
    category: 'motherboards',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    rating: 4.7,
    reviews: 67,
    specs: ['AM5 Socket', 'DDR5 Support', 'WiFi 6E', 'PCIe 5.0'],
    inStock: true,
    featured: true
  },
  {
    id: 'mb-2',
    name: 'MSI Pro B760M-A WiFi',
    category: 'motherboards',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    rating: 4.5,
    reviews: 134,
    specs: ['Intel B760', 'DDR5 Support', 'WiFi 6E', 'LGA1700'],
    inStock: true,
    featured: false
  },
  {
    id: 'mb-3',
    name: 'Gigabyte B650 AORUS Elite AX',
    category: 'motherboards',
    price: 229.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    rating: 4.4,
    reviews: 89,
    specs: ['AM5 Socket', 'DDR5 Support', 'RGB Fusion', 'WiFi 6'],
    inStock: true,
    featured: false
  },

  // Memory
  {
    id: 'ram-1',
    name: 'Corsair Vengeance DDR5-6000 32GB',
    category: 'memory',
    price: 329.99,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
    rating: 4.6,
    reviews: 203,
    specs: ['32GB Kit (2x16GB)', '6000MHz', 'RGB Lighting', 'Intel XMP'],
    inStock: true,
    featured: true
  },
  {
    id: 'ram-2',
    name: 'G.Skill Trident Z5 DDR5-5600 32GB',
    category: 'memory',
    price: 279.99,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
    rating: 4.7,
    reviews: 145,
    specs: ['32GB Kit (2x16GB)', '5600MHz', 'RGB Lighting', 'AMD EXPO'],
    inStock: true,
    featured: false
  },

  // Storage
  {
    id: 'ssd-1',
    name: 'Samsung 980 PRO 2TB NVMe',
    category: 'storage',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    rating: 4.8,
    reviews: 445,
    specs: ['NVMe SSD', '7000MB/s Read', 'PCIe 4.0', '2TB Capacity'],
    inStock: true,
    featured: true
  },
  {
    id: 'ssd-2',
    name: 'WD Black SN850X 1TB NVMe',
    category: 'storage',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    rating: 4.7,
    reviews: 289,
    specs: ['NVMe SSD', '7300MB/s Read', 'PCIe 4.0', '1TB Capacity'],
    inStock: true,
    featured: false
  },

  // Power Supplies
  {
    id: 'psu-1',
    name: 'Corsair RM850x 850W 80+ Gold',
    category: 'power-supplies',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400',
    rating: 4.7,
    reviews: 156,
    specs: ['850W', '80+ Gold', 'Fully Modular', '135mm Fan'],
    inStock: true,
    featured: true
  },
  {
    id: 'psu-2',
    name: 'EVGA SuperNOVA 750 G5',
    category: 'power-supplies',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400',
    rating: 4.6,
    reviews: 234,
    specs: ['750W', '80+ Gold', 'Fully Modular', '130mm Fan'],
    inStock: true,
    featured: false
  }
];

export const EnhancedProductCatalog = ({ onAddToCart, searchQuery }: EnhancedProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState(expandedProductDatabase);
  const [displayCount, setDisplayCount] = useState(6);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let filtered = expandedProductDatabase;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

    setFilteredProducts(filtered);
    setShowAll(false);
    setDisplayCount(6);
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

  const handleViewMore = () => {
    setShowAll(true);
    setDisplayCount(filteredProducts.length);
  };

  const productsToShow = showAll ? filteredProducts : filteredProducts.slice(0, displayCount);

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {getCategoryDisplayName(selectedCategory)}
                </h2>
                <p className="text-slate-400 text-sm sm:text-base">
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
            <div className={`grid gap-4 sm:gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {productsToShow.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* View More Button */}
            {!showAll && filteredProducts.length > displayCount && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleViewMore}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-6 sm:px-8 py-2 sm:py-3"
                  size="lg"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View More Products ({filteredProducts.length - displayCount} remaining)
                </Button>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-slate-400 text-base sm:text-lg mb-4">
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
