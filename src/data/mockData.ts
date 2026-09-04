import { User, Tournament, Registration, Transaction, NotificationItem, LeaderboardEntry, DiamondPackage, WithdrawalTier, EconomySettings, PlatformTask, WithdrawalRequest } from '../types';
import { FF_IMAGES } from '../assets/freeFireAssets';

export const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    name: 'ShadowX_Viper',
    email: 'gamer@shadowx.com',
    avatar: FF_IMAGES.characterHayato,
    role: 'user',
    diamonds: 850,
    inGameId: 'FF_58923014',
    totalEarnings: 4520,
    matchesPlayed: 142,
    wins: 38,
    kdRatio: 5.42,
    tier: 'Apex Predator',
    createdAt: '2025-11-10',
    isVerified: true,
  },
  {
    id: 'u2',
    name: 'SupremeAdmin',
    email: 'admin@shadowx.com',
    avatar: FF_IMAGES.characterMoco,
    role: 'admin',
    diamonds: 99999,
    inGameId: 'FF_ADMIN_001',
    totalEarnings: 15000,
    matchesPlayed: 50,
    wins: 50,
    kdRatio: 9.99,
    tier: 'Immortal',
    createdAt: '2025-10-01',
    isVerified: true,
  },
  {
    id: 'u3',
    name: 'Nexus_Phantom',
    email: 'phantom@shadowx.com',
    avatar: FF_IMAGES.characterKelly,
    role: 'user',
    diamonds: 320,
    inGameId: 'FF_77281903',
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
    avatar: FF_IMAGES.characterAlok,
    role: 'user',
    diamonds: 1250,
    inGameId: 'FF_9928172',
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
    avatar: FF_IMAGES.characterChrono,
    role: 'user',
    diamonds: 45,
    inGameId: 'FF_3382910',
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
    bannerUrl: FF_IMAGES.bermudaSquad,
    description: 'The ultimate Free Fire squad championship. Compete against top esports guilds across Bermuda for 1,800 Free Fire Diamonds prize pool.',
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
    title: 'Inferno Clash - Free Fire Solo Showdown',
    game: 'Battle Royale',
    mode: 'Solo',
    entryFee: 30, // 48 slots * 30 = 1440 diamonds collection
    prizePool: 1000, // 1000 diamonds prize pool -> 440 diamonds platform profit!
    startTime: '2026-03-08T20:30:00Z',
    status: 'Live',
    map: 'Purgatory',
    maxSlots: 48,
    registeredCount: 46,
    bannerUrl: FF_IMAGES.purgatorySolo,
    description: 'Prove your solo survival instincts in Purgatory. Fast-paced 1vAll Free Fire custom room showdown with instant diamond payout!',
    rules: [
      'Solo mode only. Teaming or alliance will lead to permanent ban.',
      'Custom room ID & Password will appear on this page 10 mins before match start.'
    ],
    roomId: 'FF_LIVE_883',
    roomPassword: 'BLAZE'
  },
  {
    id: 't3',
    title: 'Free Fire Clash Squad 4v4 Elite Cup',
    game: 'Clash Squad',
    mode: 'Squad',
    entryFee: 100, // 16 slots * 100 = 1600 collection
    prizePool: 1200, // 1200 prize pool -> 400 diamonds platform profit!
    startTime: '2026-03-15T19:00:00Z',
    status: 'Upcoming',
    map: 'Kalahari',
    maxSlots: 16,
    registeredCount: 14,
    bannerUrl: FF_IMAGES.clashSquad,
    description: 'Intense 4v4 Free Fire Clash Squad tournament for elite guilds. Best of 3 custom matches with professional spectator coverage.',
    rules: [
      'Standard competitive rules apply.',
      'All 4 squad members must check-in 10 minutes prior.'
    ]
  },
  {
    id: 't4',
    title: 'Free Fire Kalahari Blitz Duo Championship',
    game: 'Battle Royale',
    mode: 'Duo',
    entryFee: 40, // 32 slots * 40 = 1280 collection
    prizePool: 900, // 900 prize pool -> 380 diamonds platform profit!
    startTime: '2026-03-05T17:00:00Z',
    status: 'Completed',
    map: 'Kalahari',
    maxSlots: 32,
    registeredCount: 32,
    bannerUrl: FF_IMAGES.kalahariDuo,
    description: 'High-octane duo battle royale featuring expert Free Fire rushers and sniper duos.',
    rules: ['Standard duo custom rules.'],
    winnerTeam: 'Guild ShadowX'
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg1',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    inGameId: 'FF_58923014',
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
    userId: 'u3',
    userName: 'Nexus_Phantom',
    inGameId: 'FF_77281903',
    tournamentId: 't1',
    tournamentTitle: 'Shadow X Pro Championship 2026',
    game: 'Battle Royale',
    entryFeePaid: 50,
    teamName: 'Phantom Rushers',
    teammates: ['Ghost_99', 'Shadow_Kill'],
    registeredAt: '2026-03-01T15:10:00Z',
    status: 'Confirmed',
    slotNumber: 3
  },
  {
    id: 'reg3',
    userId: 'u4',
    userName: 'Cyber_Zero',
    inGameId: 'FF_9928172',
    tournamentId: 't1',
    tournamentTitle: 'Shadow X Pro Championship 2026',
    game: 'Battle Royale',
    entryFeePaid: 50,
    teamName: 'Cyber Apex',
    teammates: ['Glitch_OP', 'Byte_Pro'],
    registeredAt: '2026-03-01T16:00:00Z',
    status: 'Confirmed',
    slotNumber: 1
  },
  {
    id: 'reg4',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    inGameId: 'FF_58923014',
    tournamentId: 't2',
    tournamentTitle: 'Inferno Clash - Solo Showdown',
    game: 'Battle Royale',
    entryFeePaid: 30,
    registeredAt: '2026-03-02T10:15:00Z',
    status: 'Confirmed',
    slotNumber: 21
  },
  {
    id: 'reg5',
    userId: 'u5',
    userName: 'Rogue_Assassin',
    inGameId: 'FF_3382910',
    tournamentId: 't2',
    tournamentTitle: 'Inferno Clash - Solo Showdown',
    game: 'Battle Royale',
    entryFeePaid: 30,
    registeredAt: '2026-03-02T11:00:00Z',
    status: 'Confirmed',
    slotNumber: 4
  }
];

