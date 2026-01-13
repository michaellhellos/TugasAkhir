
import React, { useState } from 'react';
import type { EducationTopic, MentoringSession, Quiz } from '../types';

interface EducationProps {
    topics: EducationTopic[];
    sessions: MentoringSession[];
}

const Education: React.FC<EducationProps> = ({ topics, sessions }) => {
  const [activeTab, setActiveTab] = useState<'modules' | 'mentoring'>('modules');
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [xp, setXp] = useState<number>(0);
  // Store completed question IDs: "topicId-quizId"
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [quizResults, setQuizResults] = useState<Record<string, 'correct' | 'incorrect'>>({});

  const toggleTopic = (id: string) => {
      setActiveTopicId(activeTopicId === id ? null : id);
  };

  const handleAnswer = (topicId: string, quiz: Quiz, optionIndex: number) => {
    const questionKey = `${topicId}-${quiz.id}`;
    if (completedQuestions.has(questionKey)) return;

    setSelectedOptions(prev => ({...prev, [questionKey]: optionIndex}));
    
    if (optionIndex === quiz.correctAnswerIndex) {
      setQuizResults(prev => ({...prev, [questionKey]: 'correct'}));
      setXp(prev => prev + 50); // 50 XP per question
      setCompletedQuestions(prev => new Set(prev).add(questionKey));
    } else {
      setQuizResults(prev => ({...prev, [questionKey]: 'incorrect'}));
    }
  };

  const resetQuestion = (topicId: string, quizId: string) => {
      const questionKey = `${topicId}-${quizId}`;
      setQuizResults(prev => {
          const newRes = {...prev};
          delete newRes[questionKey];
          return newRes;
      });
      setSelectedOptions(prev => {
           const newOpts = {...prev};
           delete newOpts[questionKey];
           return newOpts;
      });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gradient-to-r from-teal-600 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
        <div>
            <h1 className="text-2xl font-bold">Akademi Kripto 🎓</h1>
            <p className="text-blue-100 text-sm">Belajar trading seru & interaktif!</p>
        </div>
        <div className="text-center bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30">
            <span className="block text-xs uppercase tracking-wider font-semibold">Total XP</span>
            <span className="text-3xl font-bold text-yellow-300 drop-shadow-md">{xp}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex p-1 bg-gray-800 rounded-xl">
        <button 
            onClick={() => setActiveTab('modules')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'modules' 
                ? 'bg-gray-700 text-teal-400 shadow-sm' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
        >
            📚 Materi & Kuis
        </button>
        <button 
            onClick={() => setActiveTab('mentoring')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'mentoring' 
                ? 'bg-gray-700 text-teal-400 shadow-sm' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
        >
            🗓️ Jadwal Mentoring
        </button>
      </div>

      {/* Modules Content */}
      {activeTab === 'modules' && (
          <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {topics.map(topic => {
                const isActive = activeTopicId === topic.id;
                // Hitung progress
                const totalQ = topic.quizzes.length;
                const answeredQ = topic.quizzes.filter(q => completedQuestions.has(`${topic.id}-${q.id}`)).length;
                const isAllCompleted = totalQ > 0 && totalQ === answeredQ;

                return (
                    <div key={topic.id} className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 border ${isActive ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-gray-700'}`}>
                        {/* Header Card */}
                        <div 
                            className="p-5 flex items-start space-x-4 cursor-pointer hover:bg-gray-700/50 transition-colors"
                            onClick={() => toggleTopic(topic.id)}
                        >
                            <div className={`text-3xl p-3 rounded-lg flex-shrink-0 ${isAllCompleted ? 'bg-green-500/20 grayscale-0' : 'bg-gray-700'}`}>
                                {isAllCompleted ? '✅' : topic.emoji}
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold text-white flex items-center justify-between">
                                    {topic.title}
                                    {isAllCompleted && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Selesai</span>}
                                </h2>
                                <p className="text-gray-400 text-sm mt-1">{topic.summary}</p>
                                
                                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
                                        <div 
                                            className="bg-teal-500 h-full transition-all duration-500" 
                                            style={{ width: `${(answeredQ / totalQ) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span>{answeredQ}/{totalQ} Soal</span>
                                </div>
                            </div>
                        </div>

                        {/* Quiz List Section (Collapsible) */}
                        {isActive && (
                            <div className="bg-gray-750 border-t border-gray-700 p-5 animate-in slide-in-from-top-2 fade-in space-y-8">
                                {topic.quizzes.map((quiz, qIdx) => {
                                    const questionKey = `${topic.id}-${quiz.id}`;
                                    const isDone = completedQuestions.has(questionKey);
                                    const result = quizResults[questionKey];
                                    const selected = selectedOptions[questionKey];

                                    return (
                                        <div key={quiz.id} className="relative pl-4 border-l-2 border-gray-700">
                                            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-700 text-[10px] flex items-center justify-center text-gray-400">
                                                {qIdx + 1}
                                            </span>
                                            
                                            <h3 className="text-white font-medium mb-3 text-lg">{quiz.question}</h3>
                                            <div className="space-y-2 mb-3">
                                                {quiz.options.map((option, idx) => (
                                                    <button
                                                        key={idx}
                                                        disabled={isDone || (result === 'correct')}
                                                        onClick={() => handleAnswer(topic.id, quiz, idx)}
                                                        className={`w-full text-left p-3 rounded-lg border transition-all duration-200 text-sm
                                                            ${selected === idx 
                                                                ? (result === 'correct' 
                                                                    ? 'bg-green-500/20 border-green-500 text-green-300' 
                                                                    : 'bg-red-500/20 border-red-500 text-red-300') 
                                                                : 'bg-gray-900 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'}
                                                            ${isDone && idx === quiz.correctAnswerIndex ? 'bg-green-500/20 border-green-500 text-green-300' : ''}
                                                        `}
                                                    >
                                                        <span className="font-bold mr-2">{['A', 'B', 'C', 'D'][idx]}.</span> {option}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Feedback Area */}
                                            {result === 'correct' && (
                                                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 animate-in fade-in">
                                                    <p className="text-green-400 font-bold mb-1 text-sm">🎉 Benar! +50 XP</p>
                                                    <p className="text-gray-300 text-xs">{quiz.explanation}</p>
                                                </div>
                                            )}

                                            {result === 'incorrect' && (
                                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 animate-in fade-in">
                                                    <p className="text-red-400 font-bold mb-1 text-sm">😅 Kurang Tepat</p>
                                                    <button 
                                                        onClick={() => resetQuestion(topic.id, quiz.id)}
                                                        className="mt-1 text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Coba Lagi
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
          </div>
      )}

      {/* Mentoring Content (Unchanged) */}
      {activeTab === 'mentoring' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {sessions.map((session) => (
                  <div key={session.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-teal-500/50 transition-all shadow-lg flex flex-col md:flex-row gap-4 items-start md:items-center">
                      
                      {/* Date Badge */}
                      <div className="flex-shrink-0 flex flex-col items-center justify-center bg-gray-700/50 rounded-lg p-3 w-full md:w-24 text-center border border-gray-600">
                          <span className="text-xs text-gray-400 font-bold uppercase">{session.date}</span>
                          <span className="text-lg font-bold text-teal-400">{session.time.split(' ')[0]}</span>
                          <span className="text-xs text-gray-500">WIB</span>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                              {session.status === 'live' && (
                                  <span className="animate-pulse bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
                                  </span>
                              )}
                              {session.status === 'upcoming' && (
                                  <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
                                      UPCOMING
                                  </span>
                              )}
                               {session.status === 'finished' && (
                                  <span className="bg-gray-600 text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                      SELESAI
                                  </span>
                              )}
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1">{session.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                              <span className="flex items-center gap-1">
                                  👤 <span className="text-gray-200">{session.mentor}</span>
                              </span>
                              <span className="text-gray-600">•</span>
                              <span className="text-xs bg-gray-700 px-1.5 py-0.5 rounded text-gray-300">{session.role}</span>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2">{session.description}</p>
                      </div>

                      {/* Action Button */}
                      <div className="w-full md:w-auto mt-2 md:mt-0">
                          {session.status === 'live' ? (
                              <button className="w-full md:w-auto px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-500/20">
                                  Join Sekarang
                              </button>
                          ) : session.status === 'upcoming' ? (
                               <button className="w-full md:w-auto px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors">
                                  Ingatkan Saya 🔔
                              </button>
                          ) : (
                               <button className="w-full md:w-auto px-6 py-2 bg-gray-700 text-gray-400 font-semibold rounded-lg cursor-not-allowed">
                                  Tonton Replay
                              </button>
                          )}
                      </div>
                  </div>
              ))}
              
              <div className="text-center p-8 bg-gray-800/50 rounded-xl border border-dashed border-gray-700 mt-6">
                  <p className="text-gray-400">Jadwal mentoring diperbarui setiap hari Minggu pukul 18:00 WIB.</p>
              </div>
          </div>
      )}
    </div>
  );
};

export default Education;
