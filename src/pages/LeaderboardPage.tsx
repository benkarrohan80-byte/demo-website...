import React, { useState } from 'react';
import { LeaderboardEntry, GameCategory } from '../types';
import { Trophy, Crown, Award, Shield, Flame, Search } from 'lucide-react';

interface LeaderboardPageProps {
  leaderboard: LeaderboardEntry[];
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ leaderboard }) => {
  const [tab, setTab] = useState<'players' | 'teams'>('players');
  const [gameFilter, setGameFilter] = useState<GameCategory | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = leaderboard.filter(item => {
    if (gameFilter !== 'ALL' && item.game !== gameFilter) return false;
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#090a0f] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 mb-4 backdrop-blur-md">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-300">Global Esports Rankings</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">Leaderboard & Hall of Fame</h1>
          <p className="text-sm text-gray-400 mt-2">Ranking India's most lethal battle royale and tactical shooters pro players.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 p-6 rounded-3xl shadow-xl">
          
          {/* Players vs Teams Tab */}
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-purple-500/20">
            <button
              onClick={() => setTab('players')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                tab === 'players' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              👑 Top Players
            </button>
            <button
              onClick={() => setTab('teams')}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                tab === 'teams' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              🛡️ Top Clans / Teams
            </button>
          </div>

          {/* Game filter & Search */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex flex-wrap gap-1.5">
              {['ALL', 'Battle Royale', 'Clash Squad'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGameFilter(g as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    gameFilter === g ? 'bg-purple-600 text-white' : 'bg-slate-950 text-gray-300 border border-purple-500/20 hover:bg-purple-900/20'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search pro gamer..."
                className="pl-9 pr-4 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-white text-xs focus:outline-none focus:border-purple-400 w-full sm:w-48"
              />
            </div>
          </div>

        </div>

        {/* Leaderboard Table */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-purple-500/20 text-xs text-gray-400 uppercase bg-purple-950/20">
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Player / Gamer</th>
                  <th className="py-4 px-6">Title Game</th>
                  <th className="py-4 px-6">Tier Badge</th>
                  <th className="py-4 px-6">Matches Won</th>
                  <th className="py-4 px-6">Total Winnings</th>
                  <th className="py-4 px-6">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10 text-sm">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">No pro players found matching criteria.</td>
                  </tr>
                ) : (
                  filtered.map((item, idx) => (
                    <tr key={item.userId} className="hover:bg-purple-900/10 transition-colors">
                      <td className="py-4 px-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                          item.rank === 1 ? 'bg-yellow-500 text-slate-950 shadow-lg shadow-yellow-500/30' :
                          item.rank === 2 ? 'bg-slate-300 text-slate-950' :
                          item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-950 text-gray-300 border border-purple-500/20'
                        }`}>
                          #{item.rank}
                        </div>
                      </td>
                      <td className="py-4 px-6 flex items-center space-x-3">
                        <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-xl object-cover border border-purple-500/30" />
                        <div>
                          <span className="font-bold text-white block">{item.name}</span>
                          <span className="text-[10px] text-purple-400 uppercase">Verified Pro</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-950/60 border border-purple-500/30 text-purple-300">
                          {item.game}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950 border border-purple-500/30 text-cyan-300">
                          {item.tier}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-white">{item.wins} Wins</td>
                      <td className="py-4 px-6 font-black text-amber-400">₹{item.earnings.toLocaleString()}</td>
                      <td className="py-4 px-6 font-bold text-cyan-400">{item.score} pts</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
