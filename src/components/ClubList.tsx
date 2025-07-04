import React, { useState } from 'react';
import { Club } from '../types';
import ClubCard from './ClubCard';
import SearchAndFilter from './SearchAndFilter';
import { clubCategories } from '../data/mockData';

interface ClubListProps {
  clubs: Club[];
  onEdit: (club: Club) => void;
  onDelete: (clubId: string) => void;
  onManageMembers: (club: Club) => void;
}

const ClubList: React.FC<ClubListProps> = ({ clubs, onEdit, onDelete, onManageMembers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 min-h-screen font-abel">
      <div className="mb-8">
        <h1 className="text-4xl font-normal gradient-text mb-2">
          Manage Clubs
        </h1>
        <p className="text-white/70 text-lg">View and manage all registered clubs</p>
      </div>

      <div className="glass-card p-6 mb-8">
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={clubCategories}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClubs.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
            onEdit={onEdit}
            onDelete={onDelete}
            onManageMembers={onManageMembers}
          />
        ))}
      </div>

      {filteredClubs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-violet-500/20">
            <span className="text-white text-2xl">🏛️</span>
          </div>
          <p className="text-white text-xl font-normal">No clubs found matching your criteria</p>
          <p className="text-white/70 text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ClubList;