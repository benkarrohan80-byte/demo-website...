import React from 'react';
import { Crown, Shield, Zap, Award, Globe, Heart } from 'lucide-react';

export const Footer: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#050608] border-t border-purple-500/20 text-gray-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-purple-500/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-red-600 p-[2px] shadow-lg">
                <div className="w-full h-full bg-[#090a0f] rounded-[10px] flex items-center justify-center">
                  <Crown className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-400">
                SHADOW X TOURNAMENT
              </span>
            </div>
            <p className="text-sm text-gray-400 pr-4 leading-relaxed">
              India's premier Free Fire esports tournament platform. Compete in Free Fire MAX, Clash Squad, Battle Royale and Ranked Solo with instant diamond payouts and custom room credentials.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <span className="flex items-center space-x-1.5 text-xs text-purple-400 bg-purple-950/40 border border-purple-500/30 px-3 py-1.5 rounded-full">
                <Shield className="w-3.5 h-3.5" />
                <span>Anti-Cheat Protected</span>
              </span>
              <span className="flex items-center space-x-1.5 text-xs text-blue-400 bg-blue-950/40 border border-blue-500/30 px-3 py-1.5 rounded-full">
                <Zap className="w-3.5 h-3.5" />
                <span>Instant Diamond Payouts</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-purple-400 transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tournaments')} className="hover:text-purple-400 transition-colors">Free Fire Tournaments</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('wallet')} className="hover:text-purple-400 transition-colors">Diamond Wallet</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('leaderboard')} className="hover:text-purple-400 transition-colors">Leaderboard</button>
              </li>
            </ul>
          </div>

          {/* Games */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Free Fire Events</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-purple-400 transition-colors cursor-pointer" onClick={() => setActiveTab('tournaments')}>Free Fire MAX Squad</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer" onClick={() => setActiveTab('tournaments')}>Clash Squad 4v4 Elite</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer" onClick={() => setActiveTab('tournaments')}>Solo Showdown Bermuda</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer" onClick={() => setActiveTab('tournaments')}>Custom Room Scrims</li>
            </ul>
          </div>

          {/* Contact / Support */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Support & Legal</h3>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Help Center & FAQs</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Free Fire Fair Play Policy</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 SHADOW X TOURNAMENT. All rights reserved. Built exclusively for Free Fire players.</p>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <span>Powered by Shadow X Engine</span>
            <span>•</span>
            <span className="text-purple-400 font-semibold">Free Fire Esports Arena</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
