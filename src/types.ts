export type GameCategory = 'Battle Royale' | 'Clash Squad';
export type MatchMode = 'Solo' | 'Duo' | 'Squad';
export type TournamentStatus = 'Upcoming' | 'Live' | 'Completed';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  diamonds: number;
  inGameId: string;
  phone: string;
  totalEarnings: number; // in diamonds
  matchesPlayed: number;
  wins: number;
  kdRatio: number;
  tier: 'Grandmaster' | 'Challenger' | 'Apex Predator' | 'Immortal';
  createdAt: string;
}

export interface Tournament {
  id: string;
  title: string;
  game: GameCategory;
  mode: MatchMode;
  entryFee: number; // in diamonds
  prizePool: number; // in diamonds (guaranteed platform profit structure)
  startTime: string;
  status: TournamentStatus;
  map: string;
  maxSlots: number;
  registeredCount: number;
  bannerUrl: string;
  description: string;
  rules: string[];
  roomId?: string;
  roomPassword?: string;
  winnerTeam?: string;
}

export interface Registration {
  id: string;
  userId: string;
  userName: string;
  tournamentId: string;
  tournamentTitle: string;
  game: GameCategory;
  entryFeePaid: number;
  teamName?: string;
  teammates?: string[];
  registeredAt: string;
  status: 'Confirmed' | 'Pending Approval' | 'Cancelled';
  slotNumber?: number;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'Credit' | 'Debit' | 'Withdrawal';
  amountDiamonds: number;
  description: string;
  timestamp: string;
  status: 'Success' | 'Pending' | 'Failed';
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'tournament' | 'wallet' | 'system' | 'win';
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  game: GameCategory;
  score: number;
  earnings: number; // in diamonds
  wins: number;
  tier: string;
  badgeUrl?: string;
}

export interface DiamondPackage {
  id: string;
  diamonds: number;
  bonusDiamonds: number;
  priceDiamonds: number; // Cost in platform currency / diamonds or INR topup voucher equivalent
  popular?: boolean;
}
