import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  ArrowLeft,
  Tag,
  Clock,
} from "lucide-react";
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
  category:
    | "investment"
    | "trading"
    | "crypto"
    | "banking"
    | "fintech"
    | "personal-finance";
  fee: number;
  organizer: string;
  tags: string[];
  image?: string;
}

const mockEvents: FinanceEvent[] = [
  {
    id: "1",
    title: "Cryptocurrency Investment Workshop",
    description: "Learn the fundamentals of cryptocurrency investing, blockchain technology, and portfolio diversification strategies.",
    date: "2025-06-20",
    time: "14:00",
    location: "Marina Bay Financial Centre, Singapore",
    capacity: 50,
    attendees: 32,
    category: "crypto",
    fee: 85,
    organizer: "CryptoSG Community",
    tags: ["Blockchain", "Bitcoin", "Ethereum", "Investment"],
  },
  {
    id: "2",
    title: "Personal Finance Mastery Seminar",
    description: "Master your personal finances with budgeting, saving strategies, and retirement planning tips from certified financial planners.",
    date: "2025-06-25",
    time: "19:00",
    location: "Raffles City Convention Centre",
    capacity: 100,
    attendees: 78,
    category: "personal-finance",
    fee: 0,
    organizer: "FinanceWise SG",
    tags: ["Budgeting", "Retirement", "Savings", "Planning"],
  },
  {
    id: "3",
    title: "Algorithmic Trading Bootcamp",
    description: "Intensive 2-day bootcamp covering algorithmic trading strategies, backtesting, and automated trading systems.",
    date: "2025-07-02",
    time: "09:00",
    location: "One Raffles Quay, Level 18",
    capacity: 30,
    attendees: 15,
    category: "trading",
    fee: 450,
    organizer: "TradeTech Academy",
    tags: ["Algorithms", "Automation", "Python", "Backtesting"],
  },
];

const categoryLabels: Record<FinanceEvent["category"], string> = {
  investment: "Investment",
  trading: "Trading",
  crypto: "Cryptocurrency",
  banking: "Banking",
  fintech: "FinTech",
  "personal-finance": "Personal Finance",
};

