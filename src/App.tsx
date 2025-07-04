import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AdminDashboard from './components/AdminDashboard';
import PresidentDashboard from './components/PresidentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import ClubList from './components/ClubList';
import ClubForm from './components/ClubForm';
import MemberManagement from './components/MemberManagement';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import RoleSelector from './components/RoleSelector';
import { Club, Event, User } from './types';
import { mockClubs, mockEvents, mockUsers } from './data/mockData';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]); // Default to admin
  const [clubs, setClubs] = useState<Club[]>(mockClubs);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [editingClub, setEditingClub] = useState<Club | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [managingClub, setManagingClub] = useState<Club | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCreateClub = (clubData: Partial<Club>) => {
    const newClub: Club = {
      id: Date.now().toString(),
      ...clubData,
      createdAt: new Date().toISOString().split('T')[0]
    } as Club;
    
    setClubs([...clubs, newClub]);
    setActiveView('clubs');
  };

  const handleUpdateClub = (clubData: Partial<Club>) => {
    if (editingClub) {
      const updatedClubs = clubs.map(club => 
        club.id === editingClub.id 
          ? { ...club, ...clubData }
          : club
      );
      setClubs(updatedClubs);
      setEditingClub(null);
      setActiveView('clubs');
    }
  };

  const handleDeleteClub = (clubId: string) => {
    if (confirm('Are you sure you want to delete this club?')) {
      setClubs(clubs.filter(club => club.id !== clubId));
    }
  };

  const handleEditClub = (club: Club) => {
    setEditingClub(club);
    setActiveView('edit');
  };

  const handleManageMembers = (club: Club) => {
    setManagingClub(club);
    setActiveView('members');
  };

  const handleUpdateClubMembers = (updatedClub: Club) => {
    const updatedClubs = clubs.map(club => 
      club.id === updatedClub.id ? updatedClub : club
    );
    setClubs(updatedClubs);
    setManagingClub(updatedClub);
  };

  const handleCreateEvent = (eventData: Partial<Event>) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventData,
      createdAt: new Date().toISOString().split('T')[0]
    } as Event;
    
    setEvents([...events, newEvent]);
    setActiveView('events');
  };

  const handleUpdateEvent = (eventData: Partial<Event>) => {
    if (editingEvent) {
      const updatedEvents = events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...eventData }
          : event
      );
      setEvents(updatedEvents);
      setEditingEvent(null);
      setActiveView('events');
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setActiveView('edit-event');
  };

  const handleViewEvent = (event: Event) => {
    handleEditEvent(event);
  };

  const handleUserChange = (user: User) => {
    setCurrentUser(user);
    setActiveView('dashboard'); // Reset to dashboard when switching users
  };

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'admin':
        return <AdminDashboard clubs={clubs} events={events} setActiveView={setActiveView} />;
      case 'president':
        return <PresidentDashboard clubs={clubs} events={events} currentUser={currentUser} setActiveView={setActiveView} />;
      case 'faculty':
        return <FacultyDashboard clubs={clubs} events={events} currentUser={currentUser} setActiveView={setActiveView} />;
      default:
        return <AdminDashboard clubs={clubs} events={events} setActiveView={setActiveView} />;
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return renderDashboard();
      case 'clubs':
        if (currentUser.role === 'admin') {
          return (
            <ClubList
              clubs={clubs}
              onEdit={handleEditClub}
              onDelete={handleDeleteClub}
              onManageMembers={handleManageMembers}
            />
          );
        } else if (currentUser.role === 'faculty') {
          // Faculty can view their assigned club
          const userClub = clubs.find(club => club.id === currentUser.clubId);
          return userClub ? (
            <div className="p-8 min-h-screen">
              <div className="mb-8">
                <h1 className="text-4xl font-bold gradient-text mb-2">
                  Club Details
                </h1>
                <p className="text-white/70 text-lg">Detailed view of your supervised club</p>
              </div>
              <div className="glass-card p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">{userClub.name}</h2>
                    <p className="text-white/70 mb-6">{userClub.description}</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-violet-500/20 rounded-xl border border-violet-500/30">
                        <span className="font-medium text-white">Category</span>
                        <span className="text-violet-400 font-semibold">{userClub.category}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-violet-500/20 rounded-xl border border-violet-500/30">
                        <span className="font-medium text-white">Status</span>
                        <span className="text-violet-400 font-semibold capitalize">{userClub.status}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-violet-500/20 rounded-xl border border-violet-500/30">
                        <span className="font-medium text-white">Created</span>
                        <span className="text-violet-400 font-semibold">{userClub.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Club Leadership</h3>
                    <div className="space-y-4">
                      {userClub.president && (
                        <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                          <h4 className="font-semibold text-white">President</h4>
                          <p className="text-blue-400">{userClub.president.name}</p>
                          <p className="text-sm text-white/70">{userClub.president.email}</p>
                        </div>
                      )}
                      {userClub.facultyCoordinator && (
                        <div className="p-4 bg-violet-500/20 rounded-xl border border-violet-500/30">
                          <h4 className="font-semibold text-white">Faculty Coordinator</h4>
                          <p className="text-violet-400">{userClub.facultyCoordinator.name}</p>
                          <p className="text-sm text-white/70">{userClub.facultyCoordinator.email}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 min-h-screen">
              <p className="text-white text-xl">No club assigned for supervision</p>
            </div>
          );
        } else {
          return (
            <div className="p-8 min-h-screen">
              <p className="text-white text-xl">Access denied. Admin privileges required.</p>
            </div>
          );
        }
      case 'create':
        return currentUser.role === 'admin' ? (
          <ClubForm
            onSubmit={handleCreateClub}
            onCancel={() => setActiveView('clubs')}
          />
        ) : (
          <div className="p-8 min-h-screen">
            <p className="text-white text-xl">Access denied. Admin privileges required.</p>
          </div>
        );
      case 'edit':
        return currentUser.role === 'admin' ? (
          <ClubForm
            club={editingClub || undefined}
            onSubmit={handleUpdateClub}
            onCancel={() => {
              setEditingClub(null);
              setActiveView('clubs');
            }}
          />
        ) : (
          <div className="p-8 min-h-screen">
            <p className="text-white text-xl">Access denied. Admin privileges required.</p>
          </div>
        );
      case 'members':
        if (currentUser.role === 'admin') {
          return managingClub ? (
            <MemberManagement
              club={managingClub}
              onUpdateClub={handleUpdateClubMembers}
              onBack={() => setActiveView('clubs')}
            />
          ) : (
            <div className="p-8 min-h-screen">
              <p className="text-white text-xl">No club selected for member management</p>
            </div>
          );
        } else if (currentUser.role === 'president') {
          const userClub = clubs.find(club => club.id === currentUser.clubId);
          return userClub ? (
            <MemberManagement
              club={userClub}
              onUpdateClub={handleUpdateClubMembers}
              onBack={() => setActiveView('dashboard')}
            />
          ) : (
            <div className="p-8 min-h-screen">
              <p className="text-white text-xl">No club assigned</p>
            </div>
          );
        } else if (currentUser.role === 'faculty') {
          // Faculty can view members of their assigned club
          const userClub = clubs.find(club => club.id === currentUser.clubId);
          return userClub ? (
            <div className="p-8 min-h-screen">
              <div className="mb-8">
                <h1 className="text-4xl font-bold gradient-text mb-2">
                  Club Members
                </h1>
                <p className="text-white/70 text-lg">View members of {userClub.name}</p>
              </div>
              <div className="glass-card p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white">Current Members ({userClub.members.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userClub.members.map((member) => (
                    <div key={member.id} className="glass-card p-6 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold text-white">{member.name}</h3>
                          <p className="text-sm text-white/70">{member.regNo}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-white/70">
                          <span className="font-medium">Email:</span>
                          <span className="ml-2">{member.email}</span>
                        </div>
                        <div className="flex items-center text-white/70">
                          <span className="font-medium">Phone:</span>
                          <span className="ml-2">{member.phone}</span>
                        </div>
                        <div className="flex items-center text-white/70">
                          <span className="font-medium">Department:</span>
                          <span className="ml-2">{member.department}</span>
                        </div>
                        <div className="flex items-center text-white/70">
                          <span className="font-medium">Year:</span>
                          <span className="ml-2">Year {member.year}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {userClub.members.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-white/70">No members in this club yet</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 min-h-screen">
              <p className="text-white text-xl">No club assigned for supervision</p>
            </div>
          );
        } else {
          return (
            <div className="p-8 min-h-screen">
              <p className="text-white text-xl">Access denied. Insufficient privileges.</p>
            </div>
          );
        }
      case 'events':
        const filteredEvents = currentUser.role === 'admin' 
          ? events 
          : events.filter(event => event.clubId === currentUser.clubId);
        return (
          <EventList
            events={filteredEvents}
            onEdit={handleEditEvent}
            onDelete={currentUser.role === 'admin' ? handleDeleteEvent : () => {}}
            onView={handleViewEvent}
          />
        );
      case 'create-event':
        return (currentUser.role === 'admin' || currentUser.role === 'president') ? (
          <EventForm
            clubs={currentUser.role === 'admin' ? clubs : clubs.filter(club => club.id === currentUser.clubId)}
            onSubmit={handleCreateEvent}
            onCancel={() => setActiveView('events')}
          />
        ) : (
          <div className="p-8 min-h-screen">
            <p className="text-white text-xl">Access denied. Admin or President privileges required.</p>
          </div>
        );
      case 'edit-event':
        return (currentUser.role === 'admin' || 
                (currentUser.role === 'president' && editingEvent?.clubId === currentUser.clubId)) ? (
          <EventForm
            event={editingEvent || undefined}
            clubs={currentUser.role === 'admin' ? clubs : clubs.filter(club => club.id === currentUser.clubId)}
            onSubmit={handleUpdateEvent}
            onCancel={() => {
              setEditingEvent(null);
              setActiveView('events');
            }}
          />
        ) : (
          <div className="p-8 min-h-screen">
            <p className="text-white text-xl">Access denied. Insufficient privileges.</p>
          </div>
        );
      case 'settings':
        return currentUser.role === 'admin' ? (
          <div className="p-8 min-h-screen">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Settings
            </h1>
            <p className="text-white/70 text-lg mb-8">System settings and configuration</p>
            <div className="glass-card p-8">
              <p className="text-white/70 text-center">Settings panel coming soon...</p>
            </div>
          </div>
        ) : (
          <div className="p-8 min-h-screen">
            <p className="text-white text-xl">Access denied. Admin privileges required.</p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen">
      <RoleSelector 
        currentUser={currentUser} 
        onUserChange={handleUserChange} 
        users={mockUsers}
      />
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        currentUser={currentUser} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <Header currentUser={currentUser} onMenuClick={() => setSidebarOpen(true)} />
      <main className="pt-20 px-2 sm:px-4 md:ml-64 transition-all duration-300 max-w-full overflow-x-hidden">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;