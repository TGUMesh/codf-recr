import React, { useState } from 'react';
import { Club, Student } from '../types';
import { mockStudents } from '../data/mockData';
import { Plus, X, User, Mail, Phone, GraduationCap } from 'lucide-react';

interface MemberManagementProps {
  club: Club;
  onUpdateClub: (club: Club) => void;
  onBack: () => void;
}

const MemberManagement: React.FC<MemberManagementProps> = ({ club, onUpdateClub, onBack }) => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const availableStudents = mockStudents.filter(
    student => !club.members.some(member => member.id === student.id)
  );

  const handleAddMember = () => {
    if (selectedStudentId) {
      const student = mockStudents.find(s => s.id === selectedStudentId);
      if (student) {
        const updatedClub = {
          ...club,
          members: [...club.members, student]
        };
        onUpdateClub(updatedClub);
        setSelectedStudentId('');
        setShowAddMember(false);
      }
    }
  };

  const handleRemoveMember = (studentId: string) => {
    const updatedClub = {
      ...club,
      members: club.members.filter(member => member.id !== studentId)
    };
    onUpdateClub(updatedClub);
  };

  return (
    <div className="p-8 min-h-screen font-abel">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-white hover:text-violet-400 font-normal mb-4"
        >
          ← Back to Clubs
        </button>
        <h1 className="text-3xl font-normal gradient-text mb-2">Member Management</h1>
        <p className="text-white/70">Manage members for {club.name}</p>
      </div>

      <div className="glass-card p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-normal text-white">Current Members ({club.members.length})</h2>
          <button
            onClick={() => setShowAddMember(!showAddMember)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </button>
        </div>

        {showAddMember && (
          <div className="bg-black/20 rounded-lg p-4 mb-6 border border-violet-500/20">
            <h3 className="font-normal text-white mb-3">Add New Member</h3>
            <div className="flex items-center space-x-4">
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="input-field flex-1"
              >
                <option value="">Select a student</option>
                {availableStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.regNo}) - {student.department}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddMember}
                disabled={!selectedStudentId}
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-violet-700 hover:to-purple-700 transition-colors font-normal disabled:opacity-50"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddMember(false);
                  setSelectedStudentId('');
                }}
                className="text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {club.members.map((member) => (
            <div key={member.id} className="bg-black/20 border border-violet-500/20 rounded-lg p-4 hover:bg-black/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-normal text-white">{member.name}</h3>
                    <p className="text-sm text-white/70">{member.regNo}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="text-red-400 hover:text-red-300 p-1"
                  title="Remove member"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-white/70">
                  <Mail className="w-4 h-4 mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-white/70">
                  <Phone className="w-4 h-4 mr-2" />
                  {member.phone}
                </div>
                <div className="flex items-center text-white/70">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {member.department} - Year {member.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {club.members.length === 0 && (
          <div className="text-center py-8">
            <p className="text-white/70">No members added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberManagement;