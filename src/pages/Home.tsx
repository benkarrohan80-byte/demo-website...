import React, { useState } from 'react';
import { Trophy, Gamepad2, Coins, Crown, Users, Sparkles, ArrowRight, Shield, Flame, CheckCircle2, ChevronRight, Star, Send } from 'lucide-react';
import { Tournament, LeaderboardEntry, User } from '../types';
import { FAQS } from '../data/mockData';

interface HomeProps {
  setActiveTab: (tab: string) => void;
  tournaments: Tournament[];
  leaderboard: LeaderboardEntry[];
  currentUser: User | null;
  onOpenAuth: () => void;
  onSelectTournament: (t: Tournament) => void;
}

export const Home: React.FC<HomeProps> = ({
  setActiveTab,
  tournaments,
  leaderboard,
  currentUser,
  onOpenAuth,
  onSelectTournament
}) => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.message) {
      setContactSubmitted(true);
      setContactForm({ name: '', email: '', message: '' });
    }
  };

  const featuredTournaments = tournaments.slice(0, 3);
  const liveTournaments = tournaments.filter(t => t.status === 'Live');
  const upcomingTournaments = tournaments.filter(t => t.status === 'Upcoming');

  return (
    <div className="min-h-screen bg-[#090a0f] text-white">
      
      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-20 pb-32 border-b border-purple-500/20 bg-gradient-to-b from-purple-950/30 via-[#090a0f] to-[#090a0f]">
        
        {/* Glowing Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-red-600/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-300">India's Ultimate Esports Arena 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-tight mb-6">
            Conquer The Battleground <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-red-400 to-blue-400">
              Win Massive Diamond Trophies
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-300 text-base sm:text-lg mb-10 leading-relaxed">
            Register for elite Free Fire MAX, Clash Squad, and Battle Royale tournaments. Experience professional anti-cheat protection, instant diamond payouts, and legendary esports glory.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('tournaments')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-red-600 to-blue-600 text-white font-extrabold text-base shadow-xl shadow-purple-600/30 hover:scale-105 transition-transform flex items-center justify-center space-x-3"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Join Tournament Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            {!currentUser && (
              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 border border-purple-500/40 text-purple-300 font-bold text-base hover:bg-purple-900/20 transition-all flex items-center justify-center space-x-2"
              >
                <Coins className="w-5 h-5 text-amber-400" />
                <span>Claim 300 Free Diamonds</span>
              </button>
            )}
          </div>

          {/* Live Stats Ticker Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl shadow-lg">
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-400">₹1.4 Cr+</div>
              <div className="text-xs text-gray-400 font-medium uppercase mt-1">Total Prize Pool Distributed</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl shadow-lg">
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">48,500+</div>
              <div className="text-xs text-gray-400 font-medium uppercase mt-1">Active Pro Players</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl shadow-lg">
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">1,240+</div>
              <div className="text-xs text-gray-400 font-medium uppercase mt-1">Tournaments Hosted</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl shadow-lg">
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">99.8%</div>
              <div className="text-xs text-gray-400 font-medium uppercase mt-1">Fair Play Accuracy</div>
            </div>
          </div>

        </div>
      </section>

      {/* Live & Featured Tournaments Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center space-x-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4 animate-bounce" />
              <span>Battle Ready</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Featured Tournaments</h2>
          </div>
          <button
            onClick={() => setActiveTab('tournaments')}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-bold text-sm transition-colors"
          >
            <span>View All Tournaments</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTournaments.map((t) => (
            <div
              key={t.id}
              onClick={() => onSelectTournament(t)}
              className="group relative bg-slate-900/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-purple-500/10 cursor-pointer flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={t.bannerUrl} alt={t.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    t.status === 'Live' ? 'bg-red-600 text-white animate-pulse' : 'bg-purple-600/90 text-white'
                  }`}>
                    {t.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 border border-purple-500/30 text-purple-300">
                    {t.game}
                  </span>
                </div>

                {/* Prize Pool Floating Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-slate-950/90 backdrop-blur-md border border-amber-500/40 px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">₹{t.prizePool.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 px-3.5 py-1.5 rounded-xl flex items-center space-x-1.5">
                    <span className="text-sm">💎</span>
                    <span className="text-xs font-bold text-cyan-300">{t.entryFee} Entry</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">{t.title}</h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{t.description}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-purple-500/10">
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-purple-400" />
                      <span>Slots: {t.registeredCount} / {t.maxSlots}</span>
                    </span>
                    <span className="font-semibold text-purple-300">{t.mode} Mode</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-red-500 rounded-full"
                      style={{ width: `${(t.registeredCount / t.maxSlots) * 100}%` }}
                    ></div>
                  </div>

                  <button className="w-full py-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 font-bold text-xs uppercase tracking-wider group-hover:bg-purple-600 group-hover:text-white transition-all flex items-center justify-center space-x-2">
                    <span>View & Register</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard Preview Section */}
      <section className="py-20 bg-slate-950/50 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center space-x-2 text-yellow-400 font-bold text-xs uppercase tracking-widest mb-1">
                <Crown className="w-4 h-4" />
                <span>Hall of Fame</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white">Elite Pro Rankings</h2>
            </div>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className="mt-4 md:mt-0 flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-bold text-sm transition-colors"
            >
              <span>View Full Leaderboard</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Top 3 Podium Cards */}
            {leaderboard.slice(0, 3).map((item, idx) => (
              <div 
                key={item.userId}
                className={`relative bg-slate-900/80 backdrop-blur-xl border rounded-3xl p-6 flex flex-col items-center text-center shadow-xl ${
                  idx === 0 ? 'border-yellow-500/50 bg-gradient-to-b from-yellow-950/20 to-slate-900/80' :
                  idx === 1 ? 'border-purple-500/40' : 'border-blue-500/30'
                }`}
              >
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm bg-slate-950 border border-purple-500/30 text-white">
                  #{item.rank}
                </div>

                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-500 to-red-500 p-[3px] mb-4 shadow-lg">
                  <img src={item.avatar} alt={item.name} className="w-full h-full object-cover rounded-[13px]" />
                </div>

                <h3 className="text-lg font-black text-white">{item.name}</h3>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 mt-1.5">
                  {item.tier}
                </span>

                <div className="w-full grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-purple-500/10 text-center">
                  <div>
                    <span className="block text-[11px] text-gray-400 uppercase">Total Winnings</span>
                    <span className="text-sm font-bold text-amber-400">₹{item.earnings.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-400 uppercase">Wins / Score</span>
                    <span className="text-sm font-bold text-cyan-400">{item.score} pts</span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-purple-300 mt-2 uppercase tracking-wider">Everything you need to know about Shadow X Tournaments</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-white flex items-center justify-between hover:bg-purple-900/10 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-purple-400 transition-transform ${openFaq === idx ? 'rotate-90' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-gray-300 leading-relaxed border-t border-purple-500/10 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-950/80 border-t border-purple-500/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">Contact Esports Support</h2>
            <p className="text-xs text-purple-300 mt-2 uppercase tracking-wider">Our 24/7 support team is here to assist pro players and clans</p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
            {contactSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Received!</h3>
                <p className="text-sm text-gray-300">Our support squad will get back to you via email within 15 minutes.</p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="ShadowX_Viper"
                      className="w-full px-4 py-3 bg-slate-950/90 border border-purple-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="gamer@shadowx.com"
                      className="w-full px-4 py-3 bg-slate-950/90 border border-purple-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase">Message / Issue</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Describe your query regarding tournament slot, room ID, or diamond deposit..."
                    className="w-full px-4 py-3 bg-slate-950/90 border border-purple-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-purple-400 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-red-600 to-blue-600 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Support Ticket</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};
