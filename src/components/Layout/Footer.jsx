import React from "react";
import { HeartIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <HeartIcon className="w-4 h-4 text-red-500" />
            <span>for DSA learners</span>
          </div>
          <div className="mt-2 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
            © 2024 DSA Sheet. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
