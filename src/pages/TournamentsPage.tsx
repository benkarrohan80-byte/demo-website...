import React, { useState } from 'react';
import { Tournament, GameCategory, MatchMode, User, Registration } from '../types';
import { Trophy, Gamepad2, Users, Coins, Clock, MapPin, CheckCircle2, Shield, AlertCircle, ArrowRight, X, Key } from 'lucide-react';

interface TournamentsPageProps {
  tournaments: Tournament[];
  currentUser: User | null;
  registrations: Registration[];
  onRegister: (tournament: Tournament, teamName?: string, teammates?: string[]) => void;
  onOpenAuth: () => void;
  selectedTournament: Tournament | null;
  setSelectedTournament: (t: Tournament | null) => void;
}

export const TournamentsPage: React.FC<TournamentsPageProps> = ({
  tournaments,
  currentUser,
  registrations,
  onRegister,
  onOpenAuth,
  selectedTournament,
  setSelectedTournament
}) => {
  const [selectedGame, setSelectedGame] = useState<GameCategory | 'ALL'>('ALL');
  const [selectedMode, setSelectedMode] = useState<MatchMode | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Registration modal state
  const [teamName, setTeamName] = useState('');
  const [teammatesInput, setTeammatesInput] = useState('');
  const [regSuccessMsg, setRegSuccessMsg] = useState('');
  const [regErrorMsg, setRegErrorMsg] = useState('');

  const filteredTournaments = tournaments.filter(t => {
    if (selectedGame !== 'ALL' && t.game !== selectedGame) return false;
    if (selectedMode !== 'ALL' && t.mode !== selectedMode) return false;
    if (selectedStatus !== 'ALL' && t.status !== selectedStatus) return false;
    return true;
  });

  const userRegistrationForSelected = selectedTournament && currentUser
    ? registrations.find(r => r.userId === currentUser.id && r.tournamentId === selectedTournament.id)
    : null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (!selectedTournament) return;

    if (currentUser.diamonds < selectedTournament.entryFee) {
      setRegErrorMsg(`Insufficient diamonds! You need ${selectedTournament.entryFee} 💎 but have ${currentUser.diamonds} 💎.`);
      return;
    }

    const teammatesList = teammatesInput ? teammatesInput.split(',').map(s => s.trim()) : [];
    onRegister(selectedTournament, teamName, teammatesList);
    setRegSuccessMsg('Successfully registered for tournament! Slot allocated.');
    setRegErrorMsg('');
    setTimeout(() => {
      setRegSuccessMsg('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 mb-4 backdrop-blur-md">
            <Gamepad2 className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-300">Esports Battle Arenas</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">Active & Upcoming Tournaments</h1>
          <p className="text-sm text-gray-400 mt-2">Choose your battleground, pay entry fee in diamonds, and claim cash & diamond trophies.</p>
        </div>

        {/* Filters Bar */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 p-6 rounded-3xl mb-10 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Game Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Game Title</label>
            <div className="flex flex-wrap gap-2">
              {['ALL', 'Battle Royale', 'Clash Squad'].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGame(g as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedGame === g
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-slate-950/80 text-gray-300 hover:bg-purple-950/30 border border-purple-500/20'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Match Mode</label>
            <div className="flex flex-wrap gap-2">
              {['ALL', 'Solo', 'Duo', 'Squad'].map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMode(m as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedMode === m
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-slate-950/80 text-gray-300 hover:bg-purple-950/30 border border-purple-500/20'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Status</label>
            <div className="flex flex-wrap gap-2">
              {['ALL', 'Upcoming', 'Live', 'Completed'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStatus(s)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedStatus === s
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-slate-950/80 text-gray-300 hover:bg-purple-950/30 border border-purple-500/20'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Tournament Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTournaments.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-400">
              <Gamepad2 className="w-12 h-12 text-purple-500/40 mx-auto mb-3 animate-pulse" />
              <p className="text-lg font-bold text-white">No tournaments found matching filters.</p>
              <p className="text-xs text-gray-500 mt-1">Try resetting the filter criteria above.</p>
            </div>
          ) : (
            filteredTournaments.map((t) => {
              const isRegistered = currentUser && registrations.some(r => r.userId === currentUser.id && r.tournamentId === t.id);
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTournament(t)}
                  className="group relative bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 shadow-xl cursor-pointer flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={t.bannerUrl} alt={t.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        t.status === 'Live' ? 'bg-red-600 text-white animate-pulse' :
                        t.status === 'Completed' ? 'bg-slate-700 text-gray-300' : 'bg-purple-600 text-white'
                      }`}>
                        {t.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 border border-purple-500/30 text-purple-300">
                        {t.game}
                      </span>
                    </div>

                    {isRegistered && (
                      <div className="absolute top-4 right-4 bg-emerald-600/90 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Registered</span>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="bg-slate-950/90 backdrop-blur-md border border-amber-500/40 px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-amber-300">₹{t.prizePool.toLocaleString()}</span>
                      </div>
                      <div className="bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5">
                        <span className="text-sm">💎</span>
                        <span className="text-xs font-bold text-cyan-300">{t.entryFee} 💎</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">{t.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-red-400" />
                          <span>{t.map}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-blue-400" />
                          <span>{new Date(t.startTime).toLocaleDateString()} {new Date(t.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-purple-500/10">
                      <div className="flex items-center justify-between text-xs text-gray-300">
                        <span className="flex items-center space-x-1">
                          <Users className="w-3.5 h-3.5 text-purple-400" />
                          <span>Slots: {t.registeredCount} / {t.maxSlots}</span>
                        </span>
                        <span className="font-semibold text-purple-300">{t.mode} Mode</span>
                      </div>

                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-red-500 rounded-full"
                          style={{ width: `${(t.registeredCount / t.maxSlots) * 100}%` }}
                        ></div>
                      </div>

                      <button className="w-full py-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 font-bold text-xs uppercase tracking-wider group-hover:bg-purple-600 group-hover:text-white transition-all flex items-center justify-center space-x-2">
                        <span>{isRegistered ? 'View Room & Details' : 'Register Now'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Tournament Details Modal */}
        {selectedTournament && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-[#0d0f17] border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              
              {/* Modal Header Banner */}
              <div className="relative h-56 overflow-hidden flex-shrink-0">
                <img src={selectedTournament.bannerUrl} alt={selectedTournament.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-[#0d0f17]/40 to-transparent"></div>
                
                <button
                  onClick={() => setSelectedTournament(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 border border-purple-500/30 text-gray-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white">
                      {selectedTournament.game}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-cyan-300 border border-purple-500/30">
                      {selectedTournament.mode}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{selectedTournament.title}</h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-900/80 border border-purple-500/20 p-4 rounded-2xl text-center">
                    <span className="block text-xs text-gray-400 uppercase">Prize Pool</span>
                    <span className="text-lg font-bold text-amber-400">₹{selectedTournament.prizePool.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-900/80 border border-purple-500/20 p-4 rounded-2xl text-center">
                    <span className="block text-xs text-gray-400 uppercase">Entry Fee</span>
                    <span className="text-lg font-bold text-cyan-400">{selectedTournament.entryFee} 💎</span>
                  </div>
                  <div className="bg-slate-900/80 border border-purple-500/20 p-4 rounded-2xl text-center">
                    <span className="block text-xs text-gray-400 uppercase">Slots Filled</span>
                    <span className="text-lg font-bold text-purple-400">{selectedTournament.registeredCount} / {selectedTournament.maxSlots}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-2">Tournament Description</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedTournament.description}</p>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-2">Rules & Guidelines</h3>
                  <ul className="space-y-1.5 text-xs text-gray-300 list-disc list-inside">
                    {selectedTournament.rules.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </div>

                {/* Room Credentials Section if Registered or Live */}
                {userRegistrationForSelected ? (
                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 space-y-3">
                    <div className="flex items-center space-x-2 text-purple-300 font-bold text-sm">
                      <Key className="w-5 h-5 text-amber-400" />
                      <span>Room Credentials (Assigned Slot #{userRegistrationForSelected.slotNumber || 7})</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-950 p-3 rounded-xl border border-purple-500/20">
                        <span className="block text-[10px] text-gray-400 uppercase">Room ID</span>
                        <span className="text-sm font-mono font-bold text-cyan-300">{selectedTournament.roomId || 'SHX_ROOM_991'}</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-purple-500/20">
                        <span className="block text-[10px] text-gray-400 uppercase">Room Password</span>
                        <span className="text-sm font-mono font-bold text-red-400">{selectedTournament.roomPassword || 'SHX2026'}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-emerald-400">✓ You are officially registered and secured for this match.</p>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-purple-500/20">
                    {regSuccessMsg && (
                      <div className="mb-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs text-center flex items-center justify-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{regSuccessMsg}</span>
                      </div>
                    )}
                    {regErrorMsg && (
                      <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs text-center">
                        {regErrorMsg}
                      </div>
                    )}

                    {selectedTournament.mode === 'Squad' && (
                      <div className="space-y-3 mb-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Squad / Clan Name</label>
                          <input
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="e.g. Team ShadowX"
                            className="w-full px-4 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-white text-xs focus:outline-none focus:border-purple-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">Teammates (Comma separated usernames)</label>
                          <input
                            type="text"
                            value={teammatesInput}
                            onChange={(e) => setTeammatesInput(e.target.value)}
                            placeholder="Viper_OP, Rox_Alpha, Storm_Z"
                            className="w-full px-4 py-2.5 bg-slate-950 border border-purple-500/30 rounded-xl text-white text-xs focus:outline-none focus:border-purple-400"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleRegisterSubmit}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-red-600 to-blue-600 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
                    >
                      <Coins className="w-4 h-4 text-amber-300" />
                      <span>Register Now (Fee: {selectedTournament.entryFee} 💎)</span>
                    </button>
                    {!currentUser && (
                      <p className="text-center text-xs text-purple-400 mt-2">Please login first to join tournaments.</p>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
