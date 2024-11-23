import React, { useState } from "react";
import Groq from "groq-sdk";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub Flavored Markdown

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userInput) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.2-90b-vision-preview",
        messages: [
          {
            role: "user",
            content: `User asked: "${userInput}". Give a short, useful answer without unnecessary headings and also user ask Agro related questions.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1,
        stream: false,
      });

      const aiResponse = chatCompletion.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Failed to get response. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-100 via-green-300 to-green-500 p-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg flex flex-col h-[90vh]">
        {/* Header */}
        <header className="bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-t-3xl">
          <h1 className="text-base md:text-lg font-bold tracking-wide">
            AgroAI Chat
          </h1>
          <p className="text-xs md:text-sm font-light">
            Your Virtual Farming Assistant
          </p>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 rounded-b-xl">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`px-3 py-2 max-w-[80%] rounded-2xl shadow ${msg.sender === "user"
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                    : "bg-gray-300 text-gray-800"
                  } text-xs md:text-sm`}
              >
                {msg.sender === "ai" ? (
                  <ReactMarkdown
                    children={msg.text}
                    remarkPlugins={[remarkGfm]}
                  />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-3 py-2 max-w-[80%] rounded-2xl shadow bg-gray-300 text-gray-800 text-xs md:text-sm">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <footer className="p-3 bg-white border-t rounded-b-3xl">
          <div className="flex items-center space-x-2 w-full">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow text-xs md:text-sm"
            />
            <button
              onClick={handleSubmit}
              className="flex-shrink-0 px-3 py-2 text-xs md:text-sm bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chatbot;
