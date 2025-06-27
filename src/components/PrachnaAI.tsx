
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, User, Zap, X, Sparkles, ShoppingCart, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  products?: any[];
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
      content: "Hello! I'm Prachna, your intelligent tech shopping assistant. I can help you find the perfect components, suggest compatible builds, compare products, and even add items directly to your cart. What are you looking to build today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Show me gaming processors",
    "Best RTX 4070 graphics cards",
    "Budget motherboard options",
    "High-speed SSD recommendations",
    "Complete gaming build under $2000",
    "Compatible RAM for Ryzen 9",
  ];

  const productDatabase = [
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
      id: 'gpu-1',
      name: 'NVIDIA GeForce RTX 4070',
      category: 'graphics-cards',
      price: 599.99,
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 89,
      specs: ['12GB GDDR6X', '2.5GHz Boost Clock', 'Ray Tracing'],
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
      id: 'mb-1',
      name: 'MSI Pro B760M-A WiFi',
      category: 'motherboards',
      price: 179.99,
      image: '/placeholder.svg',
      rating: 4.5,
      reviews: 67,
      specs: ['Intel B760', 'DDR5 Support', 'WiFi 6E'],
      inStock: true,
      featured: false
    }
  ];

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

    // Simulate AI response with enhanced knowledge
    setTimeout(() => {
      const botResponse = generateEnhancedBotResponse(currentInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        products: botResponse.products
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateEnhancedBotResponse = (userInput: string): { content: string; products?: any[] } => {
    const input = userInput.toLowerCase();
    
    // Product search and recommendations
    if (input.includes('show') || input.includes('find') || input.includes('rtx') || input.includes('ryzen')) {
      const matchedProducts = productDatabase.filter(product => 
        input.includes(product.name.toLowerCase()) ||
        input.includes(product.category.replace('-', ' ')) ||
        product.specs.some(spec => spec.toLowerCase().includes(input))
      );

      if (matchedProducts.length > 0) {
        return {
          content: `I found ${matchedProducts.length} products that match your search! Here are my top recommendations. You can add any of these directly to your cart:`,
          products: matchedProducts
        };
      }
    }

    // Category-based responses
    if (input.includes('gaming') && (input.includes('pc') || input.includes('build'))) {
      return {
        content: "For a gaming PC, I recommend starting with a powerful processor like the Ryzen 9 7950X paired with an RTX 4070 or 4070 Ti. This combination offers excellent performance for 1440p gaming. I can show you compatible motherboards and help you build a complete system. What's your budget range?",
        products: productDatabase.filter(p => p.category === 'processors' || p.category === 'graphics-cards')
      };
    }
    
    if (input.includes('processor') || input.includes('cpu')) {
      return {
        content: "Here are my top processor recommendations! The Ryzen 9 7950X is perfect for high-end gaming and productivity with 16 cores. Would you like me to suggest compatible motherboards and RAM?",
        products: productDatabase.filter(p => p.category === 'processors')
      };
    }

    if (input.includes('graphics') || input.includes('gpu')) {
      return {
        content: "Great choice! Here are excellent graphics card options. The RTX 4070 offers fantastic 1440p performance, while the RTX 4070 Ti provides even more power for 4K gaming. Both support DLSS 3 and ray tracing.",
        products: productDatabase.filter(p => p.category === 'graphics-cards')
      };
    }

    if (input.includes('motherboard')) {
      return {
        content: "For motherboards, I recommend the MSI Pro B760M-A WiFi for Intel builds - it's budget-friendly with great features like WiFi 6E and DDR5 support. What processor are you planning to use?",
        products: productDatabase.filter(p => p.category === 'motherboards')
      };
    }

    // Budget-related queries
    if (input.includes('budget') || input.includes('cheap') || input.includes('under')) {
      return {
        content: "I can help you find great value components! What's your budget range and what type of system are you building? I'll recommend the best price-to-performance options."
      };
    }

    // Compatibility queries
    if (input.includes('compatible') || input.includes('work with')) {
      return {
        content: "I'd be happy to check compatibility! Please share your current components or what you're considering, and I'll verify socket compatibility, power requirements, and suggest any needed upgrades."
      };
    }

    return {
      content: "I'm here to help you find the perfect tech components! You can ask me about specific products, compatibility checks, build recommendations, or budget options. I can also search our catalog and add items directly to your cart. What would you like to know?"
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

  const handleSearchProduct = (productName: string) => {
    onSearchProduct(productName);
    toast({
      title: "Search Updated",
      description: `Showing results for "${productName}"`,
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <Sparkles className="h-8 w-8" />
        </Button>
        <div className="absolute -top-16 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap animate-bounce shadow-lg">
          Ask Prachna anything! ✨
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-w-[calc(100vw-2rem)]">
      <Card className="bg-slate-900/95 backdrop-blur-md border-purple-500/30 h-full flex flex-col shadow-2xl shadow-purple-500/20">
        <CardHeader className="pb-3 border-b border-purple-500/30 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-lg animate-pulse">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Prachna AI
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-slate-300">Smart Shopping Assistant</span>
                </div>
              </div>
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

        <CardContent className="flex-1 flex flex-col p-4 space-y-4">
          {/* Messages */}
          <ScrollArea className="flex-1 pr-3">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-3">
                  <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                          : 'bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200 border border-purple-500/20'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' && (
                          <Sparkles className="h-4 w-4 mt-0.5 text-purple-400 flex-shrink-0" />
                        )}
                        {message.type === 'user' && (
                          <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />
                        )}
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>

                  {/* Product Cards */}
                  {message.products && message.products.length > 0 && (
                    <div className="space-y-2">
                      {message.products.map((product) => (
                        <div key={product.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-white text-sm">{product.name}</h4>
                            <span className="text-lg font-bold text-green-400">${product.price}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-slate-600'}`}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-slate-400">({product.reviews})</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(product)}
                              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-xs"
                            >
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              Add to Cart
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSearchProduct(product.name)}
                              className="border-slate-600 text-slate-300 text-xs"
                            >
                              <Search className="h-3 w-3 mr-1" />
                              View
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
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200 p-3 rounded-lg max-w-[80%] border border-purple-500/20">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
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
              <p className="text-xs text-slate-400">Quick questions:</p>
              <div className="grid grid-cols-1 gap-1">
                {quickQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-purple-500/20 text-xs p-2 border-purple-500/30 text-slate-300 hover:text-white transition-colors justify-start"
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
              placeholder="Ask Prachna about products, builds, compatibility..."
              className="bg-slate-800 border-purple-500/30 text-white placeholder-slate-400 focus:border-purple-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
