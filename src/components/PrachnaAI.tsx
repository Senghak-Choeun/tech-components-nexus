
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, User, Zap, X, Sparkles, ShoppingCart, Search, Cpu, Monitor, HardDrive } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  products?: any[];
  pcBuild?: any[];
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
      content: "Hello! I'm Prachna, your intelligent PC building assistant. I can help you build a complete PC within your budget, recommend compatible components, and find the best deals. What's your budget and what will you use the PC for?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Build gaming PC under $1500",
    "Show me RTX 4080 cards",
    "Compatible motherboard for Ryzen 9",
    "Budget workstation build $2000",
    "Best value graphics cards",
    "Complete streaming setup",
  ];

  const nvidiaProducts = [
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
      name: 'NVIDIA GeForce RTX 4060 Ti',
      category: 'graphics-cards',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
      rating: 4.6,
      reviews: 356,
      specs: ['16GB GDDR6', '2.54GHz Boost', '165W TDP', 'Ada Lovelace'],
      inStock: true,
      featured: false
    },
    {
      id: 'nvidia-6',
      name: 'NVIDIA GeForce RTX 4060',
      category: 'graphics-cards',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
      rating: 4.5,
      reviews: 298,
      specs: ['8GB GDDR6', '2.46GHz Boost', '115W TDP', 'Ada Lovelace'],
      inStock: true,
      featured: false
    }
  ];

  const buildCompatiblePC = (budget: number, useCase: string) => {
    const builds: { [key: string]: any[] } = {
      gaming: [
        {
          budget: 800,
          components: [
            { type: 'CPU', name: 'AMD Ryzen 5 7600', price: 229.99 },
            { type: 'GPU', name: 'NVIDIA RTX 4060', price: 299.99 },
            { type: 'Motherboard', name: 'MSI B650M Pro', price: 129.99 },
            { type: 'RAM', name: '16GB DDR5-5600', price: 89.99 },
            { type: 'Storage', name: '1TB NVMe SSD', price: 79.99 },
            { type: 'PSU', name: '650W 80+ Gold', price: 89.99 }
          ]
        },
        {
          budget: 1200,
          components: [
            { type: 'CPU', name: 'AMD Ryzen 7 7700X', price: 329.99 },
            { type: 'GPU', name: 'NVIDIA RTX 4070', price: 599.99 },
            { type: 'Motherboard', name: 'ASUS B650-Plus', price: 179.99 },
            { type: 'RAM', name: '32GB DDR5-5600', price: 149.99 },
            { type: 'Storage', name: '2TB NVMe SSD', price: 149.99 },
            { type: 'PSU', name: '750W 80+ Gold', price: 119.99 }
          ]
        },
        {
          budget: 2000,
          components: [
            { type: 'CPU', name: 'AMD Ryzen 9 7900X', price: 499.99 },
            { type: 'GPU', name: 'NVIDIA RTX 4080 SUPER', price: 999.99 },
            { type: 'Motherboard', name: 'ASUS X670E-E', price: 299.99 },
            { type: 'RAM', name: '32GB DDR5-6000', price: 199.99 },
            { type: 'Storage', name: '2TB NVMe SSD', price: 179.99 },
            { type: 'PSU', name: '850W 80+ Gold', price: 159.99 }
          ]
        }
      ]
    };

    const gamingBuilds = builds.gaming;
    const closestBuild = gamingBuilds.reduce((prev, curr) => 
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
      const botResponse = generateEnhancedBotResponse(currentInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        products: botResponse.products,
        pcBuild: botResponse.pcBuild
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateEnhancedBotResponse = (userInput: string): { content: string; products?: any[]; pcBuild?: any[] } => {
    const input = userInput.toLowerCase();
    
    // PC Building Algorithm
    if (input.includes('build') && (input.includes('pc') || input.includes('computer'))) {
      const budgetMatch = input.match(/\$?(\d+)/);
      const budget = budgetMatch ? parseInt(budgetMatch[1]) : 1000;
      
      const pcBuild = buildCompatiblePC(budget, 'gaming');
      const totalPrice = pcBuild.reduce((sum, component) => sum + component.price, 0);
      
      return {
        content: `I've designed a compatible PC build for your $${budget} budget! Here's a balanced configuration totaling $${totalPrice.toFixed(2)}:`,
        pcBuild: pcBuild
      };
    }

    // NVIDIA specific searches
    if (input.includes('nvidia') || input.includes('rtx') || input.includes('geforce')) {
      return {
        content: "Here are the latest NVIDIA GeForce RTX graphics cards! These feature the latest Ada Lovelace architecture with DLSS 3, ray tracing, and excellent performance:",
        products: nvidiaProducts
      };
    }

    // Budget-based recommendations
    if (input.includes('budget') || input.includes('under')) {
      const budgetMatch = input.match(/\$?(\d+)/);
      if (budgetMatch) {
        const budget = parseInt(budgetMatch[1]);
        const affordableGPUs = nvidiaProducts.filter(gpu => gpu.price <= budget);
        
        return {
          content: `Here are NVIDIA graphics cards within your $${budget} budget:`,
          products: affordableGPUs
        };
      }
    }

    return {
      content: "I can help you build the perfect PC! Tell me your budget and what you'll use it for (gaming, work, streaming, etc.), and I'll recommend compatible components with the best price-to-performance ratio."
    };
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
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
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </Button>
        <div className="absolute -top-12 sm:-top-16 right-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap shadow-lg">
          Ask Prachna! ✨
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-md h-[calc(100vh-2rem)] max-h-[600px] sm:w-96 sm:h-[600px]">
      <Card className="bg-slate-900/95 backdrop-blur-md border-emerald-500/30 h-full flex flex-col shadow-2xl shadow-emerald-500/20">
        <CardHeader className="pb-3 border-b border-emerald-500/30 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-lg">
                <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-lg sm:text-xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Prachna AI
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs text-slate-300">PC Build Expert</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-3 sm:p-4 space-y-3 sm:space-y-4">
          <ScrollArea className="flex-1 pr-2">
            <div className="space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2 sm:space-y-3">
                  <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] p-2 sm:p-3 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                          : 'bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200 border border-emerald-500/20'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' && (
                          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                        )}
                        {message.type === 'user' && (
                          <User className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 text-white flex-shrink-0" />
                        )}
                        <p className="text-xs sm:text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>

                  {/* PC Build Components */}
                  {message.pcBuild && message.pcBuild.length > 0 && (
                    <div className="space-y-2">
                      <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 rounded-lg p-3">
                        <h4 className="font-semibold text-emerald-400 text-sm mb-2 flex items-center">
                          <Cpu className="h-4 w-4 mr-2" />
                          Complete PC Build
                        </h4>
                        <div className="grid gap-2">
                          {message.pcBuild.map((component, index) => (
                            <div key={index} className="flex justify-between items-center bg-slate-800/50 rounded p-2">
                              <div>
                                <span className="text-emerald-400 text-xs font-medium">{component.type}</span>
                                <p className="text-white text-xs">{component.name}</p>
                              </div>
                              <span className="text-emerald-400 font-semibold text-xs">${component.price}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-emerald-500/30">
                          <div className="flex justify-between items-center">
                            <span className="text-emerald-400 font-semibold text-sm">Total:</span>
                            <span className="text-emerald-400 font-bold text-sm">
                              ${message.pcBuild.reduce((sum, comp) => sum + comp.price, 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Product Cards */}
                  {message.products && message.products.length > 0 && (
                    <div className="space-y-2">
                      {message.products.map((product) => (
                        <div key={product.id} className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-emerald-500/20 rounded-lg p-2 sm:p-3">
                          <div className="flex justify-between items-start mb-1 sm:mb-2">
                            <h4 className="font-semibold text-white text-xs sm:text-sm">{product.name}</h4>
                            <span className="text-base sm:text-lg font-bold text-emerald-400">${product.price}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-emerald-400' : 'text-slate-600'}`}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-slate-400">({product.reviews})</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {product.specs.slice(0, 2).map((spec: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs px-1 py-0 border-emerald-500/30 text-emerald-300">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex space-x-1 sm:space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(product)}
                              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-xs flex-1"
                            >
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              Add to Cart
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onSearchProduct(product.name)}
                              className="border-emerald-600 text-emerald-300 text-xs"
                            >
                              <Search className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200 p-2 sm:p-3 rounded-lg max-w-[80%] border border-emerald-500/20">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {messages.length === 1 && (
            <div className="space-y-2">
              <p className="text-xs text-slate-400">Quick questions:</p>
              <div className="grid grid-cols-1 gap-1">
                {quickQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-emerald-500/20 text-xs p-2 border-emerald-500/30 text-slate-300 hover:text-white transition-colors justify-start"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about PC builds, budgets..."
              className="bg-slate-800 border-emerald-500/30 text-white placeholder-slate-400 focus:border-emerald-400 text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-2 sm:px-3"
            >
              <Send className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
