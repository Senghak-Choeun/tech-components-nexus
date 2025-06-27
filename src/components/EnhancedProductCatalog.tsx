import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cpu, Zap, HardDrive, Fan, Monitor } from 'lucide-react';

interface Product {
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
}

interface EnhancedProductCatalogProps {
  onAddToCart: (product: Product) => void;
  searchQuery: string;
}

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) => {
  return (
    <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
          loading="lazy"
        />
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            Featured
          </Badge>
        )}
      </div>
      <h3 className="text-white font-semibold text-lg mb-1">{product.name}</h3>
      <div className="text-green-400 font-bold text-md mb-2">${product.price.toFixed(2)}</div>
      <div className="flex items-center space-x-2 text-yellow-400 text-xs mb-2">
        <span>★ {product.rating}</span>
        <span className="text-slate-400">({product.reviews} reviews)</span>
      </div>
      <ul className="text-slate-400 text-xs mb-4 flex-1 overflow-hidden">
        {product.specs.slice(0, 3).map((spec, idx) => (
          <li key={idx} className="truncate">{spec}</li>
        ))}
        {product.specs.length > 3 && <li>...</li>}
      </ul>
      <Button
        onClick={() => onAddToCart(product)}
        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl shadow-lg"
        size="sm"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export const EnhancedProductCatalog = ({ onAddToCart, searchQuery }: EnhancedProductCatalogProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState('name');
  const [visibleProducts, setVisibleProducts] = useState(12);

  const categories = [
    { id: 'all', name: 'All Products', icon: Cpu },
    { id: 'processors', name: 'Processors', icon: Cpu },
    { id: 'graphics-cards', name: 'Graphics Cards', icon: Zap },
    { id: 'memory', name: 'Memory', icon: HardDrive },
    { id: 'storage', name: 'Storage', icon: HardDrive },
    { id: 'motherboards', name: 'Motherboards', icon: Cpu },
    { id: 'power-supplies', name: 'Power Supplies', icon: Zap },
    { id: 'cooling', name: 'Cooling', icon: Fan },
    { id: 'cases', name: 'Cases', icon: Monitor },
  ];

  const products: Product[] = [
    // Processors - AMD Ryzen
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
      name: 'AMD Ryzen 7 7700X',
      category: 'processors',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
      rating: 4.7,
      reviews: 89,
      specs: ['8 Cores, 16 Threads', '4.5GHz Base Clock', 'AM5 Socket', '105W TDP'],
      inStock: true,
      featured: true
    },
    {
      id: 'cpu-amd-3',
      name: 'AMD Ryzen 5 7600X',
      category: 'processors',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
      rating: 4.6,
      reviews: 156,
      specs: ['6 Cores, 12 Threads', '4.7GHz Base Clock', 'AM5 Socket', '105W TDP'],
      inStock: true,
      featured: false
    },
    {
      id: 'cpu-amd-4',
      name: 'AMD Ryzen 9 7900X',
      category: 'processors',
      price: 549.99,
      image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
      rating: 4.8,
      reviews: 98,
      specs: ['12 Cores, 24 Threads', '4.7GHz Base Clock', 'AM5 Socket', '170W TDP'],
      inStock: true,
      featured: true
    },

    // Processors - Intel
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
      reviews: 145,
      specs: ['16 Cores, 24 Threads', '3.4GHz Base Clock', 'LGA1700 Socket', '125W TDP'],
      inStock: true,
      featured: true
    },
    {
      id: 'cpu-intel-3',
      name: 'Intel Core i5-13600K',
      category: 'processors',
      price: 329.99,
      image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400',
      rating: 4.5,
      reviews: 178,
      specs: ['14 Cores, 20 Threads', '3.5GHz Base Clock', 'LGA1700 Socket', '125W TDP'],
      inStock: true,
      featured: false
    },

    // Graphics Cards - NVIDIA RTX 40 Series
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
      reviews: 256,
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
      rating: 4.6,
      reviews: 234,
      specs: ['12GB GDDR6X', '2.48GHz Boost', '220W TDP', 'Ada Lovelace', '1440p Gaming'],
      inStock: true,
      featured: false
    },
    {
      id: 'nvidia-5',
      name: 'NVIDIA GeForce RTX 4060 Ti',
      category: 'graphics-cards',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
      rating: 4.4,
      reviews: 167,
      specs: ['16GB GDDR6', '2.54GHz Boost', '165W TDP', 'Ada Lovelace', '1080p Gaming'],
      inStock: true,
      featured: false
    },
    {
      id: 'nvidia-6',
      name: 'NVIDIA GeForce RTX 4060',
      category: 'graphics-cards',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
      rating: 4.3,
      reviews: 198,
      specs: ['8GB GDDR6', '2.46GHz Boost', '115W TDP', 'Ada Lovelace', '1080p Gaming'],
      inStock: true,
      featured: false
    },

    // Graphics Cards - AMD Radeon
    {
      id: 'amd-gpu-1',
      name: 'AMD Radeon RX 7900 XTX',
      category: 'graphics-cards',
      price: 999.99,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
      rating: 4.6,
      reviews: 145,
      specs: ['24GB GDDR6', '2.50GHz Boost', '355W TDP', 'RDNA 3', '4K Gaming'],
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
      reviews: 123,
      specs: ['20GB GDDR6', '2.40GHz Boost', '315W TDP', 'RDNA 3', '1440p Gaming'],
      inStock: true,
      featured: false
    },

    // Storage - NVMe SSDs
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
      reviews: 332,
      specs: ['1TB Capacity', '7300MB/s Read', '6600MB/s Write', 'PCIe 4.0', 'Gaming Optimized'],
      inStock: true,
      featured: false
    },
    {
      id: 'ssd-nvme-3',
      name: 'Crucial P5 Plus 2TB NVMe SSD',
      category: 'storage',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
      rating: 4.6,
      reviews: 287,
      specs: ['2TB Capacity', '6600MB/s Read', '5000MB/s Write', 'PCIe 4.0', 'Micron 3D NAND'],
      inStock: true,
      featured: false
    },
    {
      id: 'ssd-nvme-4',
      name: 'Seagate FireCuda 530 1TB NVMe SSD',
      category: 'storage',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
      rating: 4.5,
      reviews: 198,
      specs: ['1TB Capacity', '7300MB/s Read', '6900MB/s Write', 'PCIe 4.0', 'PS5 Compatible'],
      inStock: true,
      featured: false
    },

    // Storage - Traditional HDDs
    {
      id: 'hdd-1',
      name: 'Seagate Barracuda 4TB HDD',
      category: 'storage',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
      rating: 4.3,
      reviews: 567,
      specs: ['4TB Capacity', '5400 RPM', 'SATA 6Gb/s', '256MB Cache', 'Mass Storage'],
      inStock: true,
      featured: false
    },
    {
      id: 'hdd-2',
      name: 'WD Blue 2TB HDD',
      category: 'storage',
      price: 54.99,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400',
      rating: 4.4,
      reviews: 423,
      specs: ['2TB Capacity', '7200 RPM', 'SATA 6Gb/s', '256MB Cache', 'Reliable Storage'],
      inStock: true,
      featured: false
    },

    // Memory - DDR5
    {
      id: 'ram-ddr5-1',
      name: 'Corsair Dominator Platinum RGB 32GB DDR5-5600',
      category: 'memory',
      price: 279.99,
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400',
      rating: 4.8,
      reviews: 178,
      specs: ['32GB (2x16GB)', 'DDR5-5600', 'CL36', 'RGB Lighting', 'Premium Build'],
      inStock: true,
      featured: true
    },
    {
      id: 'ram-ddr5-2',
      name: 'G.Skill Trident Z5 RGB 32GB DDR5-6000',
      category: 'memory',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400',
      rating: 4.7,
      reviews: 134,
      specs: ['32GB (2x16GB)', 'DDR5-6000', 'CL36', 'RGB Lighting', 'High Performance'],
      inStock: true,
      featured: true
    },
    {
      id: 'ram-ddr5-3',
      name: 'Kingston Fury Beast 16GB DDR5-5600',
      category: 'memory',
      price: 119.99,
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400',
      rating: 4.5,
      reviews: 245,
      specs: ['16GB (2x8GB)', 'DDR5-5600', 'CL36', 'No RGB', 'Value Performance'],
      inStock: true,
      featured: false
    },

    // Memory - DDR4
    {
      id: 'ram-ddr4-1',
      name: 'Corsair Vengeance LPX 32GB DDR4-3200',
      category: 'memory',
      price: 139.99,
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400',
      rating: 4.6,
      reviews: 567,
      specs: ['32GB (2x16GB)', 'DDR4-3200', 'CL16', 'Low Profile', 'Proven Reliability'],
      inStock: true,
      featured: false
    },
    {
      id: 'ram-ddr4-2',
      name: 'G.Skill Ripjaws V 16GB DDR4-3600',
      category: 'memory',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400',
      rating: 4.5,
      reviews: 789,
      specs: ['16GB (2x8GB)', 'DDR4-3600', 'CL16', 'Classic Design', 'Budget Gaming'],
      inStock: true,
      featured: false
    },

    // Motherboards - AMD AM5
    {
      id: 'mobo-amd-1',
      name: 'ASUS ROG Strix X670E-E Gaming WiFi',
      category: 'motherboards',
      price: 499.99,
      image: 'https://images.unsplash.com/photo-1518481852452-9415b262eba4?w=400',
      rating: 4.8,
      reviews: 89,
      specs: ['AM5 Socket', 'PCIe 5.0', 'DDR5 Support', 'WiFi 6E', 'Premium Features'],
      inStock: true,
      featured: true
    },
    {
      id: 'mobo-amd-2',
      name: 'MSI MAG B650 Tomahawk WiFi',
      category: 'motherboards',
      price: 219.99,
      image: 'https://images.unsplash.com/photo-1518481852452-9415b262eba4?w=400',
      rating: 4.6,
      reviews: 156,
      specs: ['AM5 Socket', 'PCIe 4.0', 'DDR5 Support', 'WiFi 6', 'Mid-Range Gaming'],
      inStock: true,
      featured: false
    },

    // Motherboards - Intel LGA1700
    {
      id: 'mobo-intel-1',
      name: 'ASUS ROG Maximus Z790 Hero',
      category: 'motherboards',
      price: 629.99,
      image: 'https://images.unsplash.com/photo-1518481852452-9415b262eba4?w=400',
      rating: 4.9,
      reviews: 67,
      specs: ['LGA1700 Socket', 'PCIe 5.0', 'DDR5 Support', 'WiFi 6E', 'Flagship Features'],
      inStock: true,
      featured: true
    },
    {
      id: 'mobo-intel-2',
      name: 'MSI PRO B760M-A WiFi',
      category: 'motherboards',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1518481852452-9415b262eba4?w=400',
      rating: 4.4,
      reviews: 234,
      specs: ['LGA1700 Socket', 'PCIe 4.0', 'DDR4/DDR5', 'WiFi 6', 'Budget Friendly'],
      inStock: true,
      featured: false
    },

    // Power Supplies
    {
      id: 'psu-1',
      name: 'Corsair RM1000x 1000W 80+ Gold',
      category: 'power-supplies',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      rating: 4.8,
      reviews: 345,
      specs: ['1000W Output', '80+ Gold', 'Fully Modular', '10-Year Warranty', 'Zero RPM Mode'],
      inStock: true,
      featured: true
    },
    {
      id: 'psu-2',
      name: 'EVGA SuperNOVA 850 G6 850W 80+ Gold',
      category: 'power-supplies',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      rating: 4.7,
      reviews: 267,
      specs: ['850W Output', '80+ Gold', 'Fully Modular', '10-Year Warranty', 'Compact Design'],
      inStock: true,
      featured: true
    },
    {
      id: 'psu-3',
      name: 'Seasonic Focus GX-750 750W 80+ Gold',
      category: 'power-supplies',
      price: 119.99,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      rating: 4.6,
      reviews: 189,
      specs: ['750W Output', '80+ Gold', 'Fully Modular', '10-Year Warranty', 'Silent Operation'],
      inStock: true,
      featured: false
    },

    // Cooling - AIO Liquid Coolers
    {
      id: 'cooler-aio-1',
      name: 'Corsair H150i Elite Capellix 360mm AIO',
      category: 'cooling',
      price: 189.99,
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400',
      rating: 4.7,
      reviews: 234,
      specs: ['360mm Radiator', 'RGB Lighting', 'ML120 RGB Fans', 'Zero RPM Mode', 'iCUE Software'],
      inStock: true,
      featured: true
    },
    {
      id: 'cooler-aio-2',
      name: 'NZXT Kraken X63 280mm AIO',
      category: 'cooling',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400',
      rating: 4.6,
      reviews: 178,
      specs: ['280mm Radiator', 'Infinity Mirror', 'Aer P140 Fans', 'CAM Software', 'RGB Lighting'],
      inStock: true,
      featured: false
    },

    // Cooling - Air Coolers
    {
      id: 'cooler-air-1',
      name: 'Noctua NH-D15 Dual Tower Air Cooler',
      category: 'cooling',
      price: 109.99,
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400',
      rating: 4.9,
      reviews: 456,
      specs: ['Dual Tower Design', 'Two NF-A15 Fans', 'AM5/LGA1700 Support', '6-Year Warranty', 'Ultra Quiet'],
      inStock: true,
      featured: true
    },
    {
      id: 'cooler-air-2',
      name: 'be quiet! Dark Rock 4 Air Cooler',
      category: 'cooling',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400',
      rating: 4.7,
      reviews: 289,
      specs: ['Single Tower', 'Silent Wings 3 Fan', 'Black Design', '3-Year Warranty', 'Premium Cooling'],
      inStock: true,
      featured: false
    },

    // Cases
    {
      id: 'case-1',
      name: 'Lian Li PC-O11 Dynamic EVO Mid-Tower',
      category: 'cases',
      price: 169.99,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400',
      rating: 4.8,
      reviews: 567,
      specs: ['Mid-Tower ATX', 'Tempered Glass', 'Excellent Airflow', 'Cable Management', 'Premium Build'],
      inStock: true,
      featured: true
    },
    {
      id: 'case-2',
      name: 'Fractal Design Define 7 Compact',
      category: 'cases',
      price: 139.99,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400',
      rating: 4.7,
      reviews: 234,
      specs: ['Compact Mid-Tower', 'Sound Dampening', 'ModuVent Design', 'Premium Materials', 'Silent Operation'],
      inStock: true,
      featured: false
    },
    {
      id: 'case-3',
      name: 'NZXT H7 Flow Mid-Tower',
      category: 'cases',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400',
      rating: 4.6,
      reviews: 189,
      specs: ['Mid-Tower ATX', 'Perforated Front Panel', 'RGB Lighting Strip', 'Cable Management', 'Modern Design'],
      inStock: true,
      featured: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const displayedProducts = sortedProducts.slice(0, visibleProducts);

  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + 12);
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Premium PC Components
          </h2>
          <p className="text-xl text-slate-300">
            Build your dream PC with our curated selection of high-performance components
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex space-x-2">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Math.min(parseInt(e.target.value), priceRange[1]), priceRange[1]])}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Math.max(parseInt(e.target.value), priceRange[0])])}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="text-slate-300">
                <div className="text-sm">Results</div>
                <div className="text-2xl font-bold text-blue-400">
                  {filteredProducts.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>

        {/* Load More Button */}
        {visibleProducts < sortedProducts.length && (
          <div className="text-center">
            <Button
              onClick={loadMoreProducts}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Load More Products ({sortedProducts.length - visibleProducts} remaining)
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-xl mb-4">No products found</div>
            <p className="text-slate-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </section>
  );
};
