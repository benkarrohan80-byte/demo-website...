import { User, Tournament, Registration, Transaction, NotificationItem, LeaderboardEntry, DiamondPackage } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    name: 'ShadowX_Viper',
    email: 'gamer@shadowx.com',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=300',
    role: 'user',
    diamonds: 850,
    inGameId: 'FF_58923014',
    phone: '+91 98765 43210',
    totalEarnings: 4520,
    matchesPlayed: 142,
    wins: 38,
    kdRatio: 5.42,
    tier: 'Apex Predator',
    createdAt: '2025-11-10',
  },
  {
    id: 'u2',
    name: 'SupremeAdmin',
    email: 'admin@shadowx.com',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300',
    role: 'admin',
    diamonds: 99999,
    inGameId: 'FF_ADMIN_001',
    phone: '+91 99999 99999',
    totalEarnings: 15000,
    matchesPlayed: 50,
    wins: 50,
    kdRatio: 9.99,
    tier: 'Immortal',
    createdAt: '2025-10-01',
  },
  {
    id: 'u3',
    name: 'Nexus_Phantom',
    email: 'phantom@shadowx.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    role: 'user',
    diamonds: 320,
    inGameId: 'FF_77281903',
    phone: '+91 87654 32109',
    totalEarnings: 1850,
    matchesPlayed: 98,
    wins: 19,
    kdRatio: 4.15,
    tier: 'Challenger',
    createdAt: '2025-12-05',
  },
  {
    id: 'u4',
    name: 'Cyber_Zero',
    email: 'zero@shadowx.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    role: 'user',
    diamonds: 1250,
    inGameId: 'FF_9928172',
    phone: '+91 76543 21098',
    totalEarnings: 7890,
    matchesPlayed: 210,
    wins: 64,
    kdRatio: 6.88,
    tier: 'Immortal',
    createdAt: '2025-09-15',
  },
  {
    id: 'u5',
    name: 'Rogue_Assassin',
    email: 'rogue@shadowx.com',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300',
    role: 'user',
    diamonds: 45,
    inGameId: 'FF_3382910',
    phone: '+91 65432 10987',
    totalEarnings: 920,
    matchesPlayed: 65,
    wins: 11,
    kdRatio: 3.25,
    tier: 'Grandmaster',
    createdAt: '2026-01-12',
  }
];

