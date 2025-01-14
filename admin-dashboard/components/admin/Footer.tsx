import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-12">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-6">
        {/* Footer Left */}
        <div className="text-sm mb-4 sm:mb-0">
          <p>&copy; {new Date().getFullYear()} Smart Order Dashboard. All rights reserved.</p>
        </div>
        
        {/* Footer center */}
        <div className="text-sm mb-4 sm:mb-0">
          <p>Version 1.0.0</p>
        </div>

        {/* Footer Right */}
        <div className="flex space-x-6">
          <a href="#" className="text-sm hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="text-sm hover:text-gray-400">Terms of Service</a>
          <a href="#" className="text-sm hover:text-gray-400">Help</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
