import React, { useState } from 'react';
import { User, Tournament, Transaction, Registration, GameCategory, MatchMode } from '../types';
import { ShieldAlert, Trophy, Users, Coins, TrendingUp, Plus, Edit, Trash2, CheckCircle2, Send, Shield, DollarSign } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface AdminPortalProps {
  currentUser: User | null;
  users: User[];
  tournaments: Tournament[];
  transactions: Transaction[];
  registrations: Registration[];
  onCreateTournament: (newT: Tournament) => void;
  onDeleteTournament: (id: string) => void;
  onUpdateUserDiamonds: (userId: string, newDiamonds: number) => void;
  onSendNotification: (title: string, message: string) => void;
  onOpenAuth: () => void;
}

const revenueData = [
  { month: 'Oct', revenue: 45000, tournaments: 12 },
  { month: 'Nov', revenue: 78000, tournaments: 24 },
  { month: 'Dec', revenue: 120000, tournaments: 35 },
  { month: 'Jan', revenue: 195000, tournaments: 48 },
  { month: 'Feb', revenue: 280000, tournaments: 65 },
  { month: 'Mar', revenue: 350000, tournaments: 82 },
];

export const AdminPortal: React.FC<AdminPortalProps> = ({
  currentUser,
  users,
  tournaments,
  transactions,
  registrations,
  onCreateTournament,
  onDeleteTournament,
  onUpdateUserDiamonds,
  onSendNotification,
  onOpenAuth
}) => {
  const [adminTab, setAdminTab] = useState<'analytics' | 'tournaments' | 'users' | 'transactions' | 'notifications'>('analytics');

  // Create tournament form state
  const [newTitle, setNewTitle] = useState('');
  const [newGame, setNewGame] = useState<GameCategory>('Battle Royale');
  const [newMode, setNewMode] = useState<MatchMode>('Squad');
  const [newEntryFee, setNewEntryFee] = useState(50);
  const [newPrizePool, setNewPrizePool] = useState(25000);
  const [newMap, setNewMap] = useState('Bermuda');
  const [newMaxSlots, setNewMaxSlots] = useState(25);
  const [newBannerUrl, setNewBannerUrl] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800');
  const [newDesc, setNewDesc] = useState('Professional esports tournament with instant diamond payout.');

  // Notification broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#090a0f] flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-red-500/40 p-8 rounded-3xl text-center space-y-4 max-w-md">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
          <h2 className="text-xl font-bold text-white">Admin Access Restricted</h2>
          <p className="text-sm text-gray-400">Please log in with the administrator demo account (admin@shadowx.com) to access the admin portal.</p>
          <button
            onClick={onOpenAuth}
            className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-red-500"
          >
            Switch to Admin Login
          </button>
        </div>
      </div>
    );
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Tournament = {
      id: `t_${Date.now()}`,
      title: newTitle,
      game: newGame,
      mode: newMode,
      entryFee: Number(newEntryFee),
      prizePool: Number(newPrizePool),
      startTime: new Date(Date.now() + 86400000 * 2).toISOString(),
      status: 'Upcoming',
      map: newMap,
      maxSlots: Number(newMaxSlots),
      registeredCount: 0,
      bannerUrl: newBannerUrl,
      description: newDesc,
      rules: ['Standard esports fair play rules apply.', 'No emulators allowed.'],
      roomId: 'SHX_ROOM_' + Math.floor(1000 + Math.random() * 9000),
      roomPassword: 'SHX' + Math.floor(10 + Math.random() * 90)
    };
    onCreateTournament(created);
    setNewTitle('');
    alert('Tournament created successfully!');
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (broadcastTitle && broadcastMsg) {
      onSendNotification(broadcastTitle, broadcastMsg);
      setBroadcastSuccess(true);
      setBroadcastTitle('');
      setBroadcastMsg('');
      setTimeout(() => setBroadcastSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl border border-red-500/30 p-8 rounded-3xl shadow-2xl">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 mb-3">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-red-300">Secure Administrator Control Panel</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">Shadow X Admin Portal</h1>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-2xl border border-red-500/20">
            <button
              onClick={() => setAdminTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                adminTab === 'analytics' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              📊 Analytics
            </button>
            <button
              onClick={() => setAdminTab('tournaments')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                adminTab === 'tournaments' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              🏆 Tournaments
            </button>
            <button
              onClick={() => setAdminTab('users')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                adminTab === 'users' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              👥 Users
            </button>
            <button
              onClick={() => setAdminTab('transactions')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                adminTab === 'transactions' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              💳 Transactions
            </button>
            <button
              onClick={() => setAdminTab('notifications')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                adminTab === 'notifications' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              🔔 Broadcast
            </button>
          </div>
        </div>

        {/* Tab 1: Analytics & Revenue */}
        {adminTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-900/80 border border-red-500/20 p-6 rounded-2xl">
                <span className="block text-xs text-gray-400 uppercase">Total Revenue</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">₹3,50,000</span>
              </div>
              <div className="bg-slate-900/80 border border-red-500/20 p-6 rounded-2xl">
                <span className="block text-xs text-gray-400 uppercase">Registered Users</span>
                <span className="text-2xl font-black text-purple-400 mt-1 block">{users.length}</span>
              </div>
              <div className="bg-slate-900/80 border border-red-500/20 p-6 rounded-2xl">
                <span className="block text-xs text-gray-400 uppercase">Active Tournaments</span>
                <span className="text-2xl font-black text-cyan-400 mt-1 block">{tournaments.length}</span>
              </div>
              <div className="bg-slate-900/80 border border-red-500/20 p-6 rounded-2xl">
                <span className="block text-xs text-gray-400 uppercase">Total Registrations</span>
                <span className="text-2xl font-black text-yellow-400 mt-1 block">{registrations.length}</span>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Esports Platform Revenue & Growth (INR)</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#ef4444', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#ef4444" fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Tournaments Management & Creation */}
        {adminTab === 'tournaments' && (
          <div className="space-y-8">
            
            {/* Create Tournament Form */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8">
              <h3 className="text-xl font-black text-white mb-6">Create New Tournament</h3>
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Tournament Title</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Shadow X Grand Battle 2026"
                      className="w-full px-4 py-3 bg-slate-950 border border-red-500/30 rounded-xl text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Game Category</label>
                    <select
                      value={newGame}
                      onChange={(e) => setNewGame(e.target.value as any)}
                      className="w-full px-4 py-3 bg-slate-950 border border-red-500/30 rounded-xl text-white text-xs focus:outline-none"
                    >
                      <option value="Battle Royale">Battle Royale</option>
                      <option value="Clash Squad">Clash Squad</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Match Mode</label>
                    <select
                      value={newMode}
                      onChange={(e) => setNewMode(e.target.value as any)}
                      className="w-full px-4 py-3 bg-slate-950 border border-red-500/30 rounded-xl text-white text-xs focus:outline-none"
                    >
                      <option value="Solo">Solo</option>
                      <option value="Duo">Duo</option>
                      <option value="Squad">Squad</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Entry Fee (Diamonds 💎)</label>
                    <input
                      type="number"
                      required
                      value={newEntryFee}
                      onChange={(e) => setNewEntryFee(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-950 border border-red-500/30 rounded-xl text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Prize Pool (INR ₹)</label>
                    <input
                      type="number"
                      required
                      value={newPrizePool}
                      onChange={(e) => setNewPrizePool(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-950 border border-red-500/30 rounded-xl text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Max Slots</label>
                    <input
                      type="number"
                      required
                      value={newMaxSlots}
                      onChange={(e) => setNewMaxSlots(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-950 border border-red-500/30 rounded-xl text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Tournament Live</span>
                </button>
              </form>
            </div>

            {/* Existing Tournaments Table */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Manage Tournaments</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-red-500/20 text-xs text-gray-400 uppercase">
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Game</th>
                      <th className="py-3 px-4">Mode</th>
                      <th className="py-3 px-4">Prize Pool</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-500/10 text-sm">
                    {tournaments.map((t) => (
                      <tr key={t.id} className="hover:bg-red-950/10 transition-colors">
                        <td className="py-4 px-4 font-bold text-white">{t.title}</td>
                        <td className="py-4 px-4 text-purple-300">{t.game}</td>
                        <td className="py-4 px-4 text-gray-300">{t.mode}</td>
                        <td className="py-4 px-4 text-amber-400">₹{t.prizePool.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            t.status === 'Live' ? 'bg-red-600 text-white' : 'bg-purple-950 text-purple-300'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => onDeleteTournament(t.id)}
                            className="p-2 rounded-lg bg-red-950/50 text-red-400 hover:bg-red-900 transition-colors"
                            title="Delete Tournament"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Users Management */}
        {adminTab === 'users' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Manage User Accounts & Diamonds</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-red-500/20 text-xs text-gray-400 uppercase">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Diamonds 💎</th>
                    <th className="py-3 px-4">Tier</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-500/10 text-sm">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-red-950/10 transition-colors">
                      <td className="py-4 px-4 flex items-center space-x-3">
                        <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-lg object-cover" />
                        <span className="font-bold text-white">{u.name}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-400">{u.email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          u.role === 'admin' ? 'bg-red-600 text-white' : 'bg-slate-800 text-gray-300'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-cyan-300">{u.diamonds} 💎</td>
                      <td className="py-4 px-4 text-purple-300">{u.tier}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => {
                            const val = prompt(`Adjust diamonds for ${u.name}:`, String(u.diamonds));
                            if (val !== null) {
                              onUpdateUserDiamonds(u.id, Number(val));
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-300 border border-red-500/30 text-xs font-bold hover:bg-red-600 hover:text-white transition-all"
                        >
                          Edit Diamonds
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Transactions */}
        {adminTab === 'transactions' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Platform Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-red-500/20 text-xs text-gray-400 uppercase">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Diamonds</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-500/10 text-sm">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-red-950/10 transition-colors">
                      <td className="py-4 px-4 font-bold text-white">{tx.userName}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          tx.type === 'Credit' ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{tx.description}</td>
                      <td className="py-4 px-4 font-bold text-cyan-300">{tx.amountDiamonds} 💎</td>
                      <td className="py-4 px-4 text-xs text-gray-400">{tx.timestamp}</td>
                      <td className="py-4 px-4 text-emerald-400 font-semibold">{tx.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Broadcast Notifications */}
        {adminTab === 'notifications' && (
          <div className="bg-slate-900/80 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-black text-white mb-6">Send Platform Broadcast Notification</h3>
            
            {broadcastSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs text-center flex items-center justify-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Notification successfully broadcasted to all active players!</span>
              </div>
            )}

            <form onSubmit={handleBroadcastSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Notification Title</label>
                <input
                  type="text"
                  required
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="🔥 Weekend Prize Pool Boosted!"
                  className="w-full px-4 py-3 bg-slate-950 border border-red-500/30 rounded-xl text-white text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase">Message Body</label>
                <textarea
                  required
                  rows={4}
                  value={broadcastMsg}
                  onChange={(e) => setBroadcastMsg(e.target.value)}
                  placeholder="All registered players receive +100 bonus diamonds for participating in BGMI squad cup."
                  className="w-full px-4 py-3 bg-slate-950 border border-red-500/30 rounded-xl text-white text-xs focus:outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Broadcast to All Users</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
