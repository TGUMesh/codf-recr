import React from 'react';
import { Users, Trophy, Calendar, TrendingUp, CalendarDays, Plus, Settings } from 'lucide-react';
import { Club, Event } from '../types';

interface AdminDashboardProps {
  clubs: Club[];
  events: Event[];
  setActiveView: (view: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ clubs, events, setActiveView }) => {
  const activeClubs = clubs.filter(club => club.status === 'active');
  const totalMembers = clubs.reduce((sum, club) => sum + club.members.length, 0);
  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const totalEvents = events.length;

  const stats = [
    {
      label: 'Active Clubs',
      value: activeClubs.length,
      icon: Users,
      gradient: 'from-violet-600 to-purple-600',
      change: '+12%'
    },
    {
      label: 'Total Members',
      value: totalMembers,
      icon: Trophy,
      gradient: 'from-blue-600 to-violet-600',
      change: '+8%'
    },
    {
      label: 'Upcoming Events',
      value: upcomingEvents.length,
      icon: Calendar,
      gradient: 'from-purple-600 to-indigo-600',
      change: '+15%'
    },
    {
      label: 'Total Events',
      value: totalEvents,
      icon: TrendingUp,
      gradient: 'from-indigo-600 to-blue-600',
      change: '+23%'
    }
  ];

  const recentEvents = events.slice(0, 3);
  const recentClubs = clubs.slice(0, 4);

  const quickActions = [
    { label: 'Create New Club', action: 'create', icon: Plus, color: 'from-violet-600 to-purple-600' },
    { label: 'Create New Event', action: 'create-event', icon: CalendarDays, color: 'from-purple-600 to-indigo-600' },
    { label: 'Manage Clubs', action: 'clubs', icon: Users, color: 'from-blue-600 to-violet-600' },
    { label: 'System Settings', action: 'settings', icon: Settings, color: 'from-indigo-600 to-blue-600' }
  ];

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl shadow-lg border border-violet-400/50">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">
              Admin Dashboard
            </h1>
            <p className="text-white/70 text-lg">Complete system oversight and management</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg border border-violet-400/50`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-violet-400 bg-violet-600/20 px-2 py-1 text-xs rounded-full font-semibold border border-violet-400/30">{stat.change}</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-white/70 text-sm font-medium">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="glass-card">
          <div className="p-6 border-b border-violet-500/20">
            <h2 className="text-xl font-bold text-white">Quick Actions</h2>
            <p className="text-white/70 text-sm">Administrative controls</p>
          </div>
          <div className="p-6 space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => setActiveView(action.action)}
                  className={`action-button ${action.color}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Events */}
        <div className="glass-card">
          <div className="p-6 border-b border-violet-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Recent Events</h2>
              <button 
                onClick={() => setActiveView('events')}
                className="text-violet-400 hover:text-violet-300 font-medium text-sm transition-colors duration-300"
              >
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-all duration-300 border border-violet-500/10">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg border border-violet-400/50">
                  <CalendarDays className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">{event.title}</h3>
                  <p className="text-xs text-white/70">{event.clubName}</p>
                  <div className="flex items-center space-x-2 text-xs text-white/50 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Club Overview */}
        <div className="glass-card">
          <div className="p-6 border-b border-violet-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Club Overview</h2>
              <button 
                onClick={() => setActiveView('clubs')}
                className="text-violet-400 hover:text-violet-300 font-medium text-sm transition-colors duration-300"
              >
                Manage All
              </button>
            </div>
          </div>
          <div className="p-6">
            {recentClubs.map((club) => (
              <div key={club.id} className="flex items-center justify-between py-3 border-b border-violet-500/20 last:border-b-0">
                <div>
                  <h3 className="font-semibold text-white text-sm">{club.name}</h3>
                  <p className="text-xs text-white/70">{club.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-violet-400">{club.members.length}</p>
                  <p className="text-xs text-white/50">members</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;