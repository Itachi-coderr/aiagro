import React, { useState } from 'react';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userInput) return;

    setLoading(true);
    try {
      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.2-90b-vision-preview",
        messages: [
          {
            role: "user",
            content: `User asked: "${userInput}". Give a short, useful answer without unnecessary headings.`
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1,
        stream: false,
      });

      const aiResponse = chatCompletion.choices[0].message.content;
      setResponse(aiResponse);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Failed to get response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-100 via-green-300 to-green-500 p-4">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-green-700">AgroAI Chatbot</h1>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about your crops..."
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="4"
        />
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 ease-in-out"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>

        {response && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <p className="text-gray-800">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
