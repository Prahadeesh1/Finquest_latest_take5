import React, { useState, useEffect } from 'react'; 
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  Filter,
  Search,
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart3,
  Trash2, 
} from 'lucide-react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface FinanceEvent {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  capacity: number;
  attendees: number;
  category: 'investment' | 'trading' | 'crypto' | 'banking' | 'fintech' | 'personal-finance';
  fee: number;
  organizer: string;
  tags: string[];
  image?: string;
}

const categoryIcons = {
  investment: TrendingUp,
  trading: BarChart3,
  crypto: DollarSign,
  banking: PieChart,
  fintech: BarChart3,
  'personal-finance': DollarSign,
};

const categoryColors = {
  investment: 'bg-blue-100 text-blue-800 border-blue-200',
  trading: 'bg-green-100 text-green-800 border-green-200',
  crypto: 'bg-orange-100 text-orange-800 border-orange-200',
  banking: 'bg-purple-100 text-purple-800 border-purple-200',
  fintech: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'personal-finance': 'bg-pink-100 text-pink-800 border-pink-200',
};

const mockEvents: FinanceEvent[] = [
  {
    id: '1',
    title: 'Cryptocurrency Investment Workshop',
    description: 'Learn the fundamentals of cryptocurrency investing, blockchain technology, and portfolio diversification strategies.',
    date: '2025-06-20',
    time: '14:00',
    location: 'Marina Bay Financial Centre, Singapore',
    capacity: 50,
    attendees: 32,
    category: 'crypto',
    fee: 85,
    organizer: 'CryptoSG Community',
    tags: ['Blockchain', 'Bitcoin', 'Ethereum', 'Investment'],
  },
  {
    id: '2',
    title: 'Personal Finance Mastery Seminar',
    description: 'Master your personal finances with budgeting, saving strategies, and retirement planning tips from certified financial planners.',
    date: '2025-06-25',
    time: '19:00',
    location: 'Raffles City Convention Centre',
    capacity: 100,
    attendees: 78,
    category: 'personal-finance',
    fee: 0,
    organizer: 'FinanceWise SG',
    tags: ['Budgeting', 'Retirement', 'Savings', 'Planning'],
  },
  {
    id: '3',
    title: 'Algorithmic Trading Bootcamp',
    description: 'Intensive 2-day bootcamp covering algorithmic trading strategies, backtesting, and automated trading systems.',
    date: '2025-07-02',
    time: '09:00',
    location: 'One Raffles Quay, Level 18',
    capacity: 30,
    attendees: 15,
    category: 'trading',
    fee: 450,
    organizer: 'TradeTech Academy',
    tags: ['Algorithms', 'Automation', 'Python', 'Backtesting'],
  },
];

export default function FinanceEventsSection() {
  const [events, setEvents] = useState<FinanceEvent[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<FinanceEvent[]>(mockEvents);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [startDateFilter, setStartDateFilter] = useState<string>('');
  const [endDateFilter, setEndDateFilter] = useState<string>('');

  const [newEvent, setNewEvent] = useState<Partial<FinanceEvent>>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: 50,
    category: 'investment',
    fee: 0,
    organizer: '',
    tags: [],
  });

  // LOGIC FIX: Sync with localStorage by using mockEvents as the baseline
  useEffect(() => {
    const stored = localStorage.getItem("joinedEvents");
    if (stored) {
      try {
        const joinedIds: string[] = JSON.parse(stored);
        // Map over mockEvents constant to ensure math is always Original + 1
        const synced = mockEvents.map(ev => ({
          ...ev,
          attendees: joinedIds.includes(ev.id) ? ev.attendees + 1 : ev.attendees
        }));
        setEvents(synced);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    let filtered = [...events];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (startDateFilter || endDateFilter) {
      filtered = filtered.filter(event => {
        const eventDate = event.date;
        if (startDateFilter && eventDate < startDateFilter) return false;
        if (endDateFilter && eventDate > endDateFilter) return false;
        return true;
      });
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedCategory, startDateFilter, endDateFilter]);

  const handleDeleteEvent = (eventId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };
  

  const handleEventClick = (eventId: string) => {
    window.location.href = `/events/${eventId}`;
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.time || !newEvent.location || !newEvent.organizer) {
      alert('Please fill in all required fields');
      return;
    }

    const eventToAdd: FinanceEvent = {
      id: Date.now().toString(),
      title: newEvent.title || '',
      description: newEvent.description || '',
      date: newEvent.date || '',
      time: newEvent.time || '',
      location: newEvent.location || '',
      capacity: newEvent.capacity || 50,
      attendees: 0,
      category: newEvent.category || 'investment',
      fee: newEvent.fee || 0,
      organizer: newEvent.organizer || '',
      tags: newEvent.tags || [],
    };

    setEvents(prev => [eventToAdd, ...prev]);
    setNewEvent({ title: '', description: '', date: '', time: '', location: '', capacity: 50, category: 'investment', fee: 0, organizer: '', tags: [] });
    setShowAddForm(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-SG', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <div className="max-w-7xl mx-auto p-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Finance Events Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover, join, and create finance-focused events. Connect with like-minded professionals,
            learn new skills, and stay ahead in the financial world.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col lg:flex-row w-full items-center gap-4">
              <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events..."
                  className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative w-56">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-11 pl-10 pr-8 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="all">All Categories</option>
                  <option value="investment">Investment</option>
                  <option value="trading">Trading</option>
                  <option value="crypto">Cryptocurrency</option>
                  <option value="banking">Banking</option>
                  <option value="fintech">FinTech</option>
                  <option value="personal-finance">Personal Finance</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">Available from</span>
                <div className="relative w-40">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={startDateFilter}
                    onChange={(e) => setStartDateFilter(e.target.value)}
                    className="w-full h-11 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">To</span>
                <div className="relative w-40">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={endDateFilter}
                    onChange={(e) => setEndDateFilter(e.target.value)}
                    className="w-full h-11 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredEvents.map((event) => {
            const CategoryIcon = categoryIcons[event.category];
            return (
              <div
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col h-full"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <CategoryIcon className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[event.category]}`}>
                    {event.category.replace('-', ' ')}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {formatDate(event.date)} at {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      {event.attendees}/{event.capacity} attendees
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-500">by {event.organizer}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEvent(event.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Finance Event</h2>
                  <button onClick={() => setShowAddForm(false)}>✕</button>
               </div>
               <button onClick={handleAddEvent} className="w-full bg-blue-600 text-white p-2 rounded">Create Event</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}