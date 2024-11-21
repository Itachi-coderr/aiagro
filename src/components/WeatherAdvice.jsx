import React, { useState } from "react";
import Groq from "groq-sdk";
import Select from "react-select";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const UNSPLASH_API_KEY = "JdtcPe5Cu0qDlnbEvmbaR9FwMENiqotVauyX3SfOLss";

const WeatherAdvice = () => {
  const [userInput, setUserInput] = useState("");
  const [cropDetails, setCropDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState({ label: "English", value: "English" });

  // Supported languages for the dropdown
  const languages = [
    { value: "English", label: "English" },
    { value: "Urdu", label: "Urdu (اردو)" },
    { value: "Punjabi", label: "Punjabi (پنجابی)" },
    { value: "Sindhi", label: "Sindhi (سنڌي)" },
    { value: "Pashto", label: "Pashto (پښتو)" },
    { value: "Balochi", label: "Balochi (بلوچی)" },
    { value: "Saraiki", label: "Saraiki (سرائیکی)" },
    { value: "Arabic", label: "Arabic (العربية)" },
    { value: "Hindi", label: "Hindi (हिन्दी)" },
    { value: "Bengali", label: "Bengali (বাংলা)" },
    { value: "French", label: "French (Français)" },
    { value: "German", label: "German (Deutsch)" },
    { value: "Chinese (Simplified)", label: "Chinese (Simplified) (简体中文)" },
    { value: "Chinese (Traditional)", label: "Chinese (Traditional) (繁體中文)" },
    { value: "Spanish", label: "Spanish (Español)" },
    { value: "Portuguese", label: "Portuguese (Português)" },
    { value: "Russian", label: "Russian (Русский)" },
    { value: "Turkish", label: "Turkish (Türkçe)" },
    { value: "Persian", label: "Persian (فارسی)" },
    { value: "Malay", label: "Malay (Bahasa Melayu)" },
    { value: "Tamil", label: "Tamil (தமிழ்)" },
    { value: "Telugu", label: "Telugu (తెలుగు)" },
    { value: "Korean", label: "Korean (한국어)" },
    { value: "Japanese", label: "Japanese (日本語)" },
    { value: "Italian", label: "Italian (Italiano)" },
    { value: "Swahili", label: "Swahili (Kiswahili)" },
    { value: "Dutch", label: "Dutch (Nederlands)" },
    { value: "Thai", label: "Thai (ไทย)" },
    { value: "Vietnamese", label: "Vietnamese (Tiếng Việt)" },
  ];

  const fetchImage = async (query) => {
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        return data.results[0].urls.small; // Fetch the first image's URL
      }
    } catch (err) {
      console.error("Error fetching image:", err);
    }
    return "https://via.placeholder.com/300?text=No+Image+Available"; // Default image
  };

  const handleSearch = async () => {
    setError("");
    setCropDetails(null);

    if (!userInput) {
      setError("Please enter a fruit or vegetable name.");
      return;
    }

    setLoading(true);

    try {
      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.2-90b-vision-preview",
        messages: [
          {
            role: "user",
            content: `Provide details for the crop "${userInput}" in ${selectedLanguage.value} in the following structured format:
          {
            "name": "Name of the crop",
            "weather": "Optimal weather",
            "benefits": "List of benefits",
            "description": "Description of the crop"
          }
          Only provide this structured format without any additional text.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
        top_p: 1,
        stream: false,
      });

      const aiResponse = chatCompletion.choices[0].message.content.trim();

      try {
        // Ensure the response is valid JSON
        const parsedResponse = parseJsonSafely(aiResponse);

        if (parsedResponse && parsedResponse.name && parsedResponse.weather && parsedResponse.benefits && parsedResponse.description) {
          const imageUrl = await fetchImage(parsedResponse.name);
          setCropDetails({ ...parsedResponse, image: imageUrl });
        } else {
          throw new Error("Incomplete data in the response");
        }
      } catch (err) {
        console.error("Failed to parse AI response:", aiResponse);
        setError("Failed to parse AI response. Please try again or refine your query.");
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setError("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to safely parse JSON
  const parseJsonSafely = (str) => {
    try {
      return JSON.parse(str);
    } catch (error) {
      return null; // Return null if JSON is invalid
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-green-300 to-green-500 p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-black mb-6 sm:mb-8">
        AI Crop Details
      </h1>
      <p className="text-center text-base sm:text-lg text-black mb-6 sm:mb-8">
        Find the best crops details with their maximum benefits.
      </p>

      {/* Language Selector */}
      <div className="mb-6 max-w-md mx-auto">
        <label className="block text-gray-700 font-semibold mb-2">
          Select Language for Advice:
        </label>
        <Select
          options={languages}
          value={selectedLanguage}
          onChange={(selected) => setSelectedLanguage(selected)}
          placeholder="Search or Select Language"
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-center items-center">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter a fruit or vegetable..."
          className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 mb-4 sm:mb-0 sm:mr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 w-full sm:w-auto"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-600 text-center text-sm sm:text-base">{error}</p>}

      {cropDetails && (
        <div className="mt-8 flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-4 transform transition duration-500 hover:scale-105 max-w-xs sm:max-w-md">
            <img
              src={cropDetails.image}
              alt={cropDetails.name}
              className="w-full h-40 sm:h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-black mb-2">
                {cropDetails.name}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-1">
                <strong>Optimal Weather:</strong> {cropDetails.weather}
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-1">
                <strong>Benefits:</strong> {cropDetails.benefits}
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                <strong>Description:</strong> {cropDetails.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherAdvice;
