
import { Cpu, Github, Twitter, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  const footerLinks = {
    products: [
      'Processors',
      'Graphics Cards',
      'Motherboards',
      'Memory',
      'Storage',
      'Power Supplies'
    ],
    support: [
      'Help Center',
      'Contact Us',
      'Shipping Info',
      'Returns',
      'Warranty',
      'Track Order'
    ],
    company: [
      'About Us',
      'Careers',
      'Press',
      'Blog',
      'Partnerships',
      'Affiliates'
    ]
  };

  return (
    <footer className="bg-slate-900/95 border-t border-slate-700/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  TechComponents
                </h3>
                <p className="text-xs text-slate-400">AI-Powered Tech Store</p>
              </div>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Your trusted source for premium computer components with AI-powered recommendations 
              and expert technical support. Build your dream setup with confidence.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-400 hover:text-white hover:border-blue-400">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-400 hover:text-white hover:border-blue-400">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-400 hover:text-white hover:border-blue-400">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700/50" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-slate-400 text-sm">
            © 2024 TechComponents. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-blue-400" />
              <span className="text-slate-300 text-sm">24/7 Support: 1-800-TECH-HELP</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-cyan-400" />
              <span className="text-slate-300 text-sm">support@techcomponents.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
