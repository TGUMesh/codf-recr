import React, { useState } from 'react';
import { Event } from '../types';
import EventCard from './EventCard';
import SearchAndFilter from './SearchAndFilter';
import { eventTypes } from '../data/mockData';

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
  onView: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.clubName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || event.type === selectedCategory;
    const matchesStatus = selectedStatus === '' || event.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const statusOptions = ['upcoming', 'ongoing', 'completed', 'cancelled'];

  return (
    <div className="p-8 min-h-screen font-abel">
      <div className="mb-8">
        <h1 className="text-4xl font-normal gradient-text mb-2">
          Manage Events
        </h1>
        <p className="text-white/70 text-lg">View and manage all club events</p>
      </div>

      <div className="glass-card p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option value="">All Types</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field"
            >
              <option value="">All Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-violet-500/20">
            <span className="text-white text-2xl">📅</span>
          </div>
          <p className="text-white text-xl font-normal">No events found matching your criteria</p>
          <p className="text-white/70 text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default EventList;