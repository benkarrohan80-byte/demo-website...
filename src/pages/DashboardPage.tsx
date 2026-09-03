import React, { useState } from 'react';
import { User, Registration, Transaction, Tournament } from '../types';
import { Trophy, Gamepad2, Coins, Bell, User as UserIcon, Shield, TrendingUp, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

interface DashboardPageProps {
  currentUser: User | null;
  registrations: Registration[];
  tournaments: Tournament[];
  transactions: Transaction[];
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentUser,
  registrations,
  tournaments,
  transactions,
  setActiveTab,
  onOpenAuth
}) => {
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#090a0f] flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-purple-500/30 p-8 rounded-3xl text-center space-y-4 max-w-md">
          <UserIcon className="w-12 h-12 text-purple-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-sm text-gray-400">Please sign in to access your pro gamer dashboard.</p>
          <button
            onClick={onOpenAuth}
            className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  const userRegistrations = registrations.filter(r => r.userId === currentUser.id);
  const userTransactions = transactions.filter(t => t.userId === currentUser.id);

  const winRate = currentUser.matchesPlayed > 0 
    ? Math.round((currentUser.wins / currentUser.matchesPlayed) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-[#090a0f] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Profile Header Banner */}
        <div className="relative bg-gradient-to-r from-purple-950/60 via-slate-900/90 to-blue-950/60 border border-purple-500/40 rounded-3xl p-8 shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-500 to-red-500 p-[3px] shadow-xl">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover rounded-[13px]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">{currentUser.name}</h1>
                <p className="text-xs text-purple-400 font-mono mt-0.5">In-Game ID: {currentUser.inGameId}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-950 border border-purple-500/30 text-purple-300">
                    {currentUser.tier}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-950 border border-blue-500/30 text-blue-300">
                    K/D Ratio: {currentUser.kdRatio}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div 
                onClick={() => setActiveTab('wallet')}
                className="bg-slate-950/80 border border-purple-500/30 px-6 py-4 rounded-2xl text-center cursor-pointer hover:border-purple-400 transition-colors"
              >
                <span className="block text-xs text-gray-400 uppercase">Diamonds Balance</span>
                <div className="flex items-center space-x-1.5 mt-1 justify-center">
                  <span className="text-xl">💎</span>
                  <span className="text-xl font-black text-cyan-300">{currentUser.diamonds.toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Statistics Widgets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl">
            <span className="block text-xs text-gray-400 uppercase">Total Earnings</span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">₹{currentUser.totalEarnings.toLocaleString()}</span>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl">
            <span className="block text-xs text-gray-400 uppercase">Matches Played</span>
            <span className="text-2xl font-black text-purple-400 mt-1 block">{currentUser.matchesPlayed}</span>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl">
            <span className="block text-xs text-gray-400 uppercase">Matches Won</span>
            <span className="text-2xl font-black text-cyan-400 mt-1 block">{currentUser.wins} ({winRate}%)</span>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl">
            <span className="block text-xs text-gray-400 uppercase">Tournaments Joined</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">{userRegistrations.length}</span>
          </div>
        </div>

        {/* Joined Tournaments Section */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-white">Joined Tournaments & Matches</h3>
            <button
              onClick={() => setActiveTab('tournaments')}
              className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center space-x-1"
            >
              <span>Browse More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userRegistrations.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-400">
                <Gamepad2 className="w-10 h-10 text-purple-500/40 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">You haven't joined any tournaments yet.</p>
                <button
                  onClick={() => setActiveTab('tournaments')}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Join Your First Tournament
                </button>
              </div>
            ) : (
              userRegistrations.map((reg) => {
                const tourney = tournaments.find(t => t.id === reg.tournamentId);
                return (
                  <div key={reg.id} className="bg-slate-950/90 border border-purple-500/20 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
                        {reg.game}
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{reg.status} (Slot #{reg.slotNumber})</span>
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-base">{reg.tournamentTitle}</h4>
                    
                    {tourney && (
                      <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/20 text-xs space-y-1">
                        <div className="flex justify-between text-gray-300">
                          <span>Room ID:</span>
                          <span className="font-mono font-bold text-cyan-300">{tourney.roomId || 'SHX_ROOM_991'}</span>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Room Password:</span>
                          <span className="font-mono font-bold text-red-400">{tourney.roomPassword || 'SHX2026'}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
