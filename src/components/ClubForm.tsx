import React, { useState, useEffect } from 'react';
import { Club, Student, Faculty } from '../types';
import { clubCategories, mockStudents, mockFaculty } from '../data/mockData';

interface ClubFormProps {
  club?: Club;
  onSubmit: (clubData: Partial<Club>) => void;
  onCancel: () => void;
}

const ClubForm: React.FC<ClubFormProps> = ({ club, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    presidentId: '',
    facultyCoordinatorId: ''
  });

  useEffect(() => {
    if (club) {
      setFormData({
        name: club.name,
        description: club.description,
        category: club.category,
        presidentId: club.president?.id || '',
        facultyCoordinatorId: club.facultyCoordinator?.id || ''
      });
    }
  }, [club]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const president = mockStudents.find(s => s.id === formData.presidentId) || null;
    const facultyCoordinator = mockFaculty.find(f => f.id === formData.facultyCoordinatorId) || null;

    const clubData: Partial<Club> = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      president,
      facultyCoordinator,
      members: club?.members || (president ? [president] : []),
      status: 'active'
    };

    onSubmit(clubData);
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
        <h1 className="text-3xl font-normal gradient-text mb-2">
          {club ? 'Edit Club' : 'Create New Club'}
        </h1>
        <p className="text-white/70">
          {club ? 'Update club information' : 'Add a new club to the system'}
        </p>
      </div>

      <div className="glass-card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-normal text-white mb-2">
                Club Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="Enter club name"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-normal text-white mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="input-field w-full"
              >
                <option value="">Select a category</option>
                {clubCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-normal text-white mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="input-field w-full"
              placeholder="Enter club description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="presidentId" className="block text-sm font-normal text-white mb-2">
                Club President
              </label>
              <select
                id="presidentId"
                name="presidentId"
                value={formData.presidentId}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="">Select a president</option>
                {mockStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.regNo})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="facultyCoordinatorId" className="block text-sm font-normal text-white mb-2">
                Faculty Coordinator
              </label>
              <select
                id="facultyCoordinatorId"
                name="facultyCoordinatorId"
                value={formData.facultyCoordinatorId}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="">Select a faculty coordinator</option>
                {mockFaculty.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.name} ({faculty.department})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-violet-500/20">
            <button
              type="button"
              onClick={onCancel}
              className="form-button-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="form-button-primary"
            >
              {club ? 'Update Club' : 'Create Club'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClubForm;