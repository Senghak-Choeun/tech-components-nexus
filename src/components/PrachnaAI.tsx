import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, User, X, Sparkles, ShoppingCart, Search, Cpu } from 'lucide-react';
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
      content: "Hello! I'm Prachna, your advanced PC building AI assistant with deep knowledge of all computer components. I can help you build complete PCs within your budget, recommend compatible components, explain technical specifications, and find the best deals. What's your budget and what will you use the PC for?",
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
    "Best NVMe SSD for gaming",
    "Complete streaming setup",
    "DDR5 vs DDR4 comparison",
    "PSU calculator for RTX 4090"
  ];

  const comprehensiveProductDatabase = [
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
    }
  ];

  const buildCompatiblePC = (budget: number, useCase: string) => {
    const builds: { [key: string]: any[] } = {
      gaming: [
        {
          budget: 800,
          components: [
            { type: 'CPU', name: 'AMD Ryzen 5 7600', price: 229.99, reason: 'Excellent gaming performance' },
            { type: 'GPU', name: 'NVIDIA RTX 4060', price: 299.99, reason: '1080p gaming champion' },
            { type: 'Motherboard', name: 'MSI B650M Pro', price: 129.99, reason: 'Solid AM5 foundation' },
            { type: 'RAM', name: '16GB DDR5-5600', price: 89.99, reason: 'Sweet spot for gaming' },
            { type: 'Storage', name: '1TB NVMe SSD', price: 79.99, reason: 'Fast game loading' },
            { type: 'PSU', name: '650W 80+ Gold', price: 89.99, reason: 'Efficient and reliable' }
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
        pcBuild: botResponse.pcBuild
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAdvancedBotResponse = (userInput: string): { content: string; products?: any[]; pcBuild?: any[] } => {
    const input = userInput.toLowerCase();
    
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

    if (input.includes('ssd') || input.includes('nvme') || input.includes('storage')) {
      return {
        content: "Here are the best NVMe SSDs for performance! NVMe drives offer significantly faster speeds than SATA SSDs, with PCIe 4.0 drives reaching 7000+ MB/s read speeds:",
        products: comprehensiveProductDatabase.filter(product => product.category === 'storage')
      };
    }

    if (input.includes('ram') || input.includes('memory')) {
      return {
        content: "For modern systems, I recommend DDR5 for AM5/LGA1700 platforms or DDR4 for older systems. DDR5-5600 is the sweet spot for price/performance. 16GB is minimum for gaming, 32GB for content creation."
      };
    }

    if (input.includes('rtx') || input.includes('radeon') || input.includes('graphics')) {
      return {
        content: "Here are flagship graphics cards! RTX 4080 SUPER excels in ray tracing and DLSS, while RX 7900 XTX offers more VRAM and excellent rasterization performance:",
        products: comprehensiveProductDatabase.filter(product => product.category === 'graphics-cards')
      };
    }

    return {
      content: "I can help with all PC components! Ask me about CPUs (Intel vs AMD), GPUs (NVIDIA vs AMD), RAM (DDR4 vs DDR5), storage (NVMe vs SATA), motherboards, PSUs, cooling, or complete PC builds. What would you like to know?"
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
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Sparkles className="h-5 w-5 text-white" />
        </Button>
        <div className="absolute -top-10 right-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2 py-1 rounded-lg text-xs whitespace-nowrap shadow-lg">
          Ask Prachna! ✨
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-2 right-2 z-50 w-[calc(100vw-1rem)] max-w-md h-[calc(100vh-1rem)]">
      <Card className="bg-slate-900/95 backdrop-blur-md border-emerald-500/30 h-full flex flex-col shadow-2xl shadow-emerald-500/20">
        <CardHeader className="pb-2 border-b border-emerald-500/30 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-white text-lg">Prachna AI</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-2 space-y-2">
          <ScrollArea className="flex-1">
            <div className="space-y-2">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2 rounded-lg text-sm ${message.type === 'user' ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white' : 'bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200'}`}>
                    <div className="flex items-start space-x-1">
                      {message.type === 'bot' && <Sparkles className="h-3 w-3 text-emerald-400" />}
                      {message.type === 'user' && <User className="h-3 w-3 text-white" />}
                      <p>{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200 p-2 rounded-lg max-w-[80%]">
                    <div className="flex items-center space-x-1">
                      <Sparkles className="h-3 w-3 text-emerald-400" />
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex space-x-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about PC builds, specs..."
              className="bg-slate-800 border-emerald-500/30 text-white placeholder-slate-400 focus:border-emerald-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
