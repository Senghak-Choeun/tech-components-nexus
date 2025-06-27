
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, User, Zap, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI tech assistant. I can help you find compatible components, suggest builds, and answer technical questions. What are you looking to build today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Build a gaming PC for $1500",
    "What GPU pairs with Ryzen 7 7700X?",
    "Best motherboard for Intel 13th gen?",
    "Check component compatibility",
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
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('gaming') && input.includes('pc')) {
      return "For a gaming PC, I'd recommend starting with a Ryzen 7 7700X or Intel i5-13600K paired with an RTX 4070. This combo offers excellent 1440p gaming performance. Would you like me to suggest a complete build with compatible motherboard, RAM, and storage?";
    }
    
    if (input.includes('gpu') || input.includes('graphics')) {
      return "For the Ryzen 7 7700X, great GPU pairings include RTX 4070 (best value), RTX 4070 Ti (high performance), or RTX 4060 Ti (budget option). All will work perfectly without bottlenecking. What's your target resolution and budget?";
    }
    
    if (input.includes('motherboard')) {
      return "For Intel 13th gen, I recommend B760 boards for budget builds (MSI Pro B760M-A), or Z790 for overclocking (ASUS ROG Strix Z790-E). Make sure to check DDR4 vs DDR5 compatibility based on your memory choice.";
    }
    
    if (input.includes('compatibility')) {
      return "I can check compatibility! Please share your component list or tell me what parts you're considering. I'll verify socket compatibility, power requirements, RAM support, and identify any potential issues.";
    }
    
    return "That's a great question! Based on current market trends and compatibility data, I'd be happy to provide specific recommendations. Could you share more details about your budget, intended use case, and any components you're already considering?";
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Bot className="h-8 w-8" />
        </Button>
        <div className="absolute -top-12 right-0 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap animate-pulse">
          Ask me anything! 💬
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] max-w-[calc(100vw-2rem)]">
      <Card className="bg-slate-900/95 backdrop-blur-md border-slate-700 h-full flex flex-col shadow-2xl">
        <CardHeader className="pb-3 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">AI Tech Assistant</CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-slate-400">Online</span>
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
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && (
                        <Bot className="h-4 w-4 mt-0.5 text-blue-400 flex-shrink-0" />
                      )}
                      {message.type === 'user' && (
                        <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />
                      )}
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-200 p-3 rounded-lg max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
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
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-500/20 text-xs p-1 border-slate-600 text-slate-300 hover:text-white transition-colors"
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
              placeholder="Ask about components, builds, compatibility..."
              className="bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
