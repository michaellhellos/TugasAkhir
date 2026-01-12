import { useState } from "react";
import { askGemini } from "../services/geminiService";

const AIMentor = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return;

    setLoading(true);
    try {
      const result = await askGemini(question);
      setAnswer(result);
    } catch (error) {
      setAnswer("Terjadi kesalahan saat memanggil AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AI Mentor Trading</h2>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Tanya tentang trading crypto..."
      />

      <br />

      <button onClick={handleAsk} disabled={loading}>
        {loading ? "AI berpikir..." : "Tanya AI"}
      </button>

      <p>{answer}</p>
    </div>
  );
};

export default AIMentor;
