import React from 'react';
import { Users, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { Club } from '../types';

interface ClubCardProps {
  club: Club;
  onEdit: (club: Club) => void;
  onDelete: (clubId: string) => void;
  onManageMembers: (club: Club) => void;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, onEdit, onDelete, onManageMembers }) => {
  return (
    <div className="glass-card overflow-hidden hover:bg-black/30 transition-all duration-300 transform hover:scale-105 font-abel">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white border border-violet-400/50">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-normal mb-2">{club.name}</h3>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-normal px-3 py-1 rounded-full border border-white/30">
              {club.category}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(club)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors border border-white/20"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(club.id)}
              className="p-2 text-white/80 hover:text-white hover:bg-red-500/30 rounded-lg transition-colors border border-red-400/30"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-white/70 text-sm mb-6 line-clamp-3">{club.description}</p>

        <div className="space-y-3 mb-6">
          {club.president && (
            <div className="flex items-center text-sm">
              <Users className="w-4 h-4 text-violet-400 mr-3" />
              <span className="text-white/70">President:</span>
              <span className="ml-2 font-normal text-white">{club.president.name}</span>
            </div>
          )}
          
          {club.facultyCoordinator && (
            <div className="flex items-center text-sm">
              <Mail className="w-4 h-4 text-violet-400 mr-3" />
              <span className="text-white/70">Faculty:</span>
              <span className="ml-2 font-normal text-white">{club.facultyCoordinator.name}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <Phone className="w-4 h-4 text-violet-400 mr-3" />
            <span className="text-white/70">Members:</span>
            <span className="ml-2 font-normal text-violet-400">{club.members.length}</span>
          </div>
        </div>

        <div className="flex space-x-2 pt-4 border-t border-violet-500/20">
          <button
            onClick={() => onManageMembers(club)}
            className="card-button-primary"
          >
            Manage Members
          </button>
          <button
            onClick={() => onEdit(club)}
            className="card-button-secondary"
          >
            Edit Club
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;