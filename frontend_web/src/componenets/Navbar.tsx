import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/course" className="text-2xl font-bold text-blue-600 dark:text-white">
             LearnSmart 
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/course" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Courses</a>
            <a href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Dashboard</a>
            <a href="/community" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Community</a>
            <a href="/support" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Support</a>

            {/* Profile Dropdown (Placeholder) */}
            <div className="relative">
              <button className="flex items-center space-x-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-3 space-y-2 bg-white dark:bg-gray-800">
          <a href="/course" className="block text-gray-700 dark:text-gray-300">Courses</a>
          <a href="/dashboard" className="block text-gray-700 dark:text-gray-300">Dashboard</a>
          <a href="/community" className="block text-gray-700 dark:text-gray-300">Community</a>
          <a href="/support" className="block text-gray-700 dark:text-gray-300">Support</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
