
import React, { useState } from 'react';
import { UserIcon, LockIcon, EmailIcon } from './Icons';

interface AuthScreenProps {
  // Update signature: tambahkan parameter isRegistering
  onLogin: (name: string, email: string | undefined, password: string | undefined, isRegistering: boolean) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && name) {
      // Kirim status isRegistering ke App.tsx
      onLogin(name, email || name, password, isRegistering); 
    } else {
        alert("Mohon isi data dengan lengkap!");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

      <div className="bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md mx-4 relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 mb-2">
                Kripto-Z
            </h1>
            <p className="text-gray-400">
                {isRegistering ? "Buat akun & mulai belajar cuan!" : "Login User / Admin"}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Untuk Login, field ini jadi Username/Email */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
                {isRegistering ? "Username" : "Username / Email"}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <UserIcon />
                </div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder-gray-600"
                    placeholder={isRegistering ? "Contoh: Satoshi" : "admin@admin.com"}
                    required
                />
            </div>
          </div>

          {isRegistering && (
             <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <EmailIcon />
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder-gray-600"
                        placeholder="email@kamu.com"
                    />
                </div>
              </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <LockIcon />
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder-gray-600"
                    placeholder="••••••••"
                    required
                />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3.5 rounded-lg shadow-lg transform transition hover:scale-[1.02] active:scale-95 mt-6"
          >
            {isRegistering ? 'Daftar Sekarang 🚀' : 'Masuk ⚡'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            {isRegistering ? 'Sudah punya akun? ' : 'Belum punya akun? '}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-teal-400 hover:text-teal-300 font-semibold underline decoration-dotted underline-offset-4"
            >
              {isRegistering ? 'Login di sini' : 'Daftar dulu'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