export const DEFAULT_WITHDRAWAL_TIERS: WithdrawalTier[] = [
  { id: 'tier_30', title: '₹30 Google Play Redeem Code', valueINR: 30, diamondsCost: 350 },
  { id: 'tier_60', title: '₹60 Google Play Redeem Code', valueINR: 60, diamondsCost: 700, popular: true },
  { id: 'tier_100', title: '₹100 Google Play Redeem Code', valueINR: 100, diamondsCost: 1150, popular: true },
  { id: 'tier_200', title: '₹200 Google Play Redeem Code', valueINR: 200, diamondsCost: 2300 },
];

export const INITIAL_ECONOMY_SETTINGS: EconomySettings = {
  dailyCheckinRewards: [5, 5, 10, 15, 20, 30, 50],
  watchAdReward: 15,
  referralReward: 50,
  referralBonusForFriend: 25,
  dailyAdLimit: 10,
  withdrawalTiers: DEFAULT_WITHDRAWAL_TIERS,
};

export const INITIAL_TASKS: PlatformTask[] = [
  {
    id: 'task_yt',
    title: 'Subscribe Official YouTube Channel',
    description: 'Subscribe to our official YouTube channel and turn on notifications for tournament updates (1-Time Lifetime Reward).',
    category: 'Social',
    rewardDiamonds: 15,
    actionUrl: 'https://youtube.com/@ShadowQueenGaming',
    actionLabel: 'Subscribe Channel',
    verificationType: 'instant',
    resetType: 'lifetime',
    active: true,
  },
  {
    id: 'task_instagram',
    title: 'Follow Official Instagram Handle',
    description: 'Follow our official Instagram page for tournament highlights and giveaways (1-Time Lifetime Reward).',
    category: 'Social',
    rewardDiamonds: 15,
    actionUrl: 'https://instagram.com/shadowqueengaming',
    actionLabel: 'Follow Handle',
    verificationType: 'instant',
    resetType: 'lifetime',
    active: true,
  },
  {
    id: 'task_play_custom',
    title: 'Play 1 Free Fire Tournament Match',
    description: 'Play 1 Free Fire tournament custom match this week. 🔄 Resets every week (Every Monday offers a new chance to earn)!',
    category: 'Gaming',
    rewardDiamonds: 30,
    actionLabel: 'Play Match',
    verificationType: 'instant',
    resetType: 'weekly',
    active: true,
  },
  {
    id: 'task_win_clash',
    title: '1st Booyah of the Week Bonus',
    description: 'Secure your 1st Booyah victory in any tournament custom room this week. 🔄 Resets every week (Every Monday offers a new chance to earn)!',
    category: 'Gaming',
    rewardDiamonds: 70,
    actionLabel: 'Claim Booyah Bonus',
    verificationType: 'instant',
    resetType: 'weekly',
    active: true,
  },
];

