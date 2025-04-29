
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-startupBlue-500 to-startupPurple-500 p-2 rounded-md">
                <span className="text-white font-bold text-xl">SB</span>
              </div>
              <span className="text-xl font-bold">StartupBridge</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Connecting entrepreneurs and businesses to create successful ventures.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-startupBlue-600">Home</Link></li>
              <li><Link to="/buy" className="text-gray-600 hover:text-startupBlue-600">Buy a Business</Link></li>
              <li><Link to="/sell" className="text-gray-600 hover:text-startupBlue-600">Sell a Business</Link></li>
              <li><Link to="/fulfill-need" className="text-gray-600 hover:text-startupBlue-600">Fulfill a Need</Link></li>
              <li><Link to="/store" className="text-gray-600 hover:text-startupBlue-600">Store</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-startupBlue-600">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-startupBlue-600">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-startupBlue-600">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-startupBlue-600">Success Stories</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@startupbridge.com</li>
              <li className="text-gray-600">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-600">Address: 123 Startup Street, San Francisco, CA 94103</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} StartupBridge. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-startupBlue-600">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-startupBlue-600">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-startupBlue-600">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
