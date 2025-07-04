import React from 'react';
import { GraduationCap, Users, Calendar, BarChart3, Eye, FileText, Award, TrendingUp } from 'lucide-react';
import { Club, Event, User } from '../types';

interface FacultyDashboardProps {
  clubs: Club[];
  events: Event[];
  currentUser: User;
  setActiveView: (view: string) => void;
}

const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ clubs, events, currentUser, setActiveView }) => {
  const userClub = clubs.find(club => club.id === currentUser.clubId);
  const clubEvents = events.filter(event => event.clubId === currentUser.clubId);
  const upcomingEvents = clubEvents.filter(event => event.status === 'upcoming');
  const completedEvents = clubEvents.filter(event => event.status === 'completed');

  const stats = [
    {
      label: 'Supervised Club',
      value: userClub ? 1 : 0,
      icon: Users,
      gradient: 'from-violet-600 to-purple-600',
      description: userClub?.name || 'No club assigned'
    },
    {
      label: 'Club Members',
      value: userClub?.members.length || 0,
      icon: GraduationCap,
      gradient: 'from-violet-600 to-purple-600',
      description: 'Active students'
    },
    {
      label: 'Events This Year',
      value: clubEvents.length,
      icon: Calendar,
      gradient: 'from-violet-600 to-purple-600',
      description: `${completedEvents.length} completed`
    },
    {
      label: 'Avg. Attendance',
      value: '89%',
      icon: TrendingUp,
      gradient: 'from-violet-600 to-purple-600',
      description: 'Excellent engagement'
    }
  ];

  const oversightActions = [
    { label: 'View Club Details', action: 'clubs', icon: Eye, color: 'from-violet-600 to-purple-600' },
    { label: 'Review Events', action: 'events', icon: Calendar, color: 'from-violet-600 to-purple-600' },
    { label: 'View Members', action: 'members', icon: FileText, color: 'from-violet-600 to-purple-600' },
    { label: 'Club Analytics', action: 'dashboard', icon: BarChart3, color: 'from-violet-600 to-purple-600' }
  ];

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl shadow-lg border border-violet-400/50">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">
              Faculty Dashboard
            </h1>
            <p className="text-white/70 text-lg">Welcome, {currentUser.name}</p>
            <p className="text-violet-400 font-semibold">{currentUser.department} Department</p>
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
                <p className="text-xs text-violet-400 font-semibold">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Oversight Actions */}
        <div className="glass-card">
          <div className="p-6 border-b border-violet-500/20">
            <h2 className="text-xl font-bold text-white">Oversight Actions</h2>
            <p className="text-white/70 text-sm">Monitor and guide club activities</p>
          </div>
          <div className="p-6 space-y-4">
            {oversightActions.map((action, index) => {
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

        {/* Club Overview */}
        <div className="glass-card">
          <div className="p-6 border-b border-violet-500/20">
            <h2 className="text-xl font-bold text-white">Club Overview</h2>
            <p className="text-white/70 text-sm">{userClub?.name || 'No club assigned'}</p>
          </div>
          <div className="p-6">
            {userClub ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border border-violet-400/50">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{userClub.name}</h3>
                  <p className="text-white/70 text-sm">{userClub.category}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-violet-600/20 rounded-lg border border-violet-500/30">
                    <span className="text-sm font-medium text-white">President</span>
                    <span className="text-sm text-violet-400 font-semibold">
                      {userClub.president?.name || 'Not assigned'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-violet-600/20 rounded-lg border border-violet-500/30">
                    <span className="text-sm font-medium text-white">Members</span>
                    <span className="text-sm text-violet-400 font-semibold">
                      {userClub.members.length} students
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-violet-600/20 rounded-lg border border-violet-500/30">
                    <span className="text-sm font-medium text-white">Status</span>
                    <span className="text-sm text-violet-400 font-semibold capitalize">
                      {userClub.status}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <GraduationCap className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/70">No club assigned for supervision</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="glass-card">
          <div className="p-6 border-b border-violet-500/20">
            <h2 className="text-xl font-bold text-white">Recent Activities</h2>
            <p className="text-white/70 text-sm">Club events and milestones</p>
          </div>
          <div className="p-6 space-y-4">
            {clubEvents.slice(0, 4).map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-3 bg-black/20 rounded-xl hover:bg-black/30 transition-all duration-300 border border-violet-500/10">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md border border-violet-400/50">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">{event.title}</h3>
                  <p className="text-xs text-white/70">{event.date}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    event.status === 'completed' ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30' :
                    event.status === 'upcoming' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' :
                    'bg-gray-600/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
            {clubEvents.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/70">No recent activities</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Faculty Insights */}
      <div className="mt-8 glass-card p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Award className="w-8 h-8 text-violet-400" />
          <div>
            <h3 className="text-xl font-bold text-white">Faculty Insights</h3>
            <p className="text-white/70">Key observations and recommendations</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-violet-600/20 rounded-lg p-4 border border-violet-500/30">
            <h4 className="font-semibold mb-2 text-white">📈 Performance Trends</h4>
            <p className="text-sm text-white/70">Club engagement has increased by 25% this semester</p>
          </div>
          <div className="bg-violet-600/20 rounded-lg p-4 border border-violet-500/30">
            <h4 className="font-semibold mb-2 text-white">🎯 Recommendations</h4>
            <p className="text-sm text-white/70">Consider organizing more technical workshops</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;