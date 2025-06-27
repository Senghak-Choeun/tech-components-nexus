
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
  // AMD Processors
  {
    id: 'cpu-amd-1',
    name: 'AMD Ryzen 9 7950X',
    category: 'processors',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
    rating: 4.8,
    reviews: 124,
    specs: ['16 Cores, 32 Threads', '4.5GHz Base Clock', 'AM5 Socket', '170W TDP'],
    inStock: true,
    featured: true
  },
  {
    id: 'cpu-amd-2',
    name: 'AMD Ryzen 9 7900X',
    category: 'processors',
    price: 549.99,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
    rating: 4.7,
    reviews: 98,
    specs: ['12 Cores, 24 Threads', '4.7GHz Base Clock', 'AM5 Socket', '170W TDP'],
    inStock: true,
    featured: true
  },
  {
    id: 'cpu-amd-3',
    name: 'AMD Ryzen 7 7700X',
    category: 'processors',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
    rating: 4.6,
    reviews: 156,
    specs: ['8 Cores, 16 Threads', '4.5GHz Base Clock', 'AM5 Socket', '105W TDP'],
    inStock: true,
    featured: false
  },
  {
    id: 'cpu-amd-4',
    name: 'AMD Ryzen 5 7600X',
    category: 'processors',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
    rating: 4.5,
    reviews: 203,
    specs: ['6 Cores, 12 Threads', '4.7GHz Base Clock', 'AM5 Socket', '105W TDP'],
    inStock: true,
    featured: false
  },

  // Intel Processors
  {
    id: 'cpu-intel-1',
    name: 'Intel Core i9-13900K',
    category: 'processors',
    price: 589.99,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
    rating: 4.7,
    reviews: 189,
    specs: ['24 Cores, 32 Threads', '3.0GHz Base Clock', 'LGA1700 Socket', '125W TDP'],
    inStock: true,
    featured: true
  },
  {
    id: 'cpu-intel-2',
    name: 'Intel Core i7-13700K',
    category: 'processors',
    price: 419.99,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
    rating: 4.6,
    reviews: 267,
    specs: ['16 Cores, 24 Threads', '3.4GHz Base Clock', 'LGA1700 Socket', '125W TDP'],
    inStock: true,
    featured: false
  },
  {
    id: 'cpu-intel-3',
    name: 'Intel Core i5-13600K',
    category: 'processors',
    price: 319.99,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
    rating: 4.5,
    reviews: 298,
    specs: ['14 Cores, 20 Threads', '3.5GHz Base Clock', 'LGA1700 Socket', '125W TDP'],
    inStock: true,
    featured: false
  },

  // NVIDIA Graphics Cards (Complete RTX 40 Series)
  {
    id: 'nvidia-1',
    name: 'NVIDIA GeForce RTX 4090 Founders Edition',
    category: 'graphics-cards',
    price: 1599.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.9,
    reviews: 342,
    specs: ['24GB GDDR6X', '2.52GHz Boost', '450W TDP', 'Ada Lovelace', '4K Gaming'],
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
    specs: ['16GB GDDR6X', '2.55GHz Boost', '320W TDP', 'Ada Lovelace', '4K Gaming'],
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
    specs: ['16GB GDDR6X', '2.61GHz Boost', '285W TDP', 'Ada Lovelace', '1440p Gaming'],
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
    specs: ['12GB GDDR6X', '2.48GHz Boost', '220W TDP', 'Ada Lovelace', '1440p Gaming'],
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
    specs: ['16GB GDDR6', '2.54GHz Boost', '165W TDP', 'Ada Lovelace', '1080p/1440p'],
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
    specs: ['8GB GDDR6', '2.54GHz Boost', '165W TDP', 'Ada Lovelace', '1080p Gaming'],
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
    specs: ['8GB GDDR6', '2.46GHz Boost', '115W TDP', 'Ada Lovelace', '1080p Gaming'],
    inStock: true,
    featured: false
  },

  // AMD Graphics Cards
  {
    id: 'amd-gpu-1',
    name: 'AMD Radeon RX 7900 XTX',
    category: 'graphics-cards',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.6,
    reviews: 234,
    specs: ['24GB GDDR6', '2.5GHz Boost', '355W TDP', 'RDNA 3', '4K Gaming'],
    inStock: true,
    featured: true
  },
  {
    id: 'amd-gpu-2',
    name: 'AMD Radeon RX 7900 XT',
    category: 'graphics-cards',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.5,
    reviews: 187,
    specs: ['20GB GDDR6', '2.4GHz Boost', '300W TDP', 'RDNA 3', '1440p Gaming'],
    inStock: true,
    featured: false
  },
  {
    id: 'amd-gpu-3',
    name: 'AMD Radeon RX 7800 XT',
    category: 'graphics-cards',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.4,
    reviews: 156,
    specs: ['16GB GDDR6', '2.4GHz Boost', '263W TDP', 'RDNA 3', '1440p Gaming'],
    inStock: true,
    featured: false
  },

  // Motherboards - Intel
  {
    id: 'mb-intel-1',
    name: 'ASUS ROG Maximus Z790 Hero',
    category: 'motherboards',
    price: 629.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    rating: 4.8,
    reviews: 67,
    specs: ['Intel Z790', 'LGA1700', 'DDR5-7800+', 'WiFi 6E', 'PCIe 5.0'],
    inStock: true,
    featured: true
  },
  {
    id: 'mb-intel-2',
    name: 'MSI MAG Z790 Tomahawk WiFi',
    category: 'motherboards',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    rating: 4.6,
    reviews: 134,
    specs: ['Intel Z790', 'LGA1700', 'DDR5-6400+', 'WiFi 6E', 'PCIe 5.0'],
    inStock: true,
    featured: false
  },
  {
    id: 'mb-intel-3',
    name: 'Gigabyte B760 AORUS Elite AX',
    category: 'motherboards',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    rating: 4.4,
    reviews: 89,
    specs: ['Intel B760', 'LGA1700', 'DDR5-5600+', 'WiFi 6', 'PCIe 4.0'],
    inStock: true,
    featured: false
  },

  // Motherboards - AMD
  {
    id: 'mb-amd-1',
    name: 'ASUS ROG Strix X670E-E Gaming WiFi',
    category: 'motherboards',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    rating: 4.7,
    reviews: 112,
    specs: ['AMD X670E', 'AM5 Socket', 'DDR5-6400+', 'WiFi 6E', 'PCIe 5.0'],
    inStock: true,
    featured: true
  },
  {
    id: 'mb-amd-2',
    name: 'MSI MAG B650 Tomahawk WiFi',
    category: 'motherboards',
    price: 229.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    rating: 4.5,
    reviews: 98,
    specs: ['AMD B650', 'AM5 Socket', 'DDR5-5600+', 'WiFi 6', 'PCIe 4.0'],
    inStock: true,
    featured: false
  },

  // Memory - DDR5
  {
    id: 'ram-ddr5-1',
    name: 'Corsair Vengeance DDR5-6000 32GB (2x16GB)',
    category: 'memory',
    price: 329.99,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
    rating: 4.6,
    reviews: 203,
    specs: ['32GB Kit (2x16GB)', '6000MHz', 'CL30', 'RGB Lighting', 'Intel XMP 3.0'],
    inStock: true,
    featured: true
  },
  {
    id: 'ram-ddr5-2',
    name: 'G.Skill Trident Z5 DDR5-5600 32GB (2x16GB)',
    category: 'memory',
    price: 279.99,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
    rating: 4.7,
    reviews: 145,
    specs: ['32GB Kit (2x16GB)', '5600MHz', 'CL28', 'RGB Lighting', 'AMD EXPO'],
    inStock: true,
    featured: false
  },
  {
    id: 'ram-ddr5-3',
    name: 'Kingston Fury Beast DDR5-5200 16GB (2x8GB)',
    category: 'memory',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
    rating: 4.4,
    reviews: 167,
    specs: ['16GB Kit (2x8GB)', '5200MHz', 'CL40', 'No RGB', 'Plug N Play'],
    inStock: true,
    featured: false
  },

  // Memory - DDR4
  {
    id: 'ram-ddr4-1',
    name: 'Corsair Vengeance LPX DDR4-3200 32GB (2x16GB)',
    category: 'memory',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
    rating: 4.5,
    reviews: 298,
    specs: ['32GB Kit (2x16GB)', '3200MHz', 'CL16', 'Low Profile', 'Intel XMP 2.0'],
    inStock: true,
    featured: false
  },

  // NVMe SSDs
  {
    id: 'ssd-nvme-1',
    name: 'Samsung 980 PRO 2TB NVMe SSD',
    category: 'storage',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    rating: 4.8,
    reviews: 445,
    specs: ['2TB Capacity', '7000MB/s Read', '6900MB/s Write', 'PCIe 4.0', '5-Year Warranty'],
    inStock: true,
    featured: true
  },
  {
    id: 'ssd-nvme-2',
    name: 'WD Black SN850X 1TB NVMe SSD',
    category: 'storage',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    rating: 4.7,
    reviews: 289,
    specs: ['1TB Capacity', '7300MB/s Read', '6600MB/s Write', 'PCIe 4.0', '5-Year Warranty'],
    inStock: true,
    featured: true
  },
  {
    id: 'ssd-nvme-3',
    name: 'Crucial P5 Plus 2TB NVMe SSD',
    category: 'storage',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    rating: 4.6,
    reviews: 234,
    specs: ['2TB Capacity', '6600MB/s Read', '5000MB/s Write', 'PCIe 4.0', '5-Year Warranty'],
    inStock: true,
    featured: false
  },
  {
    id: 'ssd-nvme-4',
    name: 'Kingston NV2 1TB NVMe SSD',
    category: 'storage',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    rating: 4.3,
    reviews: 178,
    specs: ['1TB Capacity', '3500MB/s Read', '2100MB/s Write', 'PCIe 4.0', '3-Year Warranty'],
    inStock: true,
    featured: false
  },

  // SATA SSDs
  {
    id: 'ssd-sata-1',
    name: 'Samsung 870 EVO 2TB SATA SSD',
    category: 'storage',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    rating: 4.7,
    reviews: 356,
    specs: ['2TB Capacity', '560MB/s Read', '530MB/s Write', 'SATA III', '5-Year Warranty'],
    inStock: true,
    featured: false
  },
  {
    id: 'ssd-sata-2',
    name: 'Crucial MX4 1TB SATA SSD',
    category: 'storage',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    rating: 4.5,
    reviews: 234,
    specs: ['1TB Capacity', '560MB/s Read', '510MB/s Write', 'SATA III', '3-Year Warranty'],
    inStock: true,
    featured: false
  },

  // HDDs
  {
    id: 'hdd-1',
    name: 'Seagate Barracuda 4TB 7200RPM HDD',
    category: 'storage',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    rating: 4.4,
    reviews: 567,
    specs: ['4TB Capacity', '7200 RPM', '256MB Cache', 'SATA III', '2-Year Warranty'],
    inStock: true,
    featured: false
  },
  {
    id: 'hdd-2',
    name: 'WD Blue 2TB 7200RPM HDD',
    category: 'storage',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
    rating: 4.3,
    reviews: 423,
    specs: ['2TB Capacity', '7200 RPM', '256MB Cache', 'SATA III', '2-Year Warranty'],
    inStock: true,
    featured: false
  },

  // Power Supplies
  {
    id: 'psu-1',
    name: 'Corsair RM850x 850W 80+ Gold Modular PSU',
    category: 'power-supplies',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400',
    rating: 4.7,
    reviews: 156,
    specs: ['850W', '80+ Gold', 'Fully Modular', '135mm Fan', '10-Year Warranty'],
    inStock: true,
    featured: true
  },
  {
    id: 'psu-2',
    name: 'EVGA SuperNOVA 750 G5 80+ Gold',
    category: 'power-supplies',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400',
    rating: 4.6,
    reviews: 234,
    specs: ['750W', '80+ Gold', 'Fully Modular', '130mm Fan', '10-Year Warranty'],
    inStock: true,
    featured: false
  },
  {
    id: 'psu-3',
    name: 'Seasonic Focus GX-650 650W 80+ Gold',
    category: 'power-supplies',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400',
    rating: 4.5,
    reviews: 189,
    specs: ['650W', '80+ Gold', 'Fully Modular', '120mm Fan', '10-Year Warranty'],
    inStock: true,
    featured: false
  },
  {
    id: 'psu-4',
    name: 'be quiet! Pure Power 11 600W 80+ Gold',
    category: 'power-supplies',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400',
    rating: 4.4,
    reviews: 134,
    specs: ['600W', '80+ Gold', 'Semi-Modular', '120mm Fan', '3-Year Warranty'],
    inStock: true,
    featured: false
  },

  // Cases
  {
    id: 'case-1',
    name: 'Fractal Design Define 7 Mid Tower',
    category: 'cases',
    price: 169.99,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400',
    rating: 4.6,
    reviews: 89,
    specs: ['Mid Tower', 'Tempered Glass', 'Sound Dampening', 'USB-C Front Panel'],
    inStock: true,
    featured: true
  },
  {
    id: 'case-2',
    name: 'NZXT H7 Elite Mid Tower',
    category: 'cases',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400',
    rating: 4.5,
    reviews: 67,
    specs: ['Mid Tower', 'Tempered Glass', 'RGB Lighting', 'Cable Management'],
    inStock: true,
    featured: false
  },
  {
    id: 'case-3',
    name: 'Corsair 4000D Airflow Mid Tower',
    category: 'cases',
    price: 109.99,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400',
    rating: 4.4,
    reviews: 134,
    specs: ['Mid Tower', 'Tempered Glass', 'High Airflow', 'Tool-free Installation'],
    inStock: true,
    featured: false
  },

  // Cooling
  {
    id: 'cooling-1',
    name: 'Noctua NH-D15 CPU Cooler',
    category: 'cooling',
    price: 109.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.8,
    reviews: 234,
    specs: ['Dual Tower', 'Dual 140mm Fans', 'AM5/LGA1700', '6-Year Warranty'],
    inStock: true,
    featured: true
  },
  {
    id: 'cooling-2',
    name: 'Corsair H100i Elite Capellix AIO',
    category: 'cooling',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.6,
    reviews: 178,
    specs: ['240mm AIO', 'RGB Pump', 'ML120 Fans', '5-Year Warranty'],
    inStock: true,
    featured: false
  },
  {
    id: 'cooling-3',
    name: 'Arctic Liquid Freezer II 280mm AIO',
    category: 'cooling',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
    rating: 4.5,
    reviews: 156,
    specs: ['280mm AIO', 'P14 PWM Fans', 'VRM Cooling', '6-Year Warranty'],
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
      'processors': 'Processors (CPU)',
      'graphics-cards': 'Graphics Cards (GPU)',
      'motherboards': 'Motherboards',
      'memory': 'Memory (RAM)',
      'storage': 'Storage (SSD/HDD)',
      'power-supplies': 'Power Supplies (PSU)',
      'cases': 'PC Cases',
      'cooling': 'Cooling Solutions'
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
