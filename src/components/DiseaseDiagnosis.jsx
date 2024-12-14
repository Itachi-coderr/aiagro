import React, { useState } from "react";
import Groq from "groq-sdk";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Select from "react-select"; // Import react-select for searchable dropdown

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const DiseaseDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);
  const [fruitName, setFruitName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState({ label: "English", value: "English" }); // Default language

  // Supported languages with labels for react-select
  const languages = [
    { value: "English", label: "English" },
    { value: "Urdu", label: "Urdu (\u0627\u0631\u062f\u0648)" },
    { value: "Punjabi", label: "Punjabi (\u067e\u0646\u062c\u0627\u0628\u06cc)" },
    { value: "Sindhi", label: "Sindhi (\u0633\u0646\u068c\u064a)" },
    { value: "Pashto", label: "Pashto (\u067e\u069a\u062a\u0648)" },
    { value: "Balochi", label: "Balochi (\u0628\u0644\u0648\u0686\u06cc)" },
    { value: "Spanish", label: "Spanish (Espa\u00f1ol)" },
    { value: "French", label: "French (Fran\u00e7ais)" },
    { value: "Chinese", label: "Chinese (\u7b80\u4f53\u4e2d\u6587)" },
    // Add more languages as needed
  ];

  // Drag and drop setup
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setSelectedImage(acceptedFiles[0]),
    accept: "image/*",
  });

  // Simulated Image Recognition API call with additional diseases
  const analyzeImage = async (image) => {
    const diseases = [
      "Powdery mildew",
      "Leaf spot",
      "Root rot",
      "Anthracnose",
      "Blight",
      "Rust disease",
    ];
    const randomIndex = Math.floor(Math.random() * diseases.length);
    return diseases[randomIndex]; // Simulate detecting a random disease
  };

  const handleSubmit = async () => {
    if (!selectedImage || !fruitName) return;

    setLoading(true);
    try {
      const disease = await analyzeImage(selectedImage);

      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.2-90b-vision-preview",
        messages: [
          {
            role: "user",
            content: `The crop is a ${fruitName}, diagnosed with ${disease}. Provide a short, practical treatment suggestion in ${selectedLanguage.value}. Limit the response to 100 words.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1,
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

        {/* Enhanced Language Selector */}
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
                Drag & Drop Image or Click to Select
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
