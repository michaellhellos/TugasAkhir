
import React from 'react';
import type { MentorAccount } from '../types';

interface MentorSelectionProps {
    mentors: MentorAccount[];
    onSelectMentor: (mentor: MentorAccount) => void;
}

const MentorSelection: React.FC<MentorSelectionProps> = ({ mentors, onSelectMentor }) => {
    return (
        <div className="space-y-6 animate-in fade-in">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-500">
                    Pilih Mentor Kamu
                </h1>
                <p className="text-gray-400">
                    Siapa yang cocok nemenin kamu belajar trading? Pilih style-nya!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                    <div 
                        key={mentor.id} 
                        className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 group flex flex-col"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-3xl shadow-inner border border-gray-600 group-hover:scale-110 transition-transform">
                                {mentor.avatar}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">{mentor.name}</h3>
                                <p className="text-sm text-teal-500 font-medium">{mentor.specialty}</p>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm mb-4 flex-grow italic">
                            "{mentor.bio}"
                        </p>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-xs border-b border-gray-700 pb-2">
                                <span className="text-gray-500">Pengalaman</span>
                                <span className="text-white font-semibold">{mentor.yearsExperience} Tahun</span>
                            </div>
                            <div className="flex justify-between text-xs border-b border-gray-700 pb-2">
                                <span className="text-gray-500">Gaya Mengajar</span>
                                <span className="text-white font-semibold">{mentor.style}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => onSelectMentor(mentor)}
                            className="w-full bg-gray-700 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-teal-600"
                        >
                            Pilih {mentor.name.split(' ')[0]} ✨
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MentorSelection;