const categoryBadgeClasses: Record<FinanceEvent["category"], string> = {
  investment: "bg-blue-100 text-blue-800 border-blue-200",
  trading: "bg-green-100 text-green-800 border-green-200",
  crypto: "bg-orange-100 text-orange-800 border-orange-200",
  banking: "bg-purple-100 text-purple-800 border-purple-200",
  fintech: "bg-indigo-100 text-indigo-800 border-indigo-200",
  "personal-finance": "bg-pink-100 text-pink-800 border-pink-200",
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-SG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EventDetailsPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const [joinedEvents, setJoinedEvents] = React.useState<string[]>([]);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("joinedEvents");
      if (stored) {
        setJoinedEvents(JSON.parse(stored));
      }
    } catch (err) {
      console.warn("Failed to load joinedEvents from localStorage", err);
    }
  }, []);

  // LOGIC FIX: Always derive from original mockEvents to prevent double counting
  const baseEvent = mockEvents.find((e) => e.id === eventId);
  const event = baseEvent ? {
    ...baseEvent,
    attendees: joinedEvents.includes(baseEvent.id) ? baseEvent.attendees + 1 : baseEvent.attendees
  } : null;

  const hasJoined = event ? joinedEvents.includes(event.id) : false;

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Event not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const isEventFull = event.attendees >= event.capacity;

  const handleJoin = () => {
    if (isEventFull) {
      alert("This event is currently full.");
      return;
    }
    if (hasJoined) {
      alert("You have already joined this event!");
      return;
    }
    const updatedJoined = [...joinedEvents, event.id];
    setJoinedEvents(updatedJoined);
    localStorage.setItem("joinedEvents", JSON.stringify(updatedJoined));
    alert("You have successfully joined this event!");
  };

  const handleWithdraw = () => {
    if (!hasJoined) return;
    const confirmWithdraw = window.confirm("Are you sure you want to withdraw from this event?");
    if (!confirmWithdraw) return;
    const updatedJoined = joinedEvents.filter((id) => id !== event.id);
    setJoinedEvents(updatedJoined);
    localStorage.setItem("joinedEvents", JSON.stringify(updatedJoined));
    alert("You have successfully withdrawn from this event.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10 lg:py-14">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border mb-3 ${categoryBadgeClasses[event.category]}`}>
                  {categoryLabels[event.category]}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3">{event.title}</h1>
                <p className="text-sm lg:text-base text-blue-100 max-w-2xl">{event.description}</p>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-3">
                <div className="text-sm text-blue-100 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.date)} · {event.time}</span>
                </div>
                <div className="text-sm text-blue-100 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="text-sm text-blue-100 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees}/{event.capacity} attendees</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  {event.fee === 0 ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-xs font-semibold">Free Event</span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/20 text-xs font-semibold">
                      <DollarSign className="w-3 h-3 mr-1" /> ${event.fee.toFixed(2)}
                    </span>
                  )}
                  <button
                    onClick={hasJoined ? handleWithdraw : handleJoin}
                    disabled={isEventFull && !hasJoined}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg transition ${
                      hasJoined ? "bg-red-500 text-white hover:bg-red-600" : isEventFull ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-white text-blue-700 hover:bg-blue-50"
                    }`}
                  >
                    {hasJoined ? "Withdraw" : isEventFull ? "Event Full" : "Join Event"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-8 lg:py-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 mt-0.5 text-blue-600" />
                <div><p className="font-semibold text-gray-800">Date & Time</p><p className="text-gray-600">{formatDate(event.date)} · {event.time}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-600" />
                <div><p className="font-semibold text-gray-800">Location</p><p className="text-gray-600">{event.location}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 mt-0.5 text-blue-600" />
                <div><p className="font-semibold text-gray-800">Capacity</p><p className="text-gray-600">{event.attendees}/{event.capacity} registered</p></div>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
                <p className="text-gray-700 leading-relaxed text-sm">
                  This session is designed to give you practical, actionable strategies that you can immediately apply to your own financial journey.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">What you’ll learn</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside leading-relaxed">
                  {event.category === "crypto" && (
                    <>
                      <li>Core concepts of blockchain and digital assets</li>
                      <li>How to evaluate and manage crypto risks</li>
                      <li>Building a simple, diversified starter portfolio</li>
                    </>
                  )}
                  {event.category === "trading" && (
                    <>
                      <li>Key algorithmic trading concepts and workflows</li>
                      <li>How to backtest and validate your strategies</li>
                      <li>Setting up basic automations using code-friendly tools</li>
                    </>
                  )}
                  {event.category === "personal-finance" && (
                    <>
                      <li>How to build a realistic monthly budget</li>
                      <li>Systems for saving, paying off debt, and planning</li>
                      <li>Frameworks for retirement and long-term goals</li>
                    </>
                  )}
                  {!(event.category === "crypto" || event.category === "trading" || event.category === "personal-finance") && (
                    <>
                      <li>Foundational concepts tailored to this topic</li>
                      <li>Simple frameworks for better financial decisions</li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Who this is for</h3>
                <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside leading-relaxed pl-2">
                  <li>Students and young professionals exploring finance</li>
                  <li>Beginners who want structured guidance</li>
                  <li>Anyone interested in {categoryLabels[event.category].toLowerCase()}</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Agenda (sample)
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><span className="font-medium">00:00 – 00:15</span> · Registration & introductions</li>
                  <li><span className="font-medium">00:15 – 00:45</span> · Core concepts overview</li>
                  <li><span className="font-medium">00:45 – 01:15</span> · Live demo / case study</li>
                  <li><span className="font-medium">01:15 – 01:30</span> · Q&A and networking</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-blue-600" />
                {event.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">{tag}</span>
                ))}
              </div>
              <div className="text-sm text-gray-500">Organised by <span className="font-medium text-gray-700">{event.organizer}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t border-gray-200 px-4 py-3 flex items-center justify-between lg:hidden">
        <div className="flex flex-col text-xs text-gray-600">
          <span className="font-semibold text-gray-900">{event.title}</span>
          <span>{formatDate(event.date)} · {event.time}</span>
        </div>
        <button
          onClick={hasJoined ? handleWithdraw : handleJoin}
          disabled={isEventFull && !hasJoined}
          className={`px-4 py-2 rounded-full text-xs font-semibold ${hasJoined ? "bg-red-500 text-white" : "bg-blue-600 text-white"}`}
        >
          {hasJoined ? "Withdraw" : "Join Event"}
        </button>
      </div>

      <Footer />
    </div>
  );
}