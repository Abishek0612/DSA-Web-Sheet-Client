import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  BookOpenIcon,
  BarChart,
  UserIcon,
  CogIcon,
  LogOutIcon as LogoutIcon,
  MenuIcon,
  XIcon,
  SearchIcon,
  BellIcon,
  SparklesIcon,
  ShieldIcon,
} from "lucide-react";
import { logout } from "../../store/slices/authSlice";
import {
  markAsRead,
  markAllAsRead,
} from "../../store/slices/notificationSlice";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications, unreadCount } = useSelector(
    (state) => state.notifications
  );

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Topics", href: "/topics", icon: BookOpenIcon },
    { name: "Progress", href: "/progress", icon: BarChart },
    { name: "AI Research", href: "/ai-research", icon: SparklesIcon },
    ...(user?.role === "admin"
      ? [{ name: "Admin", href: "/admin/topics", icon: ShieldIcon }]
      : []),
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleNotificationClick = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
    setIsNotificationOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return "🎉";
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      default:
        return "🔔";
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DS</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                DSA Sheet
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <SearchIcon className="w-5 h-5" />
            </button>

            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
              >
                <BellIcon className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50 max-h-96 overflow-y-auto"
                  >
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Notifications {unreadCount > 0 && `(${unreadCount})`}
                        </h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                    </div>

                    {notifications.length > 0 ? (
                      <div className="py-1">
                        {notifications.slice(0, 10).map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() =>
                              handleNotificationClick(notification.id)
                            }
                            className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer transition-colors ${
                              !notification.read
                                ? "bg-blue-50 dark:bg-blue-900/10"
                                : ""
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                <span className="text-lg">
                                  {getNotificationIcon(notification.type)}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {formatTimeAgo(notification.timestamp)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}

                        {notifications.length > 10 && (
                          <div className="px-4 py-3 text-center border-t border-gray-200 dark:border-gray-700">
                            <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                              View all notifications
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <BellIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No notifications yet
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          We'll notify you when something important happens
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {user?.role === "admin" && (
              <div className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-medium rounded-full">
                Admin
              </div>
            )}

            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="text-left hidden lg:block">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name}
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50"
                  >
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <CogIcon className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin/topics"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <ShieldIcon className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogoutIcon className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Notifications */}
              <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {notifications.length > 0 ? (
                  <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`p-2 rounded text-xs cursor-pointer ${
                          !notification.read
                            ? "bg-blue-50 dark:bg-blue-900/10"
                            : "bg-gray-50 dark:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{getNotificationIcon(notification.type)}</span>
                          <span className="font-medium">
                            {notification.title}
                          </span>
                          {!notification.read && (
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          )}
                        </div>
                        <p className="mt-1 text-gray-600 dark:text-gray-400 line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                    ))}
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="w-full text-xs text-blue-600 dark:text-blue-400 py-1"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    No notifications
                  </p>
                )}
              </div>

              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                    {item.name === "Admin" && (
                      <span className="ml-auto px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs font-medium rounded-full">
                        Admin
                      </span>
                    )}
                  </Link>
                );
              })}
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              <Link
                to="/profile"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <UserIcon className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <CogIcon className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogoutIcon className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
