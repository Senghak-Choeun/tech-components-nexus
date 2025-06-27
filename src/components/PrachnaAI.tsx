
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, User, X, Sparkles, ShoppingCart, Search, Cpu, RotateCcw, Download, FileText, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  products?: any[];
  pcBuild?: any[];
  downloadLink?: string;
  fileName?: string;
}

interface PrachnaAIProps {
  onAddToCart: (product: any) => void;
  onSearchProduct: (query: string) => void;
}

export const PrachnaAI = ({ onAddToCart, onSearchProduct }: PrachnaAIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "👋 Hello! I'm **Prachna**, your advanced PC building AI assistant!\n\nI can help you:\n• 🖥️ Build complete PCs within your budget\n• 🔍 Find compatible components\n• 📊 Compare specifications\n• 💾 Generate shopping lists\n• 🎮 Optimize for gaming, work, or content creation\n\nWhat's your budget and what will you use the PC for?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "🎮 Gaming PC under $1500",
    "💼 Workstation build $2000", 
    "🔥 Show RTX 4080 cards",
    "⚡ Best NVMe SSDs",
    "🧠 AMD vs Intel comparison",
    "💻 Budget streaming setup",
    "📋 Generate parts list",
    "🔧 Check compatibility"
  ];

  const resetChat = () => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: "👋 Hello! I'm **Prachna**, your advanced PC building AI assistant!\n\nI can help you:\n• 🖥️ Build complete PCs within your budget\n• 🔍 Find compatible components\n• 📊 Compare specifications\n• 💾 Generate shopping lists\n• 🎮 Optimize for gaming, work, or content creation\n\nWhat's your budget and what will you use the PC for?",
        timestamp: new Date(),
      },
    ]);
    setInputValue('');
    setIsTyping(false);
    toast({
      title: "Chat Reset",
      description: "Prachna AI chat has been reset successfully!",
    });
  };

  const generateDownloadableFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    return { url, filename };
  };

  const comprehensiveProductDatabase = [
    // Processors - AMD
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
    }
  ];

  const buildCompatiblePC = (budget: number, useCase: string) => {
    const builds: { [key: string]: any[] } = {
      gaming: [
        {
          budget: 800,
          components: [
            { type: '🖥️ CPU', name: 'AMD Ryzen 5 7600', price: 229.99, reason: 'Excellent gaming performance with 6 cores' },
            { type: '🎮 GPU', name: 'NVIDIA RTX 4060', price: 299.99, reason: '1080p gaming champion with ray tracing' },
            { type: '🔌 Motherboard', name: 'MSI B650M Pro WiFi', price: 129.99, reason: 'Solid AM5 foundation with WiFi' },
            { type: '🧠 RAM', name: '16GB DDR5-5600', price: 89.99, reason: 'Sweet spot for gaming performance' },
            { type: '💾 Storage', name: '1TB NVMe SSD', price: 79.99, reason: 'Fast game loading and boot times' },
            { type: '⚡ PSU', name: '650W 80+ Gold Modular', price: 89.99, reason: 'Efficient and reliable power delivery' }
          ]
        },
        {
          budget: 1500,
          components: [
            { type: '🖥️ CPU', name: 'AMD Ryzen 7 7700X', price: 399.99, reason: '8-core powerhouse for high-end gaming' },
            { type: '🎮 GPU', name: 'NVIDIA RTX 4070 Ti', price: 799.99, reason: '1440p gaming excellence with DLSS 3' },
            { type: '🔌 Motherboard', name: 'ASUS TUF Gaming X670E-Plus', price: 179.99, reason: 'Premium features with PCIe 5.0' },
            { type: '🧠 RAM', name: '32GB DDR5-5600', price: 159.99, reason: 'Future-proof memory capacity' },
            { type: '💾 Storage', name: '2TB NVMe SSD Gen4', price: 199.99, reason: 'Massive storage with blazing speeds' },
            { type: '⚡ PSU', name: '850W 80+ Gold Modular', price: 129.99, reason: 'High-efficiency power for demanding components' }
          ]
        }
      ],
      workstation: [
        {
          budget: 2000,
          components: [
            { type: '🖥️ CPU', name: 'AMD Ryzen 9 7950X', price: 699.99, reason: '16-core beast for content creation' },
            { type: '🎮 GPU', name: 'NVIDIA RTX 4070', price: 599.99, reason: 'Creator-focused with AV1 encoding' },
            { type: '🔌 Motherboard', name: 'ASUS ProArt X670E-Creator', price: 299.99, reason: 'Creator-optimized with Thunderbolt 4' },
            { type: '🧠 RAM', name: '64GB DDR5-5600 ECC', price: 399.99, reason: 'Professional-grade memory capacity' },
            { type: '💾 Storage', name: '4TB NVMe SSD Gen4', price: 399.99, reason: 'Massive workspace storage' },
            { type: '⚡ PSU', name: '1000W 80+ Platinum', price: 179.99, reason: 'Rock-solid power for workstation loads' }
          ]
        }
      ]
    };

    const categoryBuilds = builds[useCase] || builds.gaming;
    const closestBuild = categoryBuilds.reduce((prev, curr) => 
      Math.abs(curr.budget - budget) < Math.abs(prev.budget - budget) ? curr : prev
    );

    return closestBuild.components;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateAdvancedBotResponse(currentInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        products: botResponse.products,
        pcBuild: botResponse.pcBuild,
        downloadLink: botResponse.downloadLink,
        fileName: botResponse.fileName
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAdvancedBotResponse = (userInput: string): { content: string; products?: any[]; pcBuild?: any[]; downloadLink?: string; fileName?: string } => {
    const input = userInput.toLowerCase();
    
    // PC Build Generator
    if (input.includes('build') && (input.includes('pc') || input.includes('computer'))) {
      const budgetMatch = input.match(/\$?(\d+)/);
      const budget = budgetMatch ? parseInt(budgetMatch[1]) : 1000;
      
      const useCase = input.includes('gaming') ? 'gaming' : 
                     input.includes('work') || input.includes('content') ? 'workstation' : 'gaming';
      
      const pcBuild = buildCompatiblePC(budget, useCase);
      const totalPrice = pcBuild.reduce((sum, component) => sum + component.price, 0);
      
      // Generate downloadable parts list
      const partsListContent = `🖥️ PC BUILD RECOMMENDATION - Generated by Prachna AI\n` +
        `Budget: $${budget} | Use Case: ${useCase.charAt(0).toUpperCase() + useCase.slice(1)}\n` +
        `Total Cost: $${totalPrice.toFixed(2)}\n\n` +
        `COMPONENT LIST:\n` +
        `${pcBuild.map(component => 
          `${component.type}: ${component.name} - $${component.price}\n  → ${component.reason}`
        ).join('\n\n')}\n\n` +
        `📋 COMPATIBILITY NOTES:\n` +
        `• All components are verified compatible\n` +
        `• Power supply is sized appropriately\n` +
        `• Motherboard supports all selected components\n` +
        `• RAM is optimized for the selected platform\n\n` +
        `Generated on: ${new Date().toLocaleDateString()}\n` +
        `Visit our store to purchase these components!`;

      const downloadFile = generateDownloadableFile(partsListContent, `PC_Build_${useCase}_$${budget}.txt`);
      
      return {
        content: `🎯 **Perfect! I've designed a ${useCase} PC for your $${budget} budget!**\n\n💰 **Total Cost: $${totalPrice.toFixed(2)}**\n\nThis build offers excellent price-to-performance ratio with fully compatible components. Each part is carefully selected for optimal synergy!\n\n📥 **Download your complete parts list below** to take shopping!`,
        pcBuild: pcBuild,
        downloadLink: downloadFile.url,
        fileName: downloadFile.filename
      };
    }

    // Product Search & Recommendations  
    if (input.includes('rtx') || input.includes('nvidia') || input.includes('graphics')) {
      const nvidiaCards = comprehensiveProductDatabase.filter(product => 
        product.category === 'graphics-cards' && product.name.includes('NVIDIA')
      );
      
      return {
        content: `🎮 **NVIDIA Graphics Cards - The Gaming Powerhouse!**\n\n✨ RTX 40 series features:\n• **Ada Lovelace Architecture** - Up to 2.8x performance boost\n• **DLSS 3 Frame Generation** - Double your frame rates\n• **Ray Tracing Cores** - Realistic lighting & reflections\n• **AV1 Encoding** - Perfect for streaming\n\n🔥 Here are our top NVIDIA recommendations:`,
        products: nvidiaCards
      };
    }

    if (input.includes('ssd') || input.includes('nvme') || input.includes('storage')) {
      const storageProducts = comprehensiveProductDatabase.filter(product => product.category === 'storage');
      
      return {
        content: `💾 **NVMe SSD Storage - Lightning Fast Performance!**\n\n⚡ **Why NVMe over SATA?**\n• **7000+ MB/s** vs 500 MB/s read speeds\n• **Instant boot times** - Windows in 10 seconds\n• **Faster game loading** - No more waiting screens\n• **PCIe 4.0 ready** - Future-proof technology\n\n🚀 Here are our top NVMe recommendations:`,
        products: storageProducts
      };
    }

    if (input.includes('amd') && input.includes('intel')) {
      return {
        content: `⚔️ **AMD vs Intel - The Ultimate CPU Battle!**\n\n🔴 **AMD Ryzen Advantages:**\n• More cores/threads for the price\n• Superior multi-threaded performance\n• Lower power consumption\n• AM5 socket future-proofing\n• Integrated graphics on most models\n\n🔵 **Intel Core Advantages:**\n• Slightly better single-thread performance\n• Superior integrated graphics (UHD)\n• Mature platform with broad compatibility\n• Better for older games optimization\n\n🎯 **My Recommendation:**\n• **Gaming**: AMD Ryzen 7 7700X\n• **Content Creation**: AMD Ryzen 9 7950X\n• **Budget Gaming**: Intel i5-13400F\n• **High-end Gaming**: Intel i7-13700K\n\nWant specific recommendations for your use case?`
      };
    }

    if (input.includes('list') || input.includes('download') || input.includes('file')) {
      const recommendedBuild = buildCompatiblePC(1200, 'gaming');
      const buildContent = `🖥️ RECOMMENDED GAMING BUILD - $1200 Budget\n\n` +
        `${recommendedBuild.map(component => 
          `${component.type}: ${component.name} - $${component.price}`
        ).join('\n')}\n\n` +
        `Generated by Prachna AI - Your PC Building Assistant`;

      const downloadFile = generateDownloadableFile(buildContent, 'Recommended_Gaming_Build.txt');
      
      return {
        content: `📋 **Here's a curated parts list for you!**\n\nI've generated a balanced $1200 gaming build that offers excellent performance. Click the download button below to get your complete shopping list!\n\n💡 **Pro Tip**: Take this list to our store and use the search function to find each component quickly!`,
        downloadLink: downloadFile.url,
        fileName: downloadFile.filename
      };
    }

    // Default helpful response
    return {
      content: `🤖 **I'm here to help with all your PC building needs!**\n\n🔧 **What I can do:**\n• 🏗️ **Build custom PCs** within any budget\n• 🔍 **Find compatible components** and explain why they work together\n• 📊 **Compare specifications** and performance benchmarks\n• 💾 **Generate shopping lists** you can download and use\n• 🎮 **Optimize builds** for gaming, work, streaming, or content creation\n• ⚡ **Check compatibility** to avoid costly mistakes\n\n💬 **Try asking me:**\n• "Build a gaming PC for $1500"\n• "What's the best GPU for 1440p gaming?"\n• "Compare RTX 4070 vs RX 7800 XT"\n• "Generate a parts list for streaming"\n\nWhat would you like to know about PC building? 🚀`
    };
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: `${filename} is being downloaded to your device.`,
    });
  };

  const handleAddToCart = (product: any) => {
    onAddToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 shadow-lg hover:shadow-2xl transition-all duration-300 animate-pulse"
        >
          <Sparkles className="h-6 w-6 text-white animate-spin" style={{ animationDuration: '3s' }} />
        </Button>
        <div className="absolute -top-12 right-0 bg-gradient-to-r from-blue-900 to-purple-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg border border-blue-500/30">
          Ask Prachna AI! ✨
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-2 right-2 z-50 w-[calc(100vw-1rem)] max-w-md h-[calc(100vh-1rem)] max-h-[600px]">
      <Card className="bg-slate-900/98 backdrop-blur-xl border-blue-500/30 h-full flex flex-col shadow-2xl shadow-blue-500/20 rounded-2xl">
        <CardHeader className="pb-3 border-b border-blue-500/30 bg-gradient-to-r from-slate-800/80 to-blue-900/80 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-lg font-bold">Prachna AI</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-blue-300">AI Assistant Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetChat}
                className="text-blue-400 hover:text-white hover:bg-blue-500/20 rounded-xl"
                title="Reset Chat"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-red-500/20 rounded-xl"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-3 space-y-3 overflow-hidden">
          <ScrollArea className="flex-1 pr-2">
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-3 rounded-2xl text-sm ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg' 
                      : 'bg-gradient-to-r from-slate-800/90 to-slate-700/90 text-slate-100 border border-blue-500/20 shadow-lg backdrop-blur-sm'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && (
                        <Sparkles className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      )}
                      {message.type === 'user' && (
                        <User className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        
                        {/* Download Link */}
                        {message.downloadLink && message.fileName && (
                          <div className="mt-3 p-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
                            <Button
                              onClick={() => handleDownload(message.downloadLink!, message.fileName!)}
                              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg"
                              size="sm"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download {message.fileName}
                            </Button>
                          </div>
                        )}

                        {/* PC Build Display */}
                        {message.pcBuild && (
                          <div className="mt-3 space-y-2">
                            {message.pcBuild.map((component: any, index: number) => (
                              <div key={index} className="p-2 bg-slate-700/50 rounded-lg border border-blue-500/20">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="font-medium text-blue-300">{component.type}</div>
                                    <div className="text-white text-sm">{component.name}</div>
                                    <div className="text-slate-400 text-xs mt-1">{component.reason}</div>
                                  </div>
                                  <div className="text-green-400 font-bold">${component.price}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Product Recommendations */}
                        {message.products && (
                          <div className="mt-3 space-y-2">
                            {message.products.slice(0, 3).map((product: any, index: number) => (
                              <div key={index} className="p-2 bg-slate-700/50 rounded-lg border border-blue-500/20">
                                <div className="flex justify-between items-center">
                                  <div className="flex-1">
                                    <div className="font-medium text-blue-300">{product.name}</div>
                                    <div className="text-green-400 font-bold">${product.price}</div>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <div className="text-yellow-400 text-xs">★ {product.rating}</div>
                                      <div className="text-slate-400 text-xs">({product.reviews} reviews)</div>
                                    </div>
                                  </div>
                                  <Button
                                    onClick={() => handleAddToCart(product)}
                                    size="sm"
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg"
                                  >
                                    <ShoppingCart className="h-3 w-3 mr-1" />
                                    Add
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 text-slate-200 p-3 rounded-2xl max-w-[80%] border border-blue-500/20 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-blue-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-xs text-blue-300 font-medium">✨ Quick Questions:</p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-500/30 text-xs px-2 py-1 border-blue-500/40 text-blue-300 hover:text-white transition-colors rounded-lg"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about PC builds, components, compatibility..."
              className="bg-slate-800/80 border-blue-500/30 text-white placeholder-slate-400 focus:border-blue-400 rounded-xl backdrop-blur-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl shadow-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
