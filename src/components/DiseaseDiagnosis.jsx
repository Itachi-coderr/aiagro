import React, { useState } from "react";
import Groq from "groq-sdk";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Select from "react-select";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

// Simulated database of diseases for fruit/vegetable names
const simulatedDatabase = [
  { fruit: "Tomato", disease: "Early Blight" },
  { fruit: "Grapes", disease: "Downy Mildew" },
  { fruit: "Apple", disease: "Scab" },
];

const DiseaseDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);
  const [fruitName, setFruitName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState({ label: "English", value: "English" });

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
    // Add more languages as needed
  ];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setSelectedImage(acceptedFiles[0]),
    accept: "image/*",
  });

  const analyzeFromDatabase = (fruitName) => {
    return simulatedDatabase.find((entry) => entry.fruit.toLowerCase() === fruitName.toLowerCase());
  };

  const handleSubmit = async () => {
    if (!fruitName) {
      setDiagnosis("Please enter the name of a fruit or vegetable.");
      return;
    }

    setLoading(true);
    try {
      const analysis = analyzeFromDatabase(fruitName);

      if (!analysis) {
        setDiagnosis(`No data found for "${fruitName}". Please try a different name.`);
        setLoading(false);
        return;
      }

      const { fruit, disease } = analysis;

      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.2-90b-vision-preview",
        messages: [
          {
            role: "user",
            content: `The crop is ${fruit}, diagnosed with ${disease}. Provide a short, practical treatment suggestion in English. Limit the response to 100 words.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1,
      });

      const aiResponse = chatCompletion.choices[0].message.content;

      // Translate the response if the selected language is not English
      if (selectedLanguage.value !== "English") {
        const translationCompletion = await groq.chat.completions.create({
          model: "llama-3.2-90b-vision-preview",
          messages: [
            {
              role: "user",
              content: `Translate the following text to ${selectedLanguage.value}: "${aiResponse}"`,
            },
          ],
          temperature: 0.5,
          max_tokens: 150,
          top_p: 1,
        });

        const translatedResponse = translationCompletion.choices[0].message.content;
        setDiagnosis(translatedResponse);
      } else {
        setDiagnosis(aiResponse);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setDiagnosis("Failed to get AI response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-100 via-green-300 to-green-500 p-6">
      <div className="bg-white p-8 shadow-2xl rounded-lg max-w-lg w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-green-700">
          Crop Disease Diagnosis
        </h1>

        {/* Fruit/Vegetable Name Input */}
        <div className="relative mb-6">
          <input
            type="text"
            id="fruitName"
            value={fruitName}
            onChange={(e) => setFruitName(e.target.value)}
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-600 transition ease-in-out"
            placeholder="Enter the name of the fruit or vegetable"
          />
        </div>

        {/* Language Selector */}
        <div className="relative mb-6">
          <label
            htmlFor="language"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Select Language for Diagnosis
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

        {/* Drag and Drop Area */}
        <div
          {...getRootProps()}
          className="w-full p-6 border-4 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition duration-200 ease-in-out mb-6 flex justify-center items-center"
        >
          <input {...getInputProps()} />
          {!selectedImage ? (
            <div className="flex flex-col items-center">
              <FiUpload className="text-4xl text-gray-500 mb-2" />
              <p className="text-center text-gray-500">
                Drag & Drop Image or Click to Select (Demo Only)
              </p>
            </div>
          ) : (
            <p className="text-center text-green-700">
              Image Selected: {selectedImage.name}
            </p>
          )}
        </div>

        {/* Diagnose Button */}
        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 ease-in-out flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin border-4 border-t-4 border-white border-solid rounded-full w-6 h-6 mr-2" />
          ) : (
            "Diagnose"
          )}
        </button>

        {/* Diagnosis Result */}
        {diagnosis && (
          <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md">
            <ReactMarkdown
              children={diagnosis}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDiagnosis;
