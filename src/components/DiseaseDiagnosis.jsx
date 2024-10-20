import React, { useState } from 'react';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const DiseaseDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    setLoading(true);

    const mockDisease = "Powdery mildew"; 
    
    try {
      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.2-90b-vision-preview",
        messages: [
          {
            role: "user",
            content: `User's crop has been diagnosed with ${mockDisease}. Provide a short, practical treatment suggestion.`
          }
        ],
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1
      });

      const aiResponse = chatCompletion.choices[0].message.content;
      setDiagnosis(aiResponse);
    } catch (error) {
      console.error("Error generating response:", error);
      setDiagnosis("Failed to get AI response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-100 via-green-300 to-green-500 p-4">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-green-700">Crop Disease Diagnosis</h1>
        
        <div className="mb-4">
          <input 
            type="file" 
            onChange={handleImageUpload} 
            className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500" 
            accept="image/*"
          />
        </div>
        
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 ease-in-out"
          disabled={loading}
        >
          {loading ? "Processing..." : "Diagnose"}
        </button>

        {diagnosis && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <p className="text-gray-800">{diagnosis}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDiagnosis;
