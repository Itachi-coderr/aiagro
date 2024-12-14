import React, { useState, useEffect } from "react";
import Groq from "groq-sdk";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Select from "react-select"; // Import react-select for searchable dropdown

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const AutoLocationCropRecommendation = () => {
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const detectLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLat(latitude);
            setLon(longitude);
            convertLatLonToLocation(latitude, longitude);
          },
          (error) => {
            setLocation("Lahore");
          }
        );
      } else {
        setLocation("Lahore");
      }
    };

    detectLocation();
  }, []);

  const convertLatLonToLocation = (lat, lon) => {
    const geoApiUrl = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=673e19b1247ca839382808bny244917`;

    fetch(geoApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.address && data.address.city) {
          setLocation(data.address.city);
        } else {
          setLocation("Lahore");
        }
      })
      .catch(() => {
        setLocation("Lahore");
      });
  };

  const handleSubmit = async () => {
    if (!location || location === "Location not found.") {
      setLocation("Lahore");
    }
  
    setLoading(true);
    setAiResponse("");
  
    try {
      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.2-90b-vision-preview",
        messages: [
          {
            role: "user",
            content: `Given the location: ${location}, recommend suitable fruits and vegetables for cultivation. Use proper markdown formatting such as headings, bullet points, and bold text to make the response structured and clear. Provide your response entirely in ${selectedLanguage.value}. Include concise names and useful information.`,
          },
        ],
        temperature: 0.5,
        max_tokens: 500,
        top_p: 1,
      });
  
      const responseText = chatCompletion.choices[0].message.content;
      setAiResponse(responseText);
    } catch (error) {
      console.error("Error generating response:", error);
      alert("Failed to get AI response. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-200 via-green-400 to-green-600 p-6">
      <div className="bg-white p-8 shadow-xl rounded-xl w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-800">
          Auto Location-Based Crop Adviser
        </h1>

        <div className="mb-4">
          <p className="text-gray-700">
            {location ? `Detected Location: ${location}` : "Getting location..."}
          </p>
        </div>

        {/* Language Selector */}
        <div className="mb-6">
          <label
            htmlFor="language"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Select Language for Advice
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

        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200"
          disabled={loading}
        >
          {loading ? "Processing..." : "Get Recommendation"}
        </button>

        {aiResponse && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold text-green-700">
              AI Advice:
            </h2>
            <ReactMarkdown
              children={aiResponse}
              remarkPlugins={[remarkGfm]}
              className="text-sm sm:text-base text-gray-700 mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoLocationCropRecommendation;
