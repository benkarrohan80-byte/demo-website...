import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Shield, Sparkles, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { User } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'verify'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [inGameId, setInGameId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      const found = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        onLoginSuccess(found);
        onClose();
      } else {
        // create dynamic login user if not found
        const newUser: User = {
          id: `u_${Date.now()}`,
          name: name || email.split('@')[0],
          email: email,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
          role: email.includes('admin') ? 'admin' : 'user',
          diamonds: 500,
          inGameId: 'SHX_' + Math.floor(100000 + Math.random() * 900000),
          phone: '+91 98765 43210',
          totalEarnings: 0,
          matchesPlayed: 0,
          wins: 0,
          kdRatio: 4.5,
          tier: 'Grandmaster',
          createdAt: new Date().toISOString().split('T')[0]
        };
        onLoginSuccess(newUser);
        onClose();
      }
    } else if (mode === 'signup') {
      if (!email || !password || !name) {
        setError('Please fill in all required fields.');
        return;
      }
      setMode('verify');
      setSuccessMsg('Verification code sent to your email!');
    } else if (mode === 'forgot') {
      if (!email) {
        setError('Please enter your email address.');
        return;
      }
      setSuccessMsg('Password reset instructions sent to your email.');
    } else if (mode === 'verify') {
      if (verificationCode.length < 4) {
        setError('Please enter a valid 4-digit verification code.');
        return;
      }
      const newUser: User = {
        id: `u_${Date.now()}`,
        name: name,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300',
        role: email.includes('admin') ? 'admin' : 'user',
        diamonds: 300, // welcome bonus diamonds
        inGameId: inGameId || 'SHX_PRO_' + Math.floor(1000 + Math.random() * 9000),
        phone: '+91 98765 43210',
        totalEarnings: 0,
        matchesPlayed: 0,
        wins: 0,
        kdRatio: 4.0,
        tier: 'Grandmaster',
        createdAt: new Date().toISOString().split('T')[0]
      };
      onLoginSuccess(newUser);
      onClose();
    }
  };

  const handleDemoLogin = (role: 'gamer' | 'admin') => {
    const user = role === 'admin' ? INITIAL_USERS[1] : INITIAL_USERS[0];
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0d0f17] border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-purple-500/20 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-purple-600 to-red-600 mb-3 shadow-lg shadow-purple-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-wide">
            {mode === 'login' && 'Welcome Back, Gamer'}
            {mode === 'signup' && 'Create Shadow X Account'}
            {mode === 'forgot' && 'Reset Password'}
            {mode === 'verify' && 'Verify Your Email'}
          </h2>
          <p className="text-xs text-purple-300 mt-1">
            {mode === 'login' && 'Enter your credentials to access your tournaments & diamonds'}
            {mode === 'signup' && 'Join India\'s premier esports platform & claim 300 bonus diamonds'}
            {mode === 'forgot' && 'We will send a password reset link to your email'}
            {mode === 'verify' && 'Enter the 4-digit code sent to ' + (email || 'your email')}
          </p>
        </div>

        {/* Quick Demo Login Buttons */}
        {mode === 'login' && (
          <div className="mb-6 p-3 rounded-2xl bg-purple-950/30 border border-purple-500/20">
            <p className="text-[11px] font-semibold text-purple-300 mb-2 uppercase tracking-wider text-center">⚡ Instant Demo Login</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('gamer')}
                className="py-2 px-3 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 hover:bg-purple-600/30 text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
              >
                <span>🎮 Pro Gamer</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-2 px-3 rounded-xl bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600/30 text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
              >
                <span>🛡️ Admin Portal</span>
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs text-center">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs text-center flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          
          {(mode === 'signup' || mode === 'verify') && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Gamertag / Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ShadowX_Killer"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-purple-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Free Fire In-Game ID</label>
              <input
                type="text"
                value={inGameId}
                onChange={(e) => setInGameId(e.target.value)}
                placeholder="e.g. 518920491"
                className="w-full px-4 py-3 bg-slate-900/90 border border-purple-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>
          )}

          {mode !== 'verify' && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gamer@shadowx.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-purple-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
            </div>
          )}

          {mode !== 'forgot' && mode !== 'verify' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-purple-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
            </div>
          )}

          {mode === 'verify' && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">4-Digit Verification Code</label>
              <input
                type="text"
                maxLength={4}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="1234 (Enter any 4 digits)"
                className="w-full px-4 py-3 bg-slate-900/90 border border-purple-500/30 rounded-xl text-white text-center tracking-widest text-lg font-bold focus:outline-none focus:border-purple-400 transition-colors"
              />
              <p className="text-[11px] text-gray-400 mt-2 text-center">Simulation: Enter any 4 digits (e.g. 9999) to verify account.</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-red-600 to-blue-600 text-white font-bold text-sm shadow-lg shadow-purple-500/25 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
          >
            <span>
              {mode === 'login' && 'Sign In to Arena'}
              {mode === 'signup' && 'Continue to Verification'}
              {mode === 'forgot' && 'Send Reset Instructions'}
              {mode === 'verify' && 'Complete Verification & Claim Diamonds'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch Mode Footer */}
        <div className="mt-6 text-center text-xs text-gray-400">
          {mode === 'login' && (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-purple-400 font-semibold hover:underline">
                Sign Up Now
              </button>
            </p>
          )}
          {mode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-purple-400 font-semibold hover:underline">
                Sign In
              </button>
            </p>
          )}
          {(mode === 'forgot' || mode === 'verify') && (
            <p>
              Remembered your password?{' '}
              <button onClick={() => setMode('login')} className="text-purple-400 font-semibold hover:underline">
                Back to Login
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