export const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    title: 'Shadow X Pro Championship 2026 - Squad Battle Royale',
    game: 'Battle Royale',
    mode: 'Squad',
    entryFee: 50, // 48 slots * 50 = 2400 diamonds total pool collection
    prizePool: 1800, // 1800 diamonds distributed -> 600 diamonds guaranteed platform profit!
    startTime: '2026-03-10T18:00:00Z',
    status: 'Upcoming',
    map: 'Bermuda Remastered',
    maxSlots: 48,
    registeredCount: 38,
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    description: 'The ultimate squad championship of the season. Compete against top esports guilds for 1,800 Diamonds prize pool and exclusive diamond badges.',
    rules: [
      'No emulators or third-party scripts allowed. Mobile players only.',
      'All team leaders must join the custom room 15 mins prior to start time.',
      'Screenshots of victory and match rankings mandatory for prize claim.'
    ],
    roomId: 'SHX_FF_9921',
    roomPassword: 'FIREX'
  },
  {
    id: 't2',
    title: 'Inferno Clash - Solo Showdown',
    game: 'Battle Royale',
    mode: 'Solo',
    entryFee: 30, // 48 slots * 30 = 1440 diamonds collection
    prizePool: 1000, // 1000 diamonds prize pool -> 440 diamonds platform profit!
    startTime: '2026-03-08T20:30:00Z',
    status: 'Live',
    map: 'Purgatory',
    maxSlots: 48,
    registeredCount: 46,
    bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    description: 'Prove your solo survival instincts in Inferno Clash. Fast-paced 1vAll custom room showdown with instant diamond payout!',
    rules: [
      'Solo mode only. Teaming or alliance will lead to permanent ban.',
      'Custom room ID & Password will appear on this page 10 mins before match start.'
    ],
    roomId: 'FF_LIVE_883',
    roomPassword: 'BLAZE'
  },
  {
    id: 't3',
    title: 'Clash Squad 4v4 Elite Cup',
    game: 'Clash Squad',
    mode: 'Squad',
    entryFee: 100, // 16 slots * 100 = 1600 collection
    prizePool: 1200, // 1200 prize pool -> 400 diamonds platform profit!
    startTime: '2026-03-15T19:00:00Z',
    status: 'Upcoming',
    map: 'Kalahari',
    maxSlots: 16,
    registeredCount: 14,
    bannerUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800',
    description: 'Intense 4v4 Clash Squad tournament for elite guilds. Best of 3 custom matches with professional spectator coverage.',
    rules: [
      'Standard competitive rules apply.',
      'All 4 squad members must check-in 10 minutes prior.'
    ]
  },
  {
    id: 't4',
    title: 'Blitz Duo Championship',
    game: 'Battle Royale',
    mode: 'Duo',
    entryFee: 40, // 32 slots * 40 = 1280 collection
    prizePool: 900, // 900 prize pool -> 380 diamonds platform profit!
    startTime: '2026-03-05T17:00:00Z',
    status: 'Completed',
    map: 'Alpine',
    maxSlots: 32,
    registeredCount: 32,
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    description: 'High-octane duo battle royale featuring expert rushers and sniper duos.',
    rules: ['Standard duo custom rules.'],
    winnerTeam: 'Guild ShadowX'
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg1',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    tournamentId: 't1',
    tournamentTitle: 'Shadow X Pro Championship 2026',
    game: 'Battle Royale',
    entryFeePaid: 50,
    teamName: 'Team ShadowX Elite',
    teammates: ['Viper_FF', 'Rox_Alok', 'Storm_Kelly'],
    registeredAt: '2026-03-01T14:20:00Z',
    status: 'Confirmed',
    slotNumber: 7
  },
  {
    id: 'reg2',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    tournamentId: 't2',
    tournamentTitle: 'Inferno Clash - Solo Showdown',
    game: 'Battle Royale',
    entryFeePaid: 30,
    registeredAt: '2026-03-02T10:15:00Z',
    status: 'Confirmed',
    slotNumber: 21
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx1',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    type: 'Credit',
    amountDiamonds: 550,
    description: 'Diamond Vault Top-up (500 + 50 Bonus)',
    timestamp: '2026-03-01 12:30 PM',
    status: 'Success'
  },
  {
    id: 'tx2',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    type: 'Debit',
    amountDiamonds: 50,
    description: 'Entry fee for Shadow X Pro Championship',
    timestamp: '2026-03-01 02:20 PM',
    status: 'Success'
  },
  {
    id: 'tx3',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    type: 'Credit',
    amountDiamonds: 1200,
    description: 'Tournament Winnings - 2nd Place Weekly',
    timestamp: '2026-02-28 09:10 PM',
    status: 'Success'
  },
  {
    id: 'tx4',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    type: 'Debit',
    amountDiamonds: 30,
    description: 'Entry fee for Inferno Clash',
    timestamp: '2026-03-02 10:15 AM',
    status: 'Success'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif1',
    userId: 'u1',
    title: 'Tournament Slot Confirmed! 🎮',
    message: 'You have successfully registered for Shadow X Pro Championship. Slot #7 allocated.',
    timestamp: '2 hours ago',
    read: false,
    type: 'tournament'
  },
  {
    id: 'notif2',
    userId: 'u1',
    title: 'Diamond Wallet Credited 💎',
    message: 'Your purchase of 550 Diamonds was credited successfully.',
    timestamp: 'Yesterday',
    read: true,
    type: 'wallet'
  },
  {
    id: 'notif3',
    userId: 'u1',
    title: 'Booyah! Victory Reward 🎉',
    message: 'You won 1,200 Diamonds from the weekly prize pool distribution.',
    timestamp: '3 days ago',
    read: true,
    type: 'win'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, userId: 'u4', name: 'Cyber_Zero', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300', game: 'Battle Royale', score: 9840, earnings: 7890, wins: 64, tier: 'Immortal' },
  { rank: 2, userId: 'u1', name: 'ShadowX_Viper', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=300', game: 'Battle Royale', score: 8720, earnings: 4520, wins: 38, tier: 'Apex Predator' },
  { rank: 3, userId: 'u3', name: 'Nexus_Phantom', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300', game: 'Clash Squad', score: 7650, earnings: 1850, wins: 19, tier: 'Challenger' },
  { rank: 4, userId: 'u5', name: 'Rogue_Assassin', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300', game: 'Battle Royale', score: 6210, earnings: 920, wins: 11, tier: 'Grandmaster' },
  { rank: 5, userId: 'u_ex1', name: 'Alpha_Strix', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300', game: 'Battle Royale', score: 5890, earnings: 1400, wins: 15, tier: 'Challenger' },
  { rank: 6, userId: 'u_ex2', name: 'Neon_Blade', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300', game: 'Clash Squad', score: 5420, earnings: 1250, wins: 12, tier: 'Challenger' }
];

export const DIAMOND_PACKAGES: DiamondPackage[] = [
  { id: 'p1', diamonds: 100, bonusDiamonds: 0, priceDiamonds: 100 },
  { id: 'p2', diamonds: 300, bonusDiamonds: 25, priceDiamonds: 280 },
  { id: 'p3', diamonds: 550, bonusDiamonds: 50, priceDiamonds: 490, popular: true },
  { id: 'p4', diamonds: 1200, bonusDiamonds: 200, priceDiamonds: 990 },
  { id: 'p5', diamonds: 2800, bonusDiamonds: 500, priceDiamonds: 2190 },
  { id: 'p6', diamonds: 6500, bonusDiamonds: 1500, priceDiamonds: 4990 }
];

export const FAQS = [
  {
    q: 'How do I join tournaments on Shadow X?',
    a: 'Create your account, top-up diamonds in your wallet or earn them via referrals, and click "Register Now" on any active Battle Royale or Clash Squad tournament.'
  },
  {
    q: 'How do I receive my Custom Room ID and Password?',
    a: 'Room credentials appear automatically on the tournament details page 10-15 minutes before the match start time for all registered players.'
  },
  {
    q: 'How are diamond prize pools distributed?',
    a: 'Winnings are credited instantly to your Shadow X Diamond Wallet upon match verification, and can be withdrawn anytime to your Free Fire UID or UPI ID.'
  },
  {
    q: 'Is Shadow X Tournament fair and secure?',
    a: 'Yes! We enforce strict anti-emulator policies, spectator verification, and anti-cheat checks for 100% fair competitive matches.'
  }
];
