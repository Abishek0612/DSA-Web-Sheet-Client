import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon,
  BookOpenIcon,
  ChartBarIcon,
  SparklesIcon,
  UserIcon,
  CogIcon,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Topics", href: "/topics", icon: BookOpenIcon },
  { name: "Progress", href: "/progress", icon: ChartBarIcon },
  { name: "AI Research", href: "/ai-research", icon: SparklesIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
  { name: "Settings", href: "/settings", icon: CogIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={onClose}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      <motion.div
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed left-0 top-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-lg lg:shadow-none"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DS</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                DSA Sheet
              </span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
