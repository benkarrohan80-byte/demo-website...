import React, { useState } from 'react';
import { User, Transaction, DiamondPackage } from '../types';
import { Coins, PlusCircle, ArrowUpRight, ArrowDownLeft, ShieldCheck, Gift, CheckCircle2, Sparkles, Copy, Download, Send } from 'lucide-react';
import { DIAMOND_PACKAGES } from '../data/mockData';

interface WalletPageProps {
  currentUser: User | null;
  transactions: Transaction[];
  onBuyDiamonds: (pkg: DiamondPackage) => void;
  onRedeemPromo: (code: string) => boolean;
  onWithdrawDiamonds?: (amount: number, destination: string) => void;
  onOpenAuth: () => void;
}

export const WalletPage: React.FC<WalletPageProps> = ({
  currentUser,
  transactions,
  onBuyDiamonds,
  onRedeemPromo,
  onWithdrawDiamonds,
  onOpenAuth
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [checkoutPkg, setCheckoutPkg] = useState<DiamondPackage | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Withdrawal state
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(100);
  const [withdrawDestination, setWithdrawDestination] = useState(currentUser?.inGameId || '');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const userTransactions = currentUser
    ? transactions.filter(t => t.userId === currentUser.id)
    : [];

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    const ok = onRedeemPromo(promoCode.trim());
    if (ok) {
      setPromoMsg({ text: 'Success! +50 Bonus Diamonds added to your wallet.', type: 'success' });
      setPromoCode('');
    } else {
      setPromoMsg({ text: 'Invalid or already used promo code. Try "SHADOW2026"', type: 'error' });
    }
  };

  const handleSimulatePayment = () => {
    if (!checkoutPkg) return;
    onBuyDiamonds(checkoutPkg);
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setCheckoutPkg(null);
    }, 2500);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (withdrawAmount <= 0 || withdrawAmount > currentUser.diamonds) {
      alert('Invalid withdrawal amount or insufficient diamonds.');
      return;
    }
    if (onWithdrawDiamonds) {
      onWithdrawDiamonds(withdrawAmount, withdrawDestination);
    } else {
      // fallback simulation
      currentUser.diamonds -= withdrawAmount;
    }
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setWithdrawModalOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 mb-4 backdrop-blur-md">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-300">Secure Diamond Vault</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase">Diamond Wallet & Withdrawals</h1>
          <p className="text-sm text-gray-400 mt-2">Manage your Free Fire diamonds, top-up packs, and withdraw winnings instantly to your Game UID or UPI ID.</p>
        </div>

        {/* Balance Card Widget */}
        <div className="relative bg-gradient-to-r from-purple-950/60 via-slate-900/90 to-blue-950/60 border border-purple-500/40 rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <span className="text-xs uppercase tracking-wider text-purple-300 font-bold">Current Diamond Balance</span>
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-4xl sm:text-6xl">💎</span>
                <span className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-amber-300">
                  {currentUser ? currentUser.diamonds.toLocaleString() : '0'}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">100% Guaranteed Payouts • Instant Transfer</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="bg-slate-950/80 border border-purple-500/30 px-6 py-4 rounded-2xl text-center">
                <span className="block text-xs text-gray-400 uppercase">Total Winnings</span>
                <span className="text-lg font-bold text-emerald-400">{currentUser ? currentUser.totalEarnings.toLocaleString() : '0'} 💎</span>
              </div>
              
              {currentUser ? (
                <button
                  onClick={() => setWithdrawModalOpen(true)}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 font-bold text-sm text-white shadow-lg hover:opacity-95 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Withdraw Diamonds</span>
                </button>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-red-600 font-bold text-sm text-white shadow-lg"
                >
                  Login to Manage Wallet
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Buy Diamonds Packages Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white">Top-Up Diamond Packages</h2>
            <span className="text-xs text-purple-400 font-semibold">⚡ Instant Auto-Credit</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIAMOND_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-slate-900/80 backdrop-blur-xl border rounded-3xl p-6 flex flex-col justify-between transition-all hover:scale-105 shadow-xl ${
                  pkg.popular ? 'border-purple-400 bg-gradient-to-b from-purple-950/40 to-slate-900/80' : 'border-purple-500/20'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-md">
                    Most Popular ⭐
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">💎</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300">
                      {pkg.diamonds + pkg.bonusDiamonds} Total
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white">{pkg.diamonds} Diamonds</h3>
                  {pkg.bonusDiamonds > 0 && (
                    <p className="text-xs text-emerald-400 font-semibold mt-1">+ {pkg.bonusDiamonds} Diamonds Bonus Free!</p>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-purple-500/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block">Cost</span>
                    <span className="text-xl font-black text-cyan-400">{pkg.priceDiamonds} 💎</span>
                  </div>
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        onOpenAuth();
                      } else {
                        setCheckoutPkg(pkg);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-600/30"
                  >
                    Top Up
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Code & Referral Rewards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Promo Code Redeeming */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Redeem Promo Code</h3>
                <p className="text-xs text-gray-400">Enter coupon code to claim bonus diamonds.</p>
              </div>
            </div>

            {promoMsg && (
              <div className={`mb-4 p-3 rounded-xl text-xs font-semibold ${
                promoMsg.type === 'success' ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300' : 'bg-red-950/50 border border-red-500/40 text-red-300'
              }`}>
                {promoMsg.text}
              </div>
            )}

            <form onSubmit={handlePromoSubmit} className="flex gap-3">
              <input
                type="text"
                required
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Try code: SHADOW2026"
                className="flex-1 px-4 py-3 bg-slate-950 border border-purple-500/30 rounded-xl text-white text-sm focus:outline-none focus:border-purple-400"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-purple-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-purple-500"
              >
                Redeem
              </button>
            </form>
          </div>

          {/* Referral Rewards */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Referral Rewards</h3>
                <p className="text-xs text-gray-400">Invite friends & get 100 💎 per signup.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-slate-950 p-3 rounded-xl border border-purple-500/20">
              <input
                type="text"
                readOnly
                value="https://shadowx.esports/ref/VIPER2026"
                className="w-full bg-transparent text-xs text-gray-300 focus:outline-none"
              />
              <button
                onClick={() => alert('Referral link copied to clipboard!')}
                className="p-2 bg-purple-600/30 text-purple-300 rounded-lg hover:bg-purple-600/50 transition-colors"
                title="Copy Link"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">12 friends registered using your referral link so far.</p>
          </div>

        </div>

        {/* Transaction History */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8">
          <h3 className="text-xl font-black text-white mb-6">Recent Wallet Transactions</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-purple-500/20 text-xs text-gray-400 uppercase">
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Diamonds</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10 text-sm">
                {userTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">No transactions recorded yet.</td>
                  </tr>
                ) : (
                  userTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-purple-900/10 transition-colors">
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          tx.type === 'Credit' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' : tx.type === 'Withdrawal' ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30' : 'bg-red-950/60 text-red-300 border border-red-500/30'
                        }`}>
                          {tx.type === 'Credit' ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                          <span>{tx.type}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{tx.description}</td>
                      <td className={`py-4 px-4 font-bold ${tx.type === 'Credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {tx.type === 'Credit' ? '+' : '-'}{tx.amountDiamonds} 💎
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-400">{tx.timestamp}</td>
                      <td className="py-4 px-4">
                        <span className="text-xs text-emerald-400 font-semibold">{tx.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Checkout Modal Simulation */}
        {checkoutPkg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-[#0d0f17] border border-purple-500/30 rounded-3xl p-8 text-center space-y-6">
              
              {paymentSuccess ? (
                <div className="py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Top-Up Successful!</h3>
                  <p className="text-sm text-gray-300">+{checkoutPkg.diamonds + checkoutPkg.bonusDiamonds} Diamonds credited to your wallet.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white">Diamond Vault Checkout</h3>
                  <div className="p-4 bg-slate-900 rounded-2xl border border-purple-500/20 text-left space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Package:</span>
                      <span className="font-bold text-white">{checkoutPkg.diamonds} Diamonds</span>
                    </div>
                    {checkoutPkg.bonusDiamonds > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Bonus:</span>
                        <span className="font-bold text-emerald-400">+{checkoutPkg.bonusDiamonds} Diamonds</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm pt-2 border-t border-purple-500/20">
                      <span className="text-gray-400">Total Price:</span>
                      <span className="font-black text-cyan-400">{checkoutPkg.priceDiamonds} 💎</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleSimulatePayment}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-red-600 to-blue-600 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:opacity-95"
                    >
                      Confirm & Pay {checkoutPkg.priceDiamonds} 💎
                    </button>
                    <button
                      onClick={() => setCheckoutPkg(null)}
                      className="w-full py-3 rounded-xl bg-slate-900 border border-purple-500/20 text-gray-400 hover:text-white text-xs font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        )}

        {/* Withdraw Modal */}
        {withdrawModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-[#0d0f17] border border-emerald-500/30 rounded-3xl p-8 text-center space-y-6">
              
              {withdrawSuccess ? (
                <div className="py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Withdrawal Requested!</h3>
                  <p className="text-sm text-gray-300">{withdrawAmount} 💎 successfully sent to Free Fire UID / UPI ID.</p>
                </div>
              ) : (
                <form onSubmit={handleWithdrawSubmit} className="space-y-4 text-left">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white">Withdraw Diamonds 💎</h3>
                    <p className="text-xs text-gray-400 mt-1">Available balance: {currentUser?.diamonds || 0} 💎</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase tracking-wider">Withdrawal Amount (Diamonds)</label>
                    <input
                      type="number"
                      min={50}
                      max={currentUser?.diamonds || 0}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-950 border border-emerald-500/30 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1 uppercase tracking-wider">Free Fire In-Game UID or UPI VPA</label>
                    <input
                      type="text"
                      required
                      value={withdrawDestination}
                      onChange={(e) => setWithdrawDestination(e.target.value)}
                      placeholder="e.g. FF_58923014 or gamer@upi"
                      className="w-full px-4 py-3 bg-slate-950 border border-emerald-500/30 rounded-xl text-white text-sm focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-sm shadow-lg hover:opacity-95 flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Confirm Withdrawal</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWithdrawModalOpen(false)}
                      className="w-full py-3 rounded-xl bg-slate-900 border border-purple-500/20 text-gray-400 hover:text-white text-xs font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
