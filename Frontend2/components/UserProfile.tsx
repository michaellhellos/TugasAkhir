
import React from 'react';
import { UserIcon, EmailIcon, LockIcon } from './Icons';

interface UserProfileProps {
    user: { name: string; email?: string };
    onClose: () => void;
    onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onClose, onLogout }) => {
    
    const handleResetPassword = () => {
        alert(`Link reset password telah dikirim ke email: ${user.email || 'user@example.com'}. Silakan cek inbox Anda.`);
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Profil berhasil diperbarui!");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-sm animate-in fade-in">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl max-w-md w-full relative overflow-hidden animate-in zoom-in-95">
                
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-teal-500 to-blue-600"></div>
                
                <div className="relative px-6 pt-12 pb-6">
                    {/* Avatar */}
                    <div className="w-24 h-24 bg-gray-900 rounded-full border-4 border-gray-800 mx-auto flex items-center justify-center text-4xl shadow-xl relative mb-4">
                        😎
                        <button className="absolute bottom-0 right-0 bg-gray-700 p-1.5 rounded-full border border-gray-600 hover:bg-gray-600">
                            ✏️
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-white">{user.name}</h2>
                    <p className="text-center text-gray-400 text-sm mb-6">{user.email || 'user@email.com'}</p>

                    <form onSubmit={handleSaveProfile} className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Username</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <UserIcon />
                                </div>
                                <input defaultValue={user.name} className="w-full bg-gray-900 border border-gray-600 text-white rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:border-teal-500" />
                            </div>
                        </div>
                        
                         <div>
                            <label className="text-xs text-gray-500 uppercase font-bold ml-1">Email</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <EmailIcon />
                                </div>
                                <input defaultValue={user.email} className="w-full bg-gray-900 border border-gray-600 text-white rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:border-teal-500" />
                            </div>
                        </div>

                        <div className="pt-2">
                             <button type="button" onClick={handleResetPassword} className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2.5 rounded-lg border border-gray-600 transition-colors text-sm font-medium">
                                <LockIcon /> Reset Password
                            </button>
                        </div>

                         <div className="flex gap-3 pt-4 border-t border-gray-700">
                            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 font-medium">
                                Batal
                            </button>
                            <button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg font-bold shadow-lg">
                                Simpan
                            </button>
                        </div>
                    </form>

                     <button onClick={onLogout} className="mt-6 w-full text-center text-red-400 text-sm hover:underline">
                        Log Keluar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
