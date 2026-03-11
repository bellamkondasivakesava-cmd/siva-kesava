import React from 'react';
import { useAuth } from './AuthContext';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  MessageSquare, 
  Phone, 
  Map as MapIcon,
  ChevronRight,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Safety Checks', value: '12', icon: <Shield className="w-5 h-5 text-teal-600" /> },
    { label: 'Saved Contacts', value: '3', icon: <Phone className="w-5 h-5 text-red-600" /> },
    { label: 'Chat History', value: '24', icon: <MessageSquare className="w-5 h-5 text-blue-600" /> },
  ];

  const quickActions = [
    { id: 'chat', title: 'Safety Chat', desc: 'Ask AI for safety advice', icon: <MessageSquare className="w-6 h-6" />, color: 'bg-teal-500' },
    { id: 'map', title: 'Safety Map', desc: 'Find nearby safe zones', icon: <MapIcon className="w-6 h-6" />, color: 'bg-blue-500' },
    { id: 'contacts', title: 'Emergency', desc: 'Manage trusted contacts', icon: <Phone className="w-6 h-6" />, color: 'bg-red-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={user?.photoURL || 'https://via.placeholder.com/100'} 
                alt="Profile" 
                className="w-24 h-24 rounded-3xl object-cover border-4 border-teal-50 shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-2 -right-2 bg-teal-500 p-2 rounded-xl shadow-lg border-2 border-white">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-slate-900">{user?.displayName}</h1>
              <p className="text-slate-500 flex items-center mt-1">
                <User className="w-4 h-4 mr-2" />
                {user?.email}
              </p>
              <div className="mt-3 flex gap-2">
                <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Verified Traveler</span>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Pro Plan</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={logout}
              className="flex items-center px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Actions */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
                  <span className="text-xs text-slate-400 font-bold uppercase">Lifetime</span>
                </div>
                <p className="text-2xl font-display font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => onNavigate(action.id)}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
                >
                  <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <h3 className="font-bold text-slate-900">{action.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{action.desc}</p>
                  <ChevronRight className="w-4 h-4 text-slate-300 mt-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h2 className="font-display font-bold text-slate-900">Recent Safety Activity</h2>
              <button className="text-teal-600 text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-teal-50 p-3 rounded-xl">
                      <Shield className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Safety Check: London</p>
                      <p className="text-xs text-slate-500">Verified night-time safety in Soho area</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">Secure</p>
                    <p className="text-[10px] text-slate-400 flex items-center justify-end">
                      <Clock className="w-3 h-3 mr-1" />
                      2h ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tips & Status */}
        <div className="space-y-8">
          <div className="bg-teal-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-display font-bold mb-2">Safety Status: High</h3>
              <p className="text-teal-100 text-sm mb-6">Your current location is verified as safe. Stay alert in crowded areas.</p>
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wider mb-2">Daily Safety Tip</p>
                <p className="text-sm italic">"Keep a digital copy of your passport in a secure cloud folder accessible offline."</p>
              </div>
            </div>
            <Shield className="absolute -bottom-10 -right-10 w-48 h-48 text-white/10" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-display font-bold text-slate-900 mb-4">Emergency Readiness</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Contacts Setup</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">Complete</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[100%]" />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Local Map Cached</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">Partial</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[65%]" />
              </div>
            </div>
            <button 
              onClick={() => onNavigate('tips')}
              className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Improve Readiness
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
