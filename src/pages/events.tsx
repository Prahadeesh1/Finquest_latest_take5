import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Plus, Filter, Search, DollarSign, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface FinanceEvent {
  id: string;
  title: string;
  description: string;
  date: string;
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
    tags: ['blockchain', 'bitcoin', 'ethereum', 'investment'],
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
    tags: ['budgeting', 'retirement', 'savings', 'planning'],
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
    tags: ['algorithms', 'automation', 'python', 'backtesting'],
  },
];

export default function FinanceEventsSection() {
  const [events, setEvents] = useState<FinanceEvent[]>(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState<FinanceEvent[]>(mockEvents);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(new Set());

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

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedCategory]);

  const handleJoinEvent = (eventId: string) => {
    setEvents(prev => prev.map(event =>
      event.id === eventId
        ? { ...event, attendees: event.attendees + 1 }
        : event
    ));
    setJoinedEvents(prev => new Set([...prev, eventId]));
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
    setNewEvent({
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
    setShowAddForm(false);
  };

  const handleTagInput = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setNewEvent(prev => ({ ...prev, tags }));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-SG', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Renders the navigation bar at the top of the page. */}
      <Navbar/>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 py-12">
            Finance Events Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover, join, and create finance-focused events. Connect with like-minded professionals, 
            learn new skills, and stay ahead in the financial world.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
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
            </div>

            {/* Add Event Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Add Event
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredEvents.map((event) => {
            const CategoryIcon = categoryIcons[event.category];
            const isEventFull = event.attendees >= event.capacity;
            const isJoined = joinedEvents.has(event.id);
            
            return (
              <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <CategoryIcon className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[event.category]}`}>
                    {event.category.replace('-', ' ')}
                  </div>
                  {event.fee === 0 && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Free
                    </div>
                  )}
                </div>

                <div className="p-6">
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
                    {event.fee > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <DollarSign className="w-4 h-4" />
                        ${event.fee}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {event.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{event.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      by {event.organizer}
                    </span>
                    <button
                      onClick={() => handleJoinEvent(event.id)}
                      disabled={isEventFull || isJoined}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isJoined
                          ? 'bg-green-100 text-green-800 cursor-default'
                          : isEventFull
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {isJoined ? 'Joined' : isEventFull ? 'Full' : 'Join Event'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
            <p className="text-gray-500">Try adjusting your search or filters, or add a new event.</p>
          </div>
        )}

        {/* Add Event Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Finance Event</h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                    <input
                      type="text"
                      required
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Investment Strategy Workshop"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe what attendees will learn or experience..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        required
                        value={newEvent.date}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="time"
                        required
                        value={newEvent.time}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      required
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Marina Bay Financial Centre, Singapore"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={newEvent.category}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, category: e.target.value as FinanceEvent['category'] }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="investment">Investment</option>
                        <option value="trading">Trading</option>
                        <option value="crypto">Cryptocurrency</option>
                        <option value="banking">Banking</option>
                        <option value="fintech">FinTech</option>
                        <option value="personal-finance">Personal Finance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                      <input
                        type="number"
                        min="1"
                        value={newEvent.capacity}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fee ($)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={newEvent.fee}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, fee: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organizer</label>
                    <input
                      type="text"
                      required
                      value={newEvent.organizer}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, organizer: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your organization or name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={newEvent.tags?.join(', ')}
                      onChange={(e) => handleTagInput(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., stocks, portfolio, beginners"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddEvent}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Create Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer/>
      </div>
    </div>
  );
}