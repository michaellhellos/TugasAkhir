import React, { useState } from 'react';

const Belajar = ({ topics, sessions }) => {
  const [activeTab, setActiveTab] = useState('modules');
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [xp, setXp] = useState(0);

  // soal yang sudah benar
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quizResults, setQuizResults] = useState({});

  const toggleTopic = (id) => {
    setActiveTopicId(activeTopicId === id ? null : id);
  };

  const handleAnswer = (topicId, quiz, optionIndex) => {
    const questionKey = `${topicId}-${quiz.id}`;
    if (completedQuestions.has(questionKey)) return;

    setSelectedOptions((prev) => ({
      ...prev,
      [questionKey]: optionIndex,
    }));

    if (optionIndex === quiz.correctAnswerIndex) {
      setQuizResults((prev) => ({
        ...prev,
        [questionKey]: 'correct',
      }));
      setXp((prev) => prev + 50);
      setCompletedQuestions((prev) => new Set(prev).add(questionKey));
    } else {
      setQuizResults((prev) => ({
        ...prev,
        [questionKey]: 'incorrect',
      }));
    }
  };

  const resetQuestion = (topicId, quizId) => {
    const questionKey = `${topicId}-${quizId}`;

    setQuizResults((prev) => {
      const res = { ...prev };
      delete res[questionKey];
      return res;
    });

    setSelectedOptions((prev) => {
      const opt = { ...prev };
      delete opt[questionKey];
      return opt;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-teal-600 to-blue-600 p-6 rounded-2xl text-white shadow-lg">
        <div>
          <h1 className="text-2xl font-bold">Akademi Kripto 🎓</h1>
          <p className="text-blue-100 text-sm">
            Belajar trading seru & interaktif!
          </p>
        </div>

        <div className="text-center bg-white/20 p-3 rounded-xl">
          <span className="block text-xs font-semibold">TOTAL XP</span>
          <span className="text-3xl font-bold text-yellow-300">{xp}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-800 rounded-xl">
        <button
          onClick={() => setActiveTab('modules')}
          className={`flex-1 py-3 rounded-lg font-semibold ${
            activeTab === 'modules'
              ? 'bg-gray-700 text-teal-400'
              : 'text-gray-400'
          }`}
        >
          📚 Materi & Kuis
        </button>

        <button
          onClick={() => setActiveTab('mentoring')}
          className={`flex-1 py-3 rounded-lg font-semibold ${
            activeTab === 'mentoring'
              ? 'bg-gray-700 text-teal-400'
              : 'text-gray-400'
          }`}
        >
          🗓️ Mentoring
        </button>
      </div>

      {/* MODULES */}
      {activeTab === 'modules' && (
        <div className="grid gap-4">
          {topics.map((topic) => {
            const isActive = activeTopicId === topic.id;
            const totalQ = topic.quizzes.length;
            const answeredQ = topic.quizzes.filter((q) =>
              completedQuestions.has(`${topic.id}-${q.id}`)
            ).length;

            return (
              <div
                key={topic.id}
                className="bg-gray-800 rounded-xl border border-gray-700"
              >
                {/* Topic Header */}
                <div
                  onClick={() => toggleTopic(topic.id)}
                  className="p-5 cursor-pointer hover:bg-gray-700/50"
                >
                  <h2 className="text-white font-bold flex justify-between">
                    {topic.title}
                    {answeredQ === totalQ && totalQ > 0 && (
                      <span className="text-xs bg-green-500 px-2 rounded-full">
                        Selesai
                      </span>
                    )}
                  </h2>
                  <p className="text-gray-400 text-sm">{topic.summary}</p>

                  <div className="mt-3 bg-gray-700 h-2 rounded-full">
                    <div
                      className="bg-teal-500 h-full rounded-full"
                      style={{
                        width: `${(answeredQ / totalQ) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Quiz */}
                {isActive && (
                  <div className="p-5 space-y-6 border-t border-gray-700">
                    {topic.quizzes.map((quiz, index) => {
                      const key = `${topic.id}-${quiz.id}`;
                      const result = quizResults[key];
                      const selected = selectedOptions[key];

                      return (
                        <div key={quiz.id}>
                          <h3 className="text-white font-semibold mb-2">
                            {index + 1}. {quiz.question}
                          </h3>

                          {quiz.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() =>
                                handleAnswer(topic.id, quiz, i)
                              }
                              disabled={completedQuestions.has(key)}
                              className={`w-full p-3 mb-2 rounded-lg text-left
                                ${
                                  selected === i
                                    ? result === 'correct'
                                      ? 'bg-green-500/20 border-green-500'
                                      : 'bg-red-500/20 border-red-500'
                                    : 'bg-gray-900 border-gray-600'
                                }`}
                            >
                              {opt}
                            </button>
                          ))}

                          {result === 'correct' && (
                            <p className="text-green-400 text-sm">
                              ✔ Benar! +50 XP
                            </p>
                          )}

                          {result === 'incorrect' && (
                            <button
                              onClick={() =>
                                resetQuestion(topic.id, quiz.id)
                              }
                              className="text-xs bg-red-500 px-3 py-1 rounded mt-2"
                            >
                              Coba Lagi
                            </button>
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

      {/* MENTORING */}
      {activeTab === 'mentoring' && (
        <div className="space-y-4">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="bg-gray-800 p-5 rounded-xl border border-gray-700"
            >
              <h3 className="text-white font-bold">{s.title}</h3>
              <p className="text-gray-400 text-sm">
                {s.mentor} • {s.role}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Belajar;
