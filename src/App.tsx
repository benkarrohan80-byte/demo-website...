import React, { useState } from 'react';
import { User, Tournament, Registration, Transaction, NotificationItem, LeaderboardEntry, DiamondPackage } from './types';
import { INITIAL_USERS, INITIAL_TOURNAMENTS, INITIAL_REGISTRATIONS, INITIAL_TRANSACTIONS, INITIAL_NOTIFICATIONS, INITIAL_LEADERBOARD } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { TournamentsPage } from './pages/TournamentsPage';
import { WalletPage } from './pages/WalletPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPortal } from './pages/AdminPortal';
import { AuthModal } from './pages/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]); // default logged in as pro gamer
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Database mock state
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [tournaments, setTournaments] = useState<Tournament[]>(INITIAL_TOURNAMENTS);
  const [registrations, setRegistrations] = useState<Registration[]>(INITIAL_REGISTRATIONS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (!users.some(u => u.id === user.id)) {
      setUsers([user, ...users]);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  const handleRegisterTournament = (tournament: Tournament, teamName?: string, teammates?: string[]) => {
    if (!currentUser) return;

    // Deduct diamonds
    const updatedUser = { ...currentUser, diamonds: currentUser.diamonds - tournament.entryFee };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));

    // Create registration
    const newReg: Registration = {
      id: `reg_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      tournamentId: tournament.id,
      tournamentTitle: tournament.title,
      game: tournament.game,
      entryFeePaid: tournament.entryFee,
      teamName: teamName || 'Solo Contender',
      teammates: teammates || [],
      registeredAt: new Date().toISOString(),
      status: 'Confirmed',
      slotNumber: tournament.registeredCount + 1
    };

    setRegistrations([newReg, ...registrations]);

    // Update tournament registered count
    setTournaments(tournaments.map(t => t.id === tournament.id ? { ...t, registeredCount: t.registeredCount + 1 } : t));

    // Add debit transaction
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'Debit',
      amountDiamonds: tournament.entryFee,
      description: `Entry fee for ${tournament.title}`,
      timestamp: new Date().toLocaleString(),
      status: 'Success'
    };
    setTransactions([newTx, ...transactions]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Tournament Registration Confirmed 🎮',
      message: `You successfully registered for ${tournament.title}. Slot #${newReg.slotNumber} allocated.`,
      timestamp: 'Just now',
      read: false,
      type: 'tournament'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleBuyDiamonds = (pkg: DiamondPackage) => {
    if (!currentUser) return;
    const totalAdded = pkg.diamonds + pkg.bonusDiamonds;
    const updatedUser = { ...currentUser, diamonds: currentUser.diamonds + totalAdded };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'Credit',
      amountDiamonds: totalAdded,
      description: `Diamond Top-up Package (${pkg.diamonds} + ${pkg.bonusDiamonds} Bonus)`,
      timestamp: new Date().toLocaleString(),
      status: 'Success'
    };
    setTransactions([newTx, ...transactions]);

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Diamond Wallet Credited 💎',
      message: `Successfully credited ${totalAdded} Diamonds to your account.`,
      timestamp: 'Just now',
      read: false,
      type: 'wallet'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleWithdrawDiamonds = (amount: number, destination: string) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, diamonds: currentUser.diamonds - amount };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      type: 'Withdrawal',
      amountDiamonds: amount,
      description: `Diamond Withdrawal to UID/UPI: ${destination}`,
      timestamp: new Date().toLocaleString(),
      status: 'Success'
    };
    setTransactions([newTx, ...transactions]);

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Diamond Withdrawal Processed 💸',
      message: `${amount} Diamonds successfully transferred to ${destination}.`,
      timestamp: 'Just now',
      read: false,
      type: 'wallet'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleRedeemPromo = (code: string) => {
    if (code.toUpperCase() === 'SHADOW2026' && currentUser) {
      const updatedUser = { ...currentUser, diamonds: currentUser.diamonds + 50 };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
      return true;
    }
    return false;
  };

  const handleCreateTournament = (newT: Tournament) => {
    setTournaments([newT, ...tournaments]);
  };

  const handleDeleteTournament = (id: string) => {
    setTournaments(tournaments.filter(t => t.id !== id));
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

  return (
    <div className="min-h-screen bg-[#090a0f] text-white flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      
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
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            tournaments={tournaments}
            leaderboard={leaderboard}
            currentUser={currentUser}
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
          />
        )}
        {activeTab === 'wallet' && (
          <WalletPage
            currentUser={currentUser}
            transactions={transactions}
            onBuyDiamonds={handleBuyDiamonds}
            onRedeemPromo={handleRedeemPromo}
            onWithdrawDiamonds={handleWithdrawDiamonds}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}
        {activeTab === 'leaderboard' && (
          <LeaderboardPage leaderboard={leaderboard} />
        )}
        {activeTab === 'dashboard' && (
          <DashboardPage
            currentUser={currentUser}
            registrations={registrations}
            tournaments={tournaments}
            transactions={transactions}
            setActiveTab={setActiveTab}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}
        {activeTab === 'admin' && (
          <AdminPortal
            currentUser={currentUser}
            users={users}
            tournaments={tournaments}
            transactions={transactions}
            registrations={registrations}
            onCreateTournament={handleCreateTournament}
            onDeleteTournament={handleDeleteTournament}
            onUpdateUserDiamonds={handleUpdateUserDiamonds}
            onSendNotification={handleSendNotification}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
