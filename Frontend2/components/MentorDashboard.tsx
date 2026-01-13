import React, { useState } from 'react';
import type { MentoringSession, MentorAccount } from '../types';


interface MentorDashboardProps {
  currentMentor: MentorAccount;
  allSessions: MentoringSession[];
  onUpdateSessionStatus: (sessionId: string, newStatus: 'upcoming' | 'live' | 'finished') => void;
  onLogout: () => void;
}

const StatCard: React.FC<{ icon: string; label: string; value: string; color: string }> = ({ icon, label, value, color }) => (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-center gap-4 shadow-lg hover:border-gray-600 transition-colors">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-400 text-xs">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const MentorDashboard: React.FC<MentorDashboardProps> = ({ currentMentor, allSessions, onUpdateSessionStatus, onLogout }) => {
  // Filter sesi hanya milik mentor yang sedang login
  const mySessions = allSessions.filter(s => s.mentor === currentMentor.name);

  // State untuk expand detail siswa per sesi
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  const toggleStudents = (sessionId: string) => {
      setExpandedSessionId(expandedSessionId === sessionId ? null : sessionId);
  };

  const handleBroadcast = (sessionTitle: string) => {
      const msg = prompt(`Kirim pesan ke seluruh peserta kelas "${sessionTitle}":`);
      if(msg) alert(`Pesan terkirim ke semua siswa: "${msg}" ✅`);
  }

  const handleUploadMaterial = (sessionTitle: string) => {
      alert(`Simulasi: Materi PDF untuk "${sessionTitle}" berhasil diunggah! 📂`);
  }

  // Kalkulasi Stats Sederhana
  const totalStudents = mySessions.reduce((acc, curr) => acc + (curr.students?.length || 0), 0);
  const totalHours = mySessions.filter(s => s.status === 'finished').length * 1.5; // Asumsi 1.5 jam per sesi

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-poppins">
      <header className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-xl shadow-lg shadow-teal-500/30">
                👨‍🏫
            </div>
            <div>
                <h1 className="text-lg font-bold text-white leading-tight">Mentor Panel</h1>
                <p className="text-xs text-teal-400 font-medium">{currentMentor.specialty}</p>
            </div>
        </div>
        <button onClick={onLogout} className="text-xs bg-red-500/10 text-red-400 px-3 py-1.5 rounded-full hover:bg-red-500/20 border border-red-500/20 transition-all">
            Logout
        </button>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 space-y-8">
          
          {/* Welcome & Stats Section */}
          <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Halo, {currentMentor.name}! 👋</h2>
                <p className="text-gray-400 mt-1">Siap menginspirasi Gen Z hari ini?</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard icon="👥" label="Total Siswa" value={totalStudents.toString()} color="bg-blue-500/20 text-blue-400" />
                  <StatCard icon="⭐" label="Rating Saya" value="4.9/5.0" color="bg-yellow-500/20 text-yellow-400" />
                  <StatCard icon="🎥" label="Jam Mengajar" value={`${totalHours} Jam`} color="bg-purple-500/20 text-purple-400" />
                  <StatCard icon="📅" label="Sesi Aktif" value={mySessions.filter(s => s.status !== 'finished').length.toString()} color="bg-green-500/20 text-green-400" />
              </div>
          </div>

          {/* Sessions List */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                📚 Jadwal & Kelas Kamu
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{mySessions.length}</span>
            </h3>

            <div className="space-y-6">
                {mySessions.length === 0 ? (
                    <div className="text-center p-12 bg-gray-800 rounded-2xl border border-dashed border-gray-700">
                        <p className="text-gray-500">Belum ada jadwal yang ditugaskan Admin untukmu.</p>
                    </div>
                ) : (
                    mySessions.map(session => (
                        <div key={session.id} className={`bg-gray-800 rounded-2xl overflow-hidden border transition-all duration-300 ${session.status === 'live' ? 'border-red-500 shadow-lg shadow-red-900/20' : 'border-gray-700 hover:border-teal-500/30'}`}>
                            
                            {/* Session Header */}
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                                                session.status === 'live' ? 'bg-red-500 text-white border-red-500 animate-pulse' :
                                                session.status === 'finished' ? 'bg-gray-700 text-gray-400 border-gray-600' :
                                                'bg-blue-500/20 text-blue-300 border-blue-500/30'
                                            }`}>
                                                {session.status}
                                            </span>
                                            <span className="text-gray-400 text-xs font-medium bg-gray-700/50 px-2 py-0.5 rounded">
                                                🗓️ {session.date} • ⏰ {session.time}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1 leading-snug">{session.title}</h3>
                                        <p className="text-gray-400 text-sm max-w-2xl">{session.description}</p>
                                    </div>

                                    {/* Action Buttons (Go Live) */}
                                    <div className="flex flex-wrap items-center gap-2">
                                        {session.status === 'upcoming' && (
                                            <button 
                                                onClick={() => onUpdateSessionStatus(session.id, 'live')}
                                                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-transform active:scale-95 flex items-center gap-2 text-sm"
                                            >
                                                🔴 Mulai LIVE
                                            </button>
                                        )}
                                        {session.status === 'live' && (
                                            <button 
                                                onClick={() => onUpdateSessionStatus(session.id, 'finished')}
                                                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors border border-gray-600 text-sm"
                                            >
                                                🏁 Akhiri Sesi
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Management Tools Bar */}
                                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-700 mt-4">
                                    <button 
                                        onClick={() => toggleStudents(session.id)}
                                        className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${
                                            expandedSessionId === session.id 
                                            ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' 
                                            : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                                        }`}
                                    >
                                        👥 Daftar Siswa ({session.students?.length || 0})
                                        <span className={`transition-transform duration-200 ${expandedSessionId === session.id ? 'rotate-180' : ''}`}>▼</span>
                                    </button>

                                    <button 
                                        onClick={() => handleBroadcast(session.title)}
                                        className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                        📢 Broadcast Info
                                    </button>

                                    <button 
                                        onClick={() => handleUploadMaterial(session.title)}
                                        className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                        📂 Upload Materi
                                    </button>
                                </div>
                            </div>

                            {/* Collapsible Student List */}
                            {expandedSessionId === session.id && (
                                <div className="bg-gray-900/50 p-6 border-t border-gray-700 animate-in slide-in-from-top-2 fade-in">
                                    <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Siswa Terdaftar</h4>
                                    
                                    {!session.students || session.students.length === 0 ? (
                                        <p className="text-gray-500 text-sm italic">Belum ada siswa yang mendaftar.</p>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {session.students.map((student) => (
                                                <div key={student.id} className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700">
                                                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-lg">
                                                        {student.avatar}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-white">{student.name}</p>
                                                        <span className="text-[10px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded border border-teal-500/20">
                                                            {student.level}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    ))
                )}
            </div>
          </div>
      </main>
    </div>
  );
};

export default MentorDashboard;
