import React, { useState, useEffect } from 'react';
import { User, Tournament, Registration, Transaction, NotificationItem, PlatformTask, EconomySettings, WithdrawalTier, WithdrawalRequest } from './types';
import { INITIAL_TOURNAMENTS, INITIAL_REGISTRATIONS, INITIAL_TRANSACTIONS, INITIAL_NOTIFICATIONS, INITIAL_TASKS, INITIAL_ECONOMY_SETTINGS, INITIAL_WITHDRAWAL_REQUESTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { TournamentsPage } from './pages/TournamentsPage';
import { WalletPage } from './pages/WalletPage';
import { AdminPortal } from './pages/AdminPortal';
import { AuthModal } from './pages/AuthModal';
import { WithdrawPage } from './pages/WithdrawPage';
import { EarnDiamondsPage } from './pages/EarnDiamondsPage';
import { ProfilePage } from './pages/ProfilePage';
import { FF_IMAGES } from './assets/freeFireAssets';
import { auth, syncUserProfile, logoutFirebase } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitializing, setAuthInitializing] = useState(true);

  // Database state
  const [users, setUsers] = useState<User[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);
  const [registrations, setRegistrations] = useState<Registration[]>(INITIAL_REGISTRATIONS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  
  const [tasks, setTasks] = useState<PlatformTask[]>(INITIAL_TASKS);
  const [economySettings, setEconomySettings] = useState<EconomySettings>(INITIAL_ECONOMY_SETTINGS);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>(INITIAL_WITHDRAWAL_REQUESTS);

  // Persistent Firebase Authentication listener
  useEffect(() => {
    if (!auth) {
      setAuthInitializing(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const userProfile = await syncUserProfile(fbUser);
          setCurrentUser(userProfile);
          setUsers(prev => prev.some(u => u.id === userProfile.id) ? prev : [userProfile, ...prev]);
        } catch (e) {
          console.error('Error syncing user profile:', e);
        }
      } else {
        setCurrentUser(null);
      }
      setAuthInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (!users.some(u => u.id === user.id)) {
      setUsers([user, ...users]);
    }
    setAuthModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutFirebase();
    } catch (e) {
      console.error('Logout error:', e);
    }
    setCurrentUser(null);
    setActiveTab('home');
  };

  const handleRegisterTournament = (
    tournament: Tournament,
    teamName?: string,
    teammates?: string[],
    chosenSlot?: number,
    playerUid?: string
  ) => {
    if (!currentUser) return;

    // Check if already registered
    const existing = registrations.find(
      r => r.userId === currentUser.id && r.tournamentId === tournament.id && r.status === 'Confirmed'
    );
    if (existing) {
      alert(`You are already registered for this tournament in Slot #${existing.slotNumber}!`);
      return;
    }

    // Determine fixed unique slot
    const occupiedSlots = registrations
      .filter(r => r.tournamentId === tournament.id && r.status === 'Confirmed')
      .map(r => r.slotNumber);

    let finalSlot = chosenSlot;
    if (!finalSlot || occupiedSlots.includes(finalSlot) || finalSlot > tournament.maxSlots || finalSlot < 1) {
      for (let s = 1; s <= tournament.maxSlots; s++) {
        if (!occupiedSlots.includes(s)) {
          finalSlot = s;
          break;
        }
      }
    }

    if (!finalSlot) {
      alert('All slots for this tournament are currently full!');
      return;
    }

    // Deduct entry fee if required
    if (tournament.entryFee > 0) {
      if (currentUser.diamonds < tournament.entryFee) {
        alert(`Insufficient Diamonds! You need ${tournament.entryFee} 💎.`);
        return;
      }
      const updatedUser = { ...currentUser, diamonds: currentUser.diamonds - tournament.entryFee };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));

      // Add debit transaction
      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        type: 'TournamentEntry',
        category: 'tournament_entry',
        amountDiamonds: tournament.entryFee,
        description: `Entry fee for ${tournament.title} (Fixed Slot #${finalSlot})`,
        timestamp: new Date().toLocaleString(),
        status: 'Success'
      };
      setTransactions([newTx, ...transactions]);
    }

    // Create fixed slot registration
    const newReg: Registration = {
      id: `reg_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      inGameId: playerUid || currentUser.inGameId,
      tournamentId: tournament.id,
      tournamentTitle: tournament.title,
      game: tournament.game,
      entryFeePaid: tournament.entryFee,
      teamName: teamName || (tournament.mode === 'Solo' ? 'Solo Warrior' : `Team ${currentUser.name}`),
      teammates: teammates || [],
      registeredAt: new Date().toISOString(),
      status: 'Confirmed',
      slotNumber: finalSlot
    };

    setRegistrations([newReg, ...registrations]);

    // Update tournament registered count
    setTournaments(tournaments.map(t => t.id === tournament.id ? { ...t, registeredCount: t.registeredCount + 1 } : t));

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: `Slot #${finalSlot} Confirmed! 🎮`,
      message: tournament.entryFee === 0
        ? `Free entry confirmed for ${tournament.title}! Room ID & Password are now unlocked. Sit strictly in Slot #${finalSlot} in custom room.`
        : `Entry fee confirmed for ${tournament.title}. Room ID & Password are now unlocked! Sit strictly in Slot #${finalSlot} in custom room.`,
      timestamp: 'Just now',
      read: false,
      type: 'tournament'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleClaimDailyBonus = (dayIndex: number, amount: number) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, diamonds: currentUser.diamonds + amount, totalEarnings: (currentUser.totalEarnings || 0) + amount };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'Earn',
      category: 'daily_checkin',
      amountDiamonds: amount,
      description: `Daily Check-in Reward (Day ${dayIndex + 1})`,
      timestamp: new Date().toLocaleString(),
      status: 'Success'
    };
    setTransactions([newTx, ...transactions]);

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Daily Bonus Claimed 💎',
      message: `Successfully credited ${amount} Diamonds for daily check-in.`,
      timestamp: 'Just now',
      read: false,
      type: 'earn'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleCompleteTask = (taskId: string, rewardDiamonds: number) => {
    if (!currentUser) return;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const updatedUser = { ...currentUser, diamonds: currentUser.diamonds + rewardDiamonds, totalEarnings: (currentUser.totalEarnings || 0) + rewardDiamonds };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'Earn',
      category: 'task',
      amountDiamonds: rewardDiamonds,
      description: `Completed Task: ${task.title}`,
      timestamp: new Date().toLocaleString(),
      status: 'Success'
    };
    setTransactions([newTx, ...transactions]);
  };

  const handleApplyReferralCode = (code: string) => {
    if (!currentUser) return false;
    if (code.startsWith('SHX-')) {
      const reward = economySettings.referralBonusForFriend;
      const updatedUser = { ...currentUser, diamonds: currentUser.diamonds + reward, totalEarnings: (currentUser.totalEarnings || 0) + reward };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));

      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        type: 'Earn',
        category: 'referral',
        amountDiamonds: reward,
        description: `Applied Referral Code: ${code}`,
        timestamp: new Date().toLocaleString(),
        status: 'Success'
      };
      setTransactions([newTx, ...transactions]);
      return true;
    }
    return false;
  };

  const handleSubmitWithdrawalRequest = (tier: WithdrawalTier, email: string, inGameId: string, _passwordVerify: string) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, diamonds: currentUser.diamonds - tier.diamondsCost };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newReq: WithdrawalRequest = {
      id: `wreq_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: email,
      inGameId: inGameId || currentUser.inGameId,
      diamondsCost: tier.diamondsCost,
      giftCodeAmountINR: tier.valueINR,
      status: 'Pending',
      requestedAt: new Date().toLocaleString(),
      remarks: 'Awaiting administrator verification.'
    };
    setWithdrawalRequests([newReq, ...withdrawalRequests]);

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'Withdrawal',
      category: 'withdrawal',
      amountDiamonds: tier.diamondsCost,
      description: `Requested ₹${tier.valueINR} Google Play Code`,
      timestamp: new Date().toLocaleString(),
      status: 'Success'
    };
    setTransactions([newTx, ...transactions]);
  };

  const handleUpdateWithdrawalStatus = (requestId: string, newStatus: 'Pending' | 'Approved' | 'Rejected', giftCode?: string, remarks?: string) => {
    setWithdrawalRequests(prev => prev.map(w => {
      if (w.id === requestId) {
        return {
          ...w,
          status: newStatus,
          redeemCode: giftCode || w.redeemCode,
          remarks: remarks || w.remarks,
          processedAt: new Date().toLocaleString()
        };
      }
      return w;
    }));
  };

  const handleCreateTournament = (newT: Tournament) => {
    setTournaments([newT, ...tournaments]);
  };

  const handleUpdateTournament = (updatedT: Tournament) => {
    setTournaments(tournaments.map(t => t.id === updatedT.id ? updatedT : t));
    if (updatedT.roomId) {
      const regUsers = registrations.filter(r => r.tournamentId === updatedT.id && r.status === 'Confirmed');
      regUsers.forEach(r => {
        const notif: NotificationItem = {
          id: `notif_${Date.now()}_${r.userId}`,
          userId: r.userId,
          title: `Room ID & Pass Updated: ${updatedT.title} 🔑`,
          message: `Room ID: ${updatedT.roomId} | Password: ${updatedT.roomPassword || 'None'}. Your slot is Slot #${r.slotNumber}. Join now!`,
          timestamp: 'Just now',
          read: false,
          type: 'tournament'
        };
        setNotifications(prev => [notif, ...prev]);
      });
    }
  };

  const handleDeleteTournament = (id: string) => {
    setTournaments(tournaments.filter(t => t.id !== id));
    setRegistrations(registrations.filter(r => r.tournamentId !== id));
  };

  const handleUpdateRegistrationSlot = (regId: string, newSlot: number) => {
    setRegistrations(registrations.map(r => r.id === regId ? { ...r, slotNumber: newSlot } : r));
  };

  const handleCancelRegistration = (regId: string, refund: boolean = true) => {
    const reg = registrations.find(r => r.id === regId);
    if (!reg) return;

    if (refund && reg.entryFeePaid > 0) {
      const userToRefund = users.find(u => u.id === reg.userId);
      if (userToRefund) {
        const updated = { ...userToRefund, diamonds: userToRefund.diamonds + reg.entryFeePaid };
        setUsers(users.map(u => u.id === updated.id ? updated : u));
        if (currentUser && currentUser.id === userToRefund.id) {
          setCurrentUser(updated);
        }

        const refundTx: Transaction = {
          id: `tx_${Date.now()}`,
          userId: userToRefund.id,
          userName: userToRefund.name,
          type: 'Credit',
          amountDiamonds: reg.entryFeePaid,
          description: `Entry fee refunded for ${reg.tournamentTitle} (Slot #${reg.slotNumber})`,
          timestamp: new Date().toLocaleString(),
          status: 'Success'
        };
        setTransactions([refundTx, ...transactions]);
      }
    }

    setRegistrations(registrations.filter(r => r.id !== regId));
    setTournaments(tournaments.map(t => t.id === reg.tournamentId ? { ...t, registeredCount: Math.max(0, t.registeredCount - 1) } : t));
  };

  const handleUpdateUserDiamonds = (userId: string, newDiamonds: number) => {
    setUsers(users.map(u => u.id === userId ? { ...u, diamonds: newDiamonds } : u));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, diamonds: newDiamonds });
    }
  };

  const handleSendNotification = (title: string, message: string) => {
    if (!currentUser) return;
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      type: 'system'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleMarkNotificationsRead = () => {
    if (!currentUser) return;
    setNotifications(notifications.map(n => n.userId === currentUser.id ? { ...n, read: true } : n));
  };

  const handleUpdateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Profile Updated Successfully! 🎮',
      message: 'Your Free Fire gamer profile and IGN/UID details have been saved.',
      timestamp: 'Just now',
      read: false,
      type: 'system'
    };
    setNotifications([newNotif, ...notifications]);
  };

  if (authInitializing) {
    return (
      <div className="min-h-screen bg-[#06070a] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-pink-500/30 animate-pulse mb-3">
          <span className="text-xl">👑</span>
        </div>
        <p className="text-xs font-bold text-pink-300 uppercase tracking-widest">Verifying Session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06070a] text-white flex flex-col font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      
      {/* Global Fixed Free Fire Background Wallpaper for All Pages */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <img 
          src={FF_IMAGES.bermudaSquad} 
          alt="Free Fire Background Wallpaper" 
          referrerPolicy="no-referrer" 
          className="w-full h-full object-cover opacity-20 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06070a]/90 via-[#06070a]/80 to-[#06070a]"></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-purple-600/15 rounded-full blur-[130px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-red-600/15 rounded-full blur-[140px]"></div>
      </div>

      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        notifications={currentUser ? notifications.filter(n => n.userId === currentUser.id) : []}
        onMarkNotificationsRead={handleMarkNotificationsRead}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            tournaments={tournaments}
            currentUser={currentUser}
            registrations={registrations}
            onOpenAuth={() => setAuthModalOpen(true)}
            onSelectTournament={(t) => {
              setSelectedTournament(t);
              setActiveTab('tournaments');
            }}
          />
        )}
        {activeTab === 'tournaments' && (
          <TournamentsPage
            tournaments={tournaments}
            currentUser={currentUser}
            registrations={registrations}
            onRegister={handleRegisterTournament}
            onOpenAuth={() => setAuthModalOpen(true)}
            selectedTournament={selectedTournament}
            setSelectedTournament={setSelectedTournament}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'earn' && (
          <EarnDiamondsPage
            currentUser={currentUser}
            tasks={tasks}
            economySettings={economySettings}
            onClaimDailyBonus={handleClaimDailyBonus}
            onCompleteTask={handleCompleteTask}
            onApplyReferralCode={handleApplyReferralCode}
            onOpenAuth={() => setAuthModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'wallet' && (
          <WalletPage
            currentUser={currentUser}
            transactions={transactions}
            onOpenAuth={() => setAuthModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'withdraw' && (
          <WithdrawPage
            currentUser={currentUser}
            withdrawalTiers={economySettings.withdrawalTiers}
            withdrawalRequests={withdrawalRequests}
            onSubmitWithdrawalRequest={handleSubmitWithdrawalRequest}
            onOpenAuth={() => setAuthModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'profile' && (
          <ProfilePage
            currentUser={currentUser}
            tournaments={tournaments}
            registrations={registrations}
            transactions={transactions}
            onUpdateProfile={handleUpdateProfile}
            onOpenAuth={() => setAuthModalOpen(true)}
            setActiveTab={setActiveTab}
            onSelectTournament={(t) => {
              setSelectedTournament(t);
              setActiveTab('tournaments');
            }}
          />
        )}
        {activeTab === 'admin' && (
          <AdminPortal
            currentUser={currentUser}
            users={users}
            tournaments={tournaments}
            transactions={transactions}
            registrations={registrations}
            withdrawalRequests={withdrawalRequests}
            onUpdateWithdrawalStatus={handleUpdateWithdrawalStatus}
            onCreateTournament={handleCreateTournament}
            onUpdateTournament={handleUpdateTournament}
            onDeleteTournament={handleDeleteTournament}
            onUpdateRegistrationSlot={handleUpdateRegistrationSlot}
            onCancelRegistration={handleCancelRegistration}
            onUpdateUserDiamonds={handleUpdateUserDiamonds}
            onSendNotification={handleSendNotification}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Auth Modal / Full-screen Gateway for first-time or unverified visitors */}
      <AuthModal
        isOpen={!currentUser || currentUser.isVerified === false || authModalOpen}
        unverifiedUser={currentUser && currentUser.isVerified === false ? currentUser : null}
        onClose={() => {
          if (currentUser && currentUser.isVerified !== false) {
            setAuthModalOpen(false);
          }
        }}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
