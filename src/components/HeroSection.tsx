
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 opacity-50" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-full px-4 py-2 mb-6 border border-slate-700">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-slate-300">AI-Powered Component Selection</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Build Your Dream
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Tech Setup
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover premium computer components with AI-powered recommendations. 
            Build compatible systems with expert guidance and competitive prices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg">
              Explore Components
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg">
              AI Build Assistant
            </Button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <Cpu className="h-8 w-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Smart Compatibility</h3>
              <p className="text-slate-400 text-sm text-center">AI checks component compatibility automatically</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <Shield className="h-8 w-8 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Quality Guaranteed</h3>
              <p className="text-slate-400 text-sm text-center">Premium components with warranty protection</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <Zap className="h-8 w-8 text-yellow-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Expert Support</h3>
              <p className="text-slate-400 text-sm text-center">24/7 AI assistant for technical guidance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
