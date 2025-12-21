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

// color tags (for the Add Event modal pills)
const tagColors: Record<string, string> = {
  Crypto: "bg-orange-100 text-orange-800",
  Bitcoin: "bg-yellow-100 text-yellow-700",
  Blockchain: "bg-blue-100 text-blue-700",
  Trading: "bg-green-100 text-green-700",
  Automation: "bg-indigo-100 text-indigo-700",
  Python: "bg-yellow-100 text-yellow-800",
  Investment: "bg-blue-100 text-blue-800",
  Budgeting: "bg-pink-100 text-pink-700",
  Portfolio: "bg-slate-100 text-slate-700",
  Beginners: "bg-gray-100 text-gray-700",
  Savings: "bg-teal-100 text-teal-700",
  Retirement: "bg-red-100 text-red-700",
};

// define all possible tags (for dropdown options)
const ALL_TAGS = [
  "Blockchain",
  "Bitcoin",
  "Trading",
  "Automation",
  "Python",
  "Investment",
  "Budgeting",
  "Portfolio",
  "Beginners",
  "Savings",
  "Retirement",
];

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
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(new Set());
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  // date range filters
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

  useEffect(() => {
    let filtered = [...events];

    // search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // date range
    if (startDateFilter || endDateFilter) {
      filtered = filtered.filter(event => {
        const eventDate = event.date; // YYYY-MM-DD
        if (startDateFilter && eventDate < startDateFilter) return false;
        if (endDateFilter && eventDate > endDateFilter) return false;
        return true;
      });
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedCategory, startDateFilter, endDateFilter]);

  const handleJoinEvent = (eventId: string) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === eventId
          ? { ...event, attendees: event.attendees + 1 }
          : event
      )
    );
    setJoinedEvents(prev => new Set([...prev, eventId]));
  };

  // delete handler
  const handleDeleteEvent = (eventId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;

    setEvents(prev => prev.filter(event => event.id !== eventId));

    // clean up joinedEvents set
    setJoinedEvents(prev => {
      const updated = new Set(prev);
      updated.delete(eventId);
      return updated;
    });
  };

  const handleEventClick = (eventId: string) => {
    window.location.href = `/events/${eventId}`;
  };

  const handleAddEvent = () => {
    if (
      !newEvent.title ||
      !newEvent.description ||
      !newEvent.date ||
      !newEvent.time ||
      !newEvent.location ||
      !newEvent.organizer
    ) {
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
    setShowTagDropdown(false);
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Finance Events Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover, join, and create finance-focused events. Connect with like-minded professionals,
            learn new skills, and stay ahead in the financial world.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* LEFT GROUP — Search, Category, Date Filters */}
            <div className="flex flex-col lg:flex-row w-full items-center gap-4">

              {/* Search */}
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

              {/* Category */}
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

              {/* Available From */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  Available from
                </span>

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

              {/* To */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  To
                </span>

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

            {/* RIGHT — Add Event Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition flex items-center gap-2"
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
              <div
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col h-full"  // ⭐ flex + h-full
              >
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

                {/* content becomes flex column */}
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
                    {event.fee > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <DollarSign className="w-4 h-4" />
                        ${event.fee}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {event.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{event.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer with Delete + Join */}
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-500">
                      by {event.organizer}
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Delete button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(event.id);
                        }}
                        className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                        aria-label="Delete event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* Join button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJoinEvent(event.id);
                        }}
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
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No events found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters, or add a new event.
            </p>
          </div>
        )}

        {/* Add Event Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Add New Finance Event
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setShowTagDropdown(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title
                    </label>
                    <input
                      type="text"
                      required
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent(prev => ({ ...prev, title: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Investment Strategy Workshop"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent(prev => ({ ...prev, description: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe what attendees will learn or experience..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={newEvent.date}
                        onChange={(e) =>
                          setNewEvent(prev => ({ ...prev, date: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text.sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        required
                        value={newEvent.time}
                        onChange={(e) =>
                          setNewEvent(prev => ({ ...prev, time: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      value={newEvent.location}
                      onChange={(e) =>
                        setNewEvent(prev => ({ ...prev, location: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Marina Bay Financial Centre, Singapore"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        value={newEvent.category}
                        onChange={(e) =>
                          setNewEvent(prev => ({
                            ...prev,
                            category: e.target.value as FinanceEvent['category'],
                          }))
                        }
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Capacity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newEvent.capacity}
                        onChange={(e) =>
                          setNewEvent(prev => ({
                            ...prev,
                            capacity: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fee ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={newEvent.fee}
                        onChange={(e) =>
                          setNewEvent(prev => ({
                            ...prev,
                            fee: parseFloat(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Organizer
                    </label>
                    <input
                      type="text"
                      required
                      value={newEvent.organizer}
                      onChange={(e) =>
                        setNewEvent(prev => ({ ...prev, organizer: e.target.value }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your organization or name"
                    />
                  </div>

                  {/* Tags dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>

                    {/* Dropdown toggle */}
                    <button
                      type="button"
                      onClick={() => setShowTagDropdown(prev => !prev)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-left focus:ring-2 focus:ring-blue-500"
                    >
                      {newEvent.tags && newEvent.tags.length > 0
                        ? "Add more tags…"
                        : "Select tags…"}
                    </button>

                    {/* Dropdown list */}
                    {showTagDropdown && (
                      <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 flex flex-wrap gap-2">
                        {ALL_TAGS.map(tag => (
                          <span
                            key={tag}
                            onClick={() => {
                              if (!newEvent.tags?.includes(tag)) {
                                setNewEvent(prev => ({
                                  ...prev,
                                  tags: [...(prev.tags || []), tag],
                                }));
                              }
                            }}
                            className={`px-3 py-1 cursor-pointer rounded-full text-sm border 
                              ${tagColors[tag] || "bg-gray-100 text-gray-600"}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Selected tags */}
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {(newEvent.tags || []).map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 border ${tagColors[tag] || "bg-gray-100 text-gray-600"}`}
                        >
                          {tag}
                          <button
                            onClick={() =>
                              setNewEvent(prev => ({
                                ...prev,
                                tags: prev.tags?.filter(t => t !== tag) || [],
                              }))
                            }
                            className="font-bold"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setShowTagDropdown(false);
                      }}
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
      </div>
      <Footer />
    </div>
  );
}
