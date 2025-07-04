import React from 'react';
import { Users, Calendar, Trophy, TrendingUp, UserPlus, CalendarPlus, Bell } from 'lucide-react';
import { Club, Event, User } from '../types';

interface PresidentDashboardProps {
  clubs: Club[];
  events: Event[];
  currentUser: User;
  setActiveView: (view: string) => void;
}

const PresidentDashboard: React.FC<PresidentDashboardProps> = ({ clubs, events, currentUser, setActiveView }) => {
  const userClub = clubs.find(club => club.id === currentUser.clubId);
  const clubEvents = events.filter(event => event.clubId === currentUser.clubId);
  const upcomingEvents = clubEvents.filter(event => event.status === 'upcoming');
  const completedEvents = clubEvents.filter(event => event.status === 'completed');

  const stats = [
    {
      label: 'Club Members',
      value: userClub?.members.length || 0,
      icon: Users,
      gradient: 'from-blue-600 to-violet-600',
      change: '+5 this month'
    },
    {
      label: 'Upcoming Events',
      value: upcomingEvents.length,
      icon: Calendar,
      gradient: 'from-violet-600 to-purple-600',
      change: '2 this week'
    },
    {
      label: 'Total Events',
      value: clubEvents.length,
      icon: Trophy,
      gradient: 'from-purple-600 to-indigo-600',
      change: '+3 this month'
    },
    {
      label: 'Event Attendance',
      value: '87%',
      icon: TrendingUp,
      gradient: 'from-indigo-600 to-blue-600',
      change: '+12% avg'
    }
  ];

  const quickActions = [
    { label: 'Add Member', action: 'members', icon: UserPlus, color: 'from-blue-600 to-violet-600' },
    { label: 'Create Event', action: 'create-event', icon: CalendarPlus, color: 'from-violet-600 to-purple-600' },
    { label: 'View Members', action: 'members', icon: Users, color: 'from-purple-600 to-indigo-600' },
    { label: 'Club Events', action: 'events', icon: Calendar, color: 'from-indigo-600 to-blue-600' }
  ];

  const recentMembers = userClub?.members.slice(0, 4) || [];

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl shadow-lg border border-violet-400/50">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">
              President Dashboard
            </h1>
            <p className="text-white/70 text-lg">Welcome back, {currentUser.name}</p>
            <p className="text-blue-400 font-semibold">{userClub?.name || 'No Club Assigned'}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg border border-violet-400/50`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-white/70 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-xs text-blue-400 font-semibold">{stat.change}</p>
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
            <p className="text-white/70 text-sm">Manage your club efficiently</p>
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

        {/* Upcoming Events */}
        <div className="glass-card">
          <div className="p-6 border-b border-violet-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
              <button 
                onClick={() => setActiveView('events')}
                className="text-violet-400 hover:text-violet-300 font-medium text-sm transition-colors duration-300"
              >
                View All
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {upcomingEvents.length > 0 ? upcomingEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-all duration-300 border border-violet-500/10">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg border border-violet-400/50">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">{event.title}</h3>
                  <p className="text-xs text-white/70">{event.date} at {event.time}</p>
                  <p className="text-xs text-violet-400">{event.venue}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/70">No upcoming events</p>
                <button 
                  onClick={() => setActiveView('create-event')}
                  className="text-violet-400 hover:text-violet-300 font-medium text-sm mt-2 transition-colors duration-300"
                >
                  Create your first event
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Club Members */}
        <div className="glass-card">
          <div className="p-6 border-b border-violet-500/20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Club Members</h2>
              <button 
                onClick={() => setActiveView('members')}
                className="text-violet-400 hover:text-violet-300 font-medium text-sm transition-colors duration-300"
              >
                Manage
              </button>
            </div>
          </div>
          <div className="p-6">
            {recentMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-3 py-3 border-b border-violet-500/20 last:border-b-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full flex items-center justify-center border border-violet-400/50">
                  <span className="text-white font-semibold text-sm">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">{member.name}</h3>
                  <p className="text-xs text-white/70">{member.department} - Year {member.year}</p>
                </div>
              </div>
            ))}
            {recentMembers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/70">No members yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="mt-8 glass-card p-6">
        <div className="flex items-center space-x-4">
          <Bell className="w-8 h-8 text-violet-400" />
          <div>
            <h3 className="text-xl font-bold text-white">Club Announcements</h3>
            <p className="text-white/70">Stay updated with important club information</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="bg-blue-600/20 rounded-lg p-3 border border-blue-500/30">
            <p className="text-sm text-white">📅 Monthly club meeting scheduled for next Friday</p>
          </div>
          <div className="bg-violet-600/20 rounded-lg p-3 border border-violet-500/30">
            <p className="text-sm text-white">🎉 Great job on the recent workshop! 95% attendance rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresidentDashboard;