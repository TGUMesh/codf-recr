export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  president: Student | null;
  facultyCoordinator: Faculty | null;
  members: Student[];
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  regNo: string;
  year: number;
  department: string;
  phone: string;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'president' | 'faculty';
  clubId?: string; // For president and faculty roles
  department?: string;
  regNo?: string; // For president role
}

export interface Event {
  id: string;
  title: string;
  description: string;
  clubId: string;
  clubName: string;
  date: string;
  time: string;
  venue: string;
  type: 'workshop' | 'seminar' | 'competition' | 'cultural' | 'sports' | 'social';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  maxParticipants?: number;
  registeredParticipants: number;
  organizer: string;
  contactEmail: string;
  imageUrl?: string;
  createdAt: string;
}

export type ClubCategory = 'Technical' | 'Cultural' | 'Sports' | 'Social Service' | 'Literary' | 'Arts' | 'Dance' | 'Music';