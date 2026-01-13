
export interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  logo: string;
  sparkline: number[];
}

export interface PortfolioHolding {
  id: string;
  amount: number;
}

export interface Portfolio {
  cash: number;
  holdings: PortfolioHolding[];
  initialValue: number; // Untuk menghitung Profit/Loss
}

export interface Transaction {
    id: string;
    coinId: string;
    type: 'buy' | 'sell';
    amountCrypto: number;
    amountUSD: number;
    priceAtTransaction: number;
    timestamp: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface EducationTopic {
    id: string;
    title: string;
    summary: string;
    emoji: string;
    quizzes: Quiz[];
}

export interface Student {
    id: string;
    name: string;
    avatar: string;
    level: string;
}

export interface MentoringSession {
    id: string;
    title: string;
    mentor: string;
    role: string;
    date: string;
    time: string;
    status: 'upcoming' | 'live' | 'finished';
    description: string;
    students: Student[];
}

export interface MentorAccount {
    id: string;
    name: string;
    email: string;
    password: string;
    specialty: string;
    bio: string; // Deskripsi singkat
    avatar: string; // Emoji atau URL
    yearsExperience: number;
    style: string; // Gaya mengajar (Santai, Tegas, Analitis)
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

export interface UserActivity {
    id: string;
    user: string;
    action: string;
    target: string;
    timestamp: string;
    type: 'trade' | 'quiz' | 'login' | 'mentor';
}

export interface ForumPost {
    id: string;
    user: string;
    avatar: string; // emoji
    content: string;
    likes: number;
    timestamp: string;
    replies: number;
}
