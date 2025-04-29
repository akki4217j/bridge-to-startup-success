
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-startupBlue-500 to-startupPurple-500 p-2 rounded-md">
              <span className="text-white font-bold text-xl">SB</span>
            </div>
            <span className="text-xl font-bold">StartupBridge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-startupBlue-600 transition-colors duration-300">Home</Link>
            <Link to="/buy" className="px-3 py-2 text-gray-700 hover:text-startupBlue-600 transition-colors duration-300">Buy</Link>
            <Link to="/sell" className="px-3 py-2 text-gray-700 hover:text-startupBlue-600 transition-colors duration-300">Sell</Link>
            <Link to="/fulfill-need" className="px-3 py-2 text-gray-700 hover:text-startupBlue-600 transition-colors duration-300">Fulfill a Need</Link>
            <Link to="/register" className="px-3 py-2 text-gray-700 hover:text-startupBlue-600 transition-colors duration-300">Register</Link>
            <Link to="/store" className="px-3 py-2 text-gray-700 hover:text-startupBlue-600 transition-colors duration-300">Store</Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/register">
              <Button className="bg-gradient-to-r from-startupBlue-500 to-startupPurple-500 text-white">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              className="text-gray-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              <Link to="/" onClick={toggleNavbar} className="px-3 py-2 text-gray-700 hover:text-startupBlue-600 transition-colors duration-300">Home</Link>
              <Link to="/buy" onClick={toggleNavbar} className="px-3 py-2 text-gray-700 hover:text-startupBlue-600 transition-colors duration-300">Buy</Link>
              <Link to="/sell" onClick={toggleNavbar} className="px-3 py-2 text-gray-700 hover:text-startupBlue-600 transition-colors duration-300">Sell</Link>
              <Link to="/fulfill-need" onClick={toggleNavbar} className="px-3 py-2 text-gray-700 hover:text-startupBlue-600 transition-colors duration-300">Fulfill a Need</Link>
              <Link to="/register" onClick={toggleNavbar} className="px-3 py-2 text-gray-700 hover:text-startupBlue-600 transition-colors duration-300">Register</Link>
              <Link to="/store" onClick={toggleNavbar} className="px-3 py-2 text-gray-700 hover:text-startupBlue-600 transition-colors duration-300">Store</Link>
              <Link to="/register" onClick={toggleNavbar}>
                <Button className="w-full bg-gradient-to-r from-startupBlue-500 to-startupPurple-500 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
