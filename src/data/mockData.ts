import { Club, Student, Faculty, User, Event } from '../types';

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@vitstudent.ac.in',
    regNo: '21BCE1234',
    year: 3,
    department: 'Computer Science',
    phone: '+91 9876543210'
  },
  {
    id: '2',
    name: 'Priya Reddy',
    email: 'priya.reddy@vitstudent.ac.in',
    regNo: '21BCE5678',
    year: 2,
    department: 'Electronics',
    phone: '+91 9876543211'
  },
  {
    id: '3',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@vitstudent.ac.in',
    regNo: '21BCE9012',
    year: 4,
    department: 'Mechanical',
    phone: '+91 9876543212'
  },
  {
    id: '4',
    name: 'Sneha Patel',
    email: 'sneha.patel@vitstudent.ac.in',
    regNo: '21BCE3456',
    year: 1,
    department: 'Civil',
    phone: '+91 9876543213'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    email: 'vikram.singh@vitstudent.ac.in',
    regNo: '21BCE7890',
    year: 3,
    department: 'Computer Science',
    phone: '+91 9876543214'
  }
];

export const mockFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Gupta',
    email: 'rajesh.gupta@vit.ac.in',
    department: 'Computer Science',
    designation: 'Professor',
    phone: '+91 9876543220'
  },
  {
    id: '2',
    name: 'Dr. Sunita Verma',
    email: 'sunita.verma@vit.ac.in',
    department: 'Electronics',
    designation: 'Associate Professor',
    phone: '+91 9876543221'
  },
  {
    id: '3',
    name: 'Dr. Amit Joshi',
    email: 'amit.joshi@vit.ac.in',
    department: 'Mechanical',
    designation: 'Assistant Professor',
    phone: '+91 9876543222'
  },
  {
    id: '4',
    name: 'Dr. Kavita Sharma',
    email: 'kavita.sharma@vit.ac.in',
    department: 'Civil',
    designation: 'Professor',
    phone: '+91 9876543223'
  }
];

export const mockClubs: Club[] = [
  {
    id: '1',
    name: 'IEEE Student Branch',
    description: 'IEEE Student Branch VIT focuses on advancing technology for humanity through technical activities and professional development.',
    category: 'Technical',
    president: mockStudents[0],
    facultyCoordinator: mockFaculty[0],
    members: [mockStudents[0], mockStudents[1], mockStudents[4]],
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Cultural Committee',
    description: 'Organizing cultural events, festivals, and celebrations to promote diversity and artistic expression.',
    category: 'Cultural',
    president: mockStudents[1],
    facultyCoordinator: mockFaculty[1],
    members: [mockStudents[1], mockStudents[2], mockStudents[3]],
    createdAt: '2024-01-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Sports Club',
    description: 'Promoting sports activities, organizing tournaments, and maintaining fitness culture among students.',
    category: 'Sports',
    president: mockStudents[2],
    facultyCoordinator: mockFaculty[2],
    members: [mockStudents[2], mockStudents[4]],
    createdAt: '2024-02-01',
    status: 'active'
  },
  {
    id: '4',
    name: 'NSS Unit',
    description: 'National Service Scheme unit dedicated to social service and community development activities.',
    category: 'Social Service',
    president: mockStudents[3],
    facultyCoordinator: mockFaculty[3],
    members: [mockStudents[3], mockStudents[0]],
    createdAt: '2024-02-10',
    status: 'active'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'AI & Machine Learning Workshop',
    description: 'Comprehensive workshop on artificial intelligence and machine learning fundamentals with hands-on projects.',
    clubId: '1',
    clubName: 'IEEE Student Branch',
    date: '2024-03-15',
    time: '10:00 AM',
    venue: 'Tech Auditorium',
    type: 'workshop',
    status: 'upcoming',
    maxParticipants: 100,
    registeredParticipants: 67,
    organizer: 'Arjun Sharma',
    contactEmail: 'arjun.sharma@vitstudent.ac.in',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    createdAt: '2024-02-20'
  },
  {
    id: '2',
    title: 'Annual Cultural Fest - Riviera',
    description: 'Three-day cultural extravaganza featuring dance, music, drama, and art competitions.',
    clubId: '2',
    clubName: 'Cultural Committee',
    date: '2024-03-22',
    time: '6:00 PM',
    venue: 'Main Campus Ground',
    type: 'cultural',
    status: 'upcoming',
    maxParticipants: 500,
    registeredParticipants: 342,
    organizer: 'Priya Reddy',
    contactEmail: 'priya.reddy@vitstudent.ac.in',
    imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    createdAt: '2024-02-18'
  },
  {
    id: '3',
    title: 'Inter-College Basketball Tournament',
    description: 'Annual basketball championship with teams from various colleges across the region.',
    clubId: '3',
    clubName: 'Sports Club',
    date: '2024-03-10',
    time: '9:00 AM',
    venue: 'Sports Complex',
    type: 'sports',
    status: 'completed',
    maxParticipants: 200,
    registeredParticipants: 156,
    organizer: 'Rahul Kumar',
    contactEmail: 'rahul.kumar@vitstudent.ac.in',
    imageUrl: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg',
    createdAt: '2024-02-05'
  },
  {
    id: '4',
    title: 'Community Service Drive',
    description: 'Blood donation camp and health awareness program for the local community.',
    clubId: '4',
    clubName: 'NSS Unit',
    date: '2024-03-25',
    time: '8:00 AM',
    venue: 'Community Center',
    type: 'social',
    status: 'upcoming',
    registeredParticipants: 89,
    organizer: 'Sneha Patel',
    contactEmail: 'sneha.patel@vitstudent.ac.in',
    imageUrl: 'https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg',
    createdAt: '2024-02-22'
  },
  {
    id: '5',
    title: 'Hackathon 2024',
    description: '48-hour coding marathon to solve real-world problems with innovative technology solutions.',
    clubId: '1',
    clubName: 'IEEE Student Branch',
    date: '2024-04-05',
    time: '9:00 AM',
    venue: 'Innovation Lab',
    type: 'competition',
    status: 'upcoming',
    maxParticipants: 150,
    registeredParticipants: 98,
    organizer: 'Vikram Singh',
    contactEmail: 'vikram.singh@vitstudent.ac.in',
    imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    createdAt: '2024-02-25'
  }
];

// Mock users for different roles
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@vit.ac.in',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@vitstudent.ac.in',
    role: 'president',
    clubId: '1',
    regNo: '21BCE1234',
    department: 'Computer Science'
  },
  {
    id: '3',
    name: 'Dr. Rajesh Gupta',
    email: 'rajesh.gupta@vit.ac.in',
    role: 'faculty',
    clubId: '1',
    department: 'Computer Science'
  }
];

export const mockUser: User = mockUsers[0]; // Default to admin

export const clubCategories = [
  'Technical',
  'Cultural',
  'Sports',
  'Social Service',
  'Literary',
  'Arts',
  'Dance',
  'Music'
];

export const eventTypes = [
  'workshop',
  'seminar',
  'competition',
  'cultural',
  'sports',
  'social'
];