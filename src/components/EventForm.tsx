import React, { useState, useEffect } from 'react';
import { Event, Club } from '../types';
import { eventTypes } from '../data/mockData';

interface EventFormProps {
  event?: Event;
  clubs: Club[];
  onSubmit: (eventData: Partial<Event>) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, clubs, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clubId: '',
    date: '',
    time: '',
    venue: '',
    type: 'workshop' as const,
    status: 'upcoming' as const,
    maxParticipants: '',
    organizer: '',
    contactEmail: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        clubId: event.clubId,
        date: event.date,
        time: event.time,
        venue: event.venue,
        type: event.type,
        status: event.status,
        maxParticipants: event.maxParticipants?.toString() || '',
        organizer: event.organizer,
        contactEmail: event.contactEmail,
        imageUrl: event.imageUrl || ''
      });
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedClub = clubs.find(c => c.id === formData.clubId);
    
    const eventData: Partial<Event> = {
      title: formData.title,
      description: formData.description,
      clubId: formData.clubId,
      clubName: selectedClub?.name || '',
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      type: formData.type,
      status: formData.status,
      maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
      registeredParticipants: event?.registeredParticipants || 0,
      organizer: formData.organizer,
      contactEmail: formData.contactEmail,
      imageUrl: formData.imageUrl || undefined
    };

    onSubmit(eventData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-8 min-h-screen font-abel">
      <div className="mb-8">
        <h1 className="text-4xl font-normal gradient-text mb-2">
          {event ? 'Edit Event' : 'Create New Event'}
        </h1>
        <p className="text-white/70 text-lg">
          {event ? 'Update event information' : 'Add a new event to the system'}
        </p>
      </div>

      <div className="glass-card p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-normal text-white mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label htmlFor="clubId" className="block text-sm font-normal text-white mb-2">
                  Organizing Club *
                </label>
                <select
                  id="clubId"
                  name="clubId"
                  value={formData.clubId}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                >
                  <option value="">Select a club</option>
                  {clubs.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-normal text-white mb-2">
                    Event Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="input-field w-full"
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-normal text-white mb-2">
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="input-field w-full"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-normal text-white mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="input-field w-full"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-normal text-white mb-2">
                    Event Time *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="input-field w-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="description" className="block text-sm font-normal text-white mb-2">
                  Event Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-field w-full"
                  placeholder="Enter detailed event description"
                />
              </div>

              <div>
                <label htmlFor="venue" className="block text-sm font-normal text-white mb-2">
                  Venue *
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                  placeholder="Enter event venue"
                />
              </div>

              <div>
                <label htmlFor="maxParticipants" className="block text-sm font-normal text-white mb-2">
                  Maximum Participants
                </label>
                <input
                  type="number"
                  id="maxParticipants"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  min="1"
                  className="input-field w-full"
                  placeholder="Enter maximum participants (optional)"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="organizer" className="block text-sm font-normal text-white mb-2">
                    Organizer Name *
                  </label>
                  <input
                    type="text"
                    id="organizer"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleChange}
                    required
                    className="input-field w-full"
                    placeholder="Enter organizer name"
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-normal text-white mb-2">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    className="input-field w-full"
                    placeholder="Enter contact email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-normal text-white mb-2">
                  Event Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="input-field w-full"
                  placeholder="Enter image URL (optional)"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-8 border-t border-violet-500/20">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;