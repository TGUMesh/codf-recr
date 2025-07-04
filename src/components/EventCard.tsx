import React from 'react';
import { Calendar, Clock, MapPin, Users, Edit, Trash2, Eye } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
  onView: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete, onView }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
      case 'ongoing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'seminar': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'competition': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'cultural': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'sports': return 'bg-violet-500/20 text-violet-400 border-violet-500/30';
      case 'social': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="glass-card overflow-hidden hover:bg-black/30 transition-all duration-300 transform hover:scale-105 font-abel">
      {event.imageUrl && (
        <div className="h-48 bg-gradient-to-r from-violet-400 to-purple-600 relative overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-normal border ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-normal border ${getTypeColor(event.type)}`}>
              {event.type}
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-normal text-white mb-2">{event.title}</h3>
            <p className="text-sm text-violet-400 font-normal mb-2">{event.clubName}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onView(event)}
              className="p-2 text-white/70 hover:text-violet-400 hover:bg-black/30 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(event)}
              className="p-2 text-white/70 hover:text-violet-400 hover:bg-black/30 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(event.id)}
              className="p-2 text-white/70 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-white/70 text-sm mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-white/70">
            <Calendar className="w-4 h-4 text-violet-400 mr-3" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center text-sm text-white/70">
            <Clock className="w-4 h-4 text-violet-400 mr-3" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-white/70">
            <MapPin className="w-4 h-4 text-violet-400 mr-3" />
            <span>{event.venue}</span>
          </div>

          {event.maxParticipants && (
            <div className="flex items-center text-sm text-white/70">
              <Users className="w-4 h-4 text-violet-400 mr-3" />
              <span>{event.registeredParticipants}/{event.maxParticipants} participants</span>
              <div className="ml-auto w-20 bg-black/30 rounded-full h-2 border border-violet-500/30">
                <div 
                  className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(event.registeredParticipants / event.maxParticipants) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2 pt-4 border-t border-violet-500/20">
          <button
            onClick={() => onView(event)}
            className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white py-2 px-4 rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-300 font-normal text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View Details
          </button>
          <button
            onClick={() => onEdit(event)}
            className="flex-1 bg-black/30 text-white py-2 px-4 rounded-xl hover:bg-black/40 transition-all duration-300 font-normal text-sm shadow-md hover:shadow-lg transform hover:scale-105 border border-violet-500/30"
          >
            Edit Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;