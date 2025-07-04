import React, { useState } from 'react';
import { User, ChevronDown } from 'lucide-react';
import { User as UserType } from '../types';

interface RoleSelectorProps {
  currentUser: UserType;
  onUserChange: (user: UserType) => void;
  users: UserType[];
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ currentUser, onUserChange, users }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'from-red-500 to-pink-500';
      case 'president': return 'from-blue-500 to-violet-500';
      case 'faculty': return 'from-violet-500 to-purple-500';
      default: return 'from-violet-500 to-purple-500';
    }
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'admin': return 'System Administrator';
      case 'president': return 'Club President';
      case 'faculty': return 'Faculty Coordinator';
      default: return 'User';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-4 flex items-center space-x-3 hover:bg-black/40 transition-all duration-300 min-w-[200px]"
        >
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getRoleColor(currentUser.role)} shadow-md`}>
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-semibold text-white">{currentUser.name}</p>
            <p className="text-xs text-white/70">{getRoleTitle(currentUser.role)}</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 right-0 bg-black/30 backdrop-blur-xl border border-violet-500/20 rounded-2xl py-2 min-w-[200px] animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 border-b border-violet-500/20">
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wide">Switch Role</p>
            </div>
            {users.map((user) => {
              const isActive = currentUser.id === user.id;
              
              return (
                <button
                  key={user.id}
                  onClick={() => {
                    onUserChange(user);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-black/30 transition-all duration-200 ${
                    isActive ? 'bg-black/20 border-l-4 border-violet-500' : ''
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getRoleColor(user.role)} shadow-md`}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-white/70">{getRoleTitle(user.role)}</p>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[-1]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default RoleSelector;