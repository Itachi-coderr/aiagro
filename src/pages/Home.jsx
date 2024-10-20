import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-green-300 to-green-500">
      {/* Navbar */}
      {/* <header className="bg-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-green-700">
              AgroAI - Smart Farming Assistant
            </h1>
          </div>
          <nav className="space-x-4">
            <Link to="/" className="text-lg text-black hover:text-green-600 transition duration-300">Home</Link>
            <Link to="/chatbot" className="text-lg text-black hover:text-green-600 transition duration-300">Chatbot</Link>
            <Link to="/weather-advice" className="text-lg text-black hover:text-green-600 transition duration-300">Weather Advice</Link>
            <Link to="/disease-diagnosis" className="text-lg text-black hover:text-green-600 transition duration-300">Disease Diagnosis</Link>
          </nav>
        </div>
      </header> */}

      {/* Main Section */}
      <main className="container mx-auto flex flex-col md:flex-row items-center justify-center p-10 text-center md:text-left">
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            Revolutionize Your Farming Experience with AgroAI
          </h2>
          <p className="text-lg text-black">
            AgroAI is an AI-powered solution designed to assist farmers in making smarter decisions about their crops, weather, and plant health.
          </p>
          <p className="text-lg text-black">
            Get personalized advice, diagnose diseases, and optimize your yield using cutting-edge technology. With AgroAI, sustainable farming is at your fingertips.
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Farming field"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center space-y-12">
          <h3 className="text-3xl font-bold text-green-700">Why Choose AgroAI?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-green-50 p-8 rounded-lg shadow-lg hover:bg-green-100 transition duration-300">
              <h4 className="text-2xl font-semibold text-green-700">AI-Powered Chatbot</h4>
              <p className="mt-4 text-black">
                Get real-time advice tailored to your crop needs. Just ask our intelligent chatbot powered by LLaMA 3.2!
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-lg shadow-lg hover:bg-green-100 transition duration-300">
              <h4 className="text-2xl font-semibold text-green-700">Weather-Based Crop Advice</h4>
              <p className="mt-4 text-black">
                Know which crops thrive in your local climate and adjust your planting strategies accordingly for optimal results.
              </p>
            </div>
            <div className="bg-green-50 p-8 rounded-lg shadow-lg hover:bg-green-100 transition duration-300">
              <h4 className="text-2xl font-semibold text-green-700">Disease Diagnosis</h4>
              <p className="mt-4 text-black">
                Upload an image of your crop and let our AI diagnose any diseases with suggestions for the next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-center text-gray-400">
        <p>&copy; 2024 AgroAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
