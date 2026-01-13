
import React, { useState } from 'react';
import type { ForumPost } from '../types';

interface CommunityProps {
    currentUser: string;
    forumPosts: ForumPost[];
    onAddPost: (content: string) => void;
}

const Community: React.FC<CommunityProps> = ({ currentUser, forumPosts, onAddPost }) => {
    const [activeTab, setActiveTab] = useState<'leaderboard' | 'forum'>('leaderboard');
    const [newPost, setNewPost] = useState('');

    // Dummy Leaderboard Data
    const leaderboard = [
        { rank: 1, name: 'CryptoMaster', profit: '+1,240%', equity: '$124,500' },
        { rank: 2, name: 'SatoshiFan', profit: '+890%', equity: '$98,200' },
        { rank: 3, name: 'MoonWalker', profit: '+450%', equity: '$54,100' },
        { rank: 4, name: currentUser, profit: '+12%', equity: '$11,200' }, // Current User Position simulation
        { rank: 5, name: 'HODL_Gang', profit: '-5%', equity: '$9,500' },
    ];

    const handleSubmitPost = (e: React.FormEvent) => {
        e.preventDefault();
        if(newPost.trim()) {
            onAddPost(newPost);
            setNewPost('');
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl text-white shadow-lg">
                <h1 className="text-2xl font-bold">Komunitas Trader 🌏</h1>
                <p className="text-purple-100">Bersaing di Leaderboard & Diskusi Strategi!</p>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-gray-800 rounded-xl">
                <button 
                    onClick={() => setActiveTab('leaderboard')}
                    className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        activeTab === 'leaderboard' ? 'bg-gray-700 text-purple-400 shadow-sm' : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                    🏆 Leaderboard
                </button>
                <button 
                    onClick={() => setActiveTab('forum')}
                    className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        activeTab === 'forum' ? 'bg-gray-700 text-purple-400 shadow-sm' : 'text-gray-400 hover:text-gray-200'
                    }`}
                >
                    💬 Forum Diskusi
                </button>
            </div>

            {/* Leaderboard View */}
            {activeTab === 'leaderboard' && (
                <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 animate-in slide-in-from-bottom-4">
                    <table className="w-full text-left">
                        <thead className="bg-gray-700/50 text-gray-400 text-xs uppercase">
                            <tr>
                                <th className="p-4">Rank</th>
                                <th className="p-4">Trader</th>
                                <th className="p-4 text-right">Profit (%)</th>
                                <th className="p-4 text-right">Total Aset</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {leaderboard.map((user) => (
                                <tr key={user.rank} className={`hover:bg-gray-700/30 transition-colors ${user.name === currentUser ? 'bg-purple-500/10 border-l-4 border-purple-500' : ''}`}>
                                    <td className="p-4">
                                        {user.rank === 1 && '🥇'}
                                        {user.rank === 2 && '🥈'}
                                        {user.rank === 3 && '🥉'}
                                        {user.rank > 3 && `#${user.rank}`}
                                    </td>
                                    <td className="p-4 font-bold text-white">{user.name}</td>
                                    <td className={`p-4 text-right font-mono ${user.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{user.profit}</td>
                                    <td className="p-4 text-right font-mono text-gray-300">{user.equity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Forum View */}
            {activeTab === 'forum' && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4">
                    {/* Input Post */}
                    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                        <form onSubmit={handleSubmitPost} className="flex gap-2">
                            <input 
                                className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="Bagikan strategi atau tanya sesuatu..."
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                            />
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">
                                Post
                            </button>
                        </form>
                    </div>

                    {/* Post List */}
                    <div className="space-y-3">
                        {forumPosts.map(post => (
                            <div key={post.id} className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-lg">{post.avatar}</div>
                                        <div>
                                            <p className="font-bold text-sm text-white">{post.user}</p>
                                            <p className="text-xs text-gray-500">{post.timestamp}</p>
                                        </div>
                                    </div>
                                    <button className="text-gray-500 hover:text-purple-400">•••</button>
                                </div>
                                <p className="text-gray-300 text-sm mb-4">{post.content}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-400 font-medium border-t border-gray-700 pt-3">
                                    <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
                                        ❤️ {post.likes} Suka
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                                        💬 {post.replies} Balasan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Community;
