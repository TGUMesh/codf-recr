import React from 'react';
import { Home, Users, Plus, Settings, Calendar, CalendarPlus, Eye } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  currentUser: User;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, currentUser, isOpen = false, onClose }) => {
  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home }
    ];

    switch (currentUser.role) {
      case 'admin':
        return [
          ...baseItems,
          { id: 'clubs', label: 'Manage Clubs', icon: Users },
          { id: 'create', label: 'Create Club', icon: Plus },
          { id: 'events', label: 'Manage Events', icon: Calendar },
          { id: 'create-event', label: 'Create Event', icon: CalendarPlus },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      case 'president':
        return [
          ...baseItems,
          { id: 'members', label: 'Manage Members', icon: Users },
          { id: 'events', label: 'Club Events', icon: Calendar },
          { id: 'create-event', label: 'Create Event', icon: CalendarPlus }
        ];
      case 'faculty':
        return [
          ...baseItems,
          { id: 'clubs', label: 'View Club', icon: Eye },
          { id: 'events', label: 'Club Events', icon: Calendar },
          { id: 'members', label: 'View Members', icon: Users }
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  const getRoleGradient = () => {
    switch (currentUser.role) {
      case 'admin': return 'from-red-600/30 to-pink-600/30';
      case 'president': return 'from-blue-600/30 to-violet-600/30';
      case 'faculty': return 'from-violet-600/30 to-purple-600/30';
      default: return 'from-violet-600/30 to-purple-600/30';
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-screen fixed left-0 top-0 z-10 bg-black/40 backdrop-blur-xl border-r border-violet-500/20">
        <div className="p-6 border-b border-violet-500/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg border border-violet-400/50">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">CIMP</h1>
              <p className="text-xs text-white/70 mt-0.5 capitalize">{currentUser.role} Portal</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-8 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`nav-button ${activeView === item.id ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <div className={`bg-black/30 backdrop-blur-xl border border-violet-500/20 rounded-xl p-4 bg-gradient-to-r ${getRoleGradient()}`}>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center border border-violet-400/50">
                <span className="text-white font-semibold text-sm">
                  {currentUser.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{currentUser.name}</p>
                <p className="text-white/70 text-xs capitalize">{currentUser.role}</p>
              </div>
            </div>
            <p className="text-white/60 text-xs text-center mt-3 hidden md:block">
              VIT Student Welfare Committee
            </p>
          </div>
        </div>
      </div>
      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 h-full bg-black/90 backdrop-blur-xl border-r border-violet-500/20 relative transition-transform duration-300 transform translate-x-0">
            <div className="p-6 border-b border-violet-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg border border-violet-400/50">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">CIMP</h1>
                  <p className="text-xs text-white/70 mt-0.5 capitalize">{currentUser.role} Portal</p>
                </div>
              </div>
            </div>
            
            <nav className="mt-8 px-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`nav-button ${activeView === item.id ? 'active' : ''}`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="absolute bottom-6 left-4 right-4">
              <div className={`bg-black/30 backdrop-blur-xl border border-violet-500/20 rounded-xl p-4 bg-gradient-to-r ${getRoleGradient()}`}>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center border border-violet-400/50">
                    <span className="text-white font-semibold text-sm">
                      {currentUser.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{currentUser.name}</p>
                    <p className="text-white/70 text-xs capitalize">{currentUser.role}</p>
                  </div>
                </div>
                <p className="text-white/60 text-xs text-center mt-3 hidden md:block">
                  VIT Student Welfare Committee
                </p>
              </div>
            </div>
            {onClose && (
              <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl">&times;</button>
            )}
          </div>
          <div className="flex-1 bg-black/40" onClick={onClose} />
        </div>
      )}
    </>
  );
};

export default Sidebar;