export const INITIAL_WITHDRAWAL_REQUESTS: WithdrawalRequest[] = [
  {
    id: 'wreq_1',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    userEmail: 'gamer@shadowx.com',
    inGameId: 'FF_58923014',
    diamondsCost: 700,
    giftCodeAmountINR: 60,
    giftCode: 'GP-8X92-KL4M-9021',
    status: 'Approved',
    requestedAt: '2026-03-01 11:20 AM',
    processedAt: '2026-03-01 11:45 AM',
    remarks: 'Google Play Redeem Code issued successfully.'
  },
  {
    id: 'wreq_2',
    userId: 'u4',
    userName: 'Cyber_Zero',
    userEmail: 'zero@shadowx.com',
    inGameId: 'FF_9928172',
    diamondsCost: 1150,
    giftCodeAmountINR: 100,
    status: 'Pending',
    requestedAt: '2026-03-02 02:10 PM',
    remarks: 'Awaiting administrator verification.'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx1',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    type: 'Earn',
    category: 'task',
    amountDiamonds: 50,
    description: 'Completed Task: Subscribe to Shadow Queen Gaming YouTube',
    timestamp: '2026-03-01 10:15 AM',
    status: 'Success'
  },
  {
    id: 'tx2',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    type: 'Earn',
    category: 'daily_checkin',
    amountDiamonds: 25,
    description: 'Day 3 Daily Check-in Streak Reward',
    timestamp: '2026-03-01 10:30 AM',
    status: 'Success'
  },
  {
    id: 'tx3',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    type: 'TournamentEntry',
    category: 'tournament_entry',
    amountDiamonds: 50,
    description: 'Entry fee for Shadow X Pro Championship (Slot #7)',
    timestamp: '2026-03-01 02:20 PM',
    status: 'Success'
  },
  {
    id: 'tx4',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    type: 'TournamentWin',
    category: 'tournament_win',
    amountDiamonds: 1200,
    description: 'Booyah! Tournament Winnings - 1st Place Squad Prize',
    timestamp: '2026-03-01 08:30 PM',
    status: 'Success'
  },
  {
    id: 'tx5',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    type: 'Withdrawal',
    category: 'gift_code',
    amountDiamonds: 700,
    description: 'Redeemed ₹60 Google Play Redeem Code (GP-8X92-KL4M-9021)',
    timestamp: '2026-03-01 11:20 AM',
    status: 'Success',
    giftCode: 'GP-8X92-KL4M-9021'
  },
  {
    id: 'tx6',
    userId: 'u1',
    userName: 'ShadowX_Viper',
    type: 'TournamentEntry',
    category: 'tournament_entry',
    amountDiamonds: 30,
    description: 'Entry fee for Inferno Clash (Slot #21)',
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
  { rank: 1, userId: 'u4', name: 'Cyber_Zero', avatar: FF_IMAGES.characterAlok, game: 'Free Fire Battle Royale', score: 9840, earnings: 7890, wins: 64, tier: 'Immortal' },
  { rank: 2, userId: 'u1', name: 'ShadowX_Viper', avatar: FF_IMAGES.characterHayato, game: 'Free Fire Battle Royale', score: 8720, earnings: 4520, wins: 38, tier: 'Apex Predator' },
  { rank: 3, userId: 'u3', name: 'Nexus_Phantom', avatar: FF_IMAGES.characterKelly, game: 'Free Fire Clash Squad', score: 7650, earnings: 1850, wins: 19, tier: 'Challenger' },
  { rank: 4, userId: 'u5', name: 'Rogue_Assassin', avatar: FF_IMAGES.characterChrono, game: 'Free Fire Battle Royale', score: 6210, earnings: 920, wins: 11, tier: 'Grandmaster' },
  { rank: 5, userId: 'u_ex1', name: 'Alpha_Strix', avatar: FF_IMAGES.characterMoco, game: 'Free Fire Battle Royale', score: 5890, earnings: 1400, wins: 15, tier: 'Challenger' },
  { rank: 6, userId: 'u_ex2', name: 'Neon_Blade', avatar: FF_IMAGES.characterHayato, game: 'Free Fire Clash Squad', score: 5420, earnings: 1250, wins: 12, tier: 'Challenger' }
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
    a: 'Winnings are credited instantly to your Shadow X Diamond Wallet upon match verification, and can be withdrawn anytime as Google Play Store Redeem Codes.'
  },
  {
    q: 'Is Shadow X Tournament fair and secure?',
    a: 'Yes! We enforce strict anti-emulator policies, spectator verification, and anti-cheat checks for 100% fair competitive matches.'
  }
];
