import React from 'react';
import { User, Bell, Settings, Search } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  currentUser: UserType;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onMenuClick }) => {
  const getRoleTitle = () => {
    switch (currentUser.role) {
      case 'admin': return 'System Administrator';
      case 'president': return 'Club President';
      case 'faculty': return 'Faculty Coordinator';
      default: return 'User';
    }
  };

  const getRoleGradient = () => {
    switch (currentUser.role) {
      case 'admin': return 'from-red-500 to-pink-500';
      case 'president': return 'from-blue-500 to-violet-500';
      case 'faculty': return 'from-violet-500 to-purple-500';
      default: return 'from-violet-500 to-purple-500';
    }
  };

  return (
    <header className="bg-black/30 backdrop-blur-xl border-b border-violet-500/20 px-4 sm:px-6 md:px-8 py-4 md:ml-64 sticky top-0 z-20 flex items-center">
      <button className="md:hidden mr-4 text-white text-2xl" onClick={onMenuClick}>
        <span className="sr-only">Open sidebar</span>
        &#9776;
      </button>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <img 
                src="/image.png" 
                alt="VIT Chennai Logo" 
                className="h-12 w-auto"
              />
              <div className="hidden md:block">
                <h2 className="text-xl font-bold gradient-text">
                  VIT Student Welfare Committee
                </h2>
                <p className="text-sm text-white/70">Club Information Management Portal</p>
              </div>
            </div>
            
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <input
                type="text"
                placeholder="Search anything..."
                className="input-field pl-10 pr-4 py-2 w-full max-w-xs"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-white/70 hover:text-white hover:bg-black/30 rounded-xl transition-all duration-300 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse"></span>
            </button>
            
            <button className="p-2 text-white/70 hover:text-white hover:bg-black/30 rounded-xl transition-all duration-300">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;