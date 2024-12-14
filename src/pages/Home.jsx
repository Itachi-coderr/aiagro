import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  CloudIcon,
  ShieldCheckIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

const HomePage = () => {
  // Create a ref for the "Try Our Services" section
  const servicesRef = useRef(null);

  // Function to scroll to the "Try Our Services" section
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-green-300 to-green-500">
      {/* Main Section with Image Background */}
      <main
  className="relative flex flex-col md:flex-row items-center justify-between p-6 sm:p-10 text-center md:text-left bg-cover bg-center h-screen"
  style={{
    backgroundImage:
      'url("https://world-coal-assets.s3.eu-west-1.amazonaws.com/wp-content/uploads/2023/12/17130044/agriculture-1.png")',
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black opacity-40"></div>

  {/* Content */}
  <div className="relative w-full md:w-1/2 space-y-4 sm:space-y-6 z-10 text-white bottom-5">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
      Revolutionize Your Farming Experience with AgroAI
    </h2>
    <p className="text-sm sm:text-base md:text-lg">
      AgroAI is an AI-powered solution designed to assist farmers in making smarter decisions about their crops, weather, and plant health.
    </p>
    <p className="text-sm sm:text-base md:text-lg">
      Get personalized advice, diagnose diseases, and optimize your yield using cutting-edge technology. With AgroAI, sustainable farming is at your fingertips.
    </p>
  </div>

  {/* Explore More Button */}
  <div className="absolute bottom-40 w-full text-center">
    <button
      onClick={scrollToServices}
      className="px-6 py-3 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-900 transition duration-300"
    >
      Explore More
    </button>
  </div>
</main>



      {/* Features Section (Try Our Services) */}
      <section
        ref={servicesRef}
        className="bg-white py-12 sm:py-16 px-2"
      >
        <div className="container mx-auto text-center space-y-8 sm:space-y-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-green-700">
            Try Our Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                to: "/chatbot",
                Icon: ChatBubbleOvalLeftEllipsisIcon,
                title: "AI-Powered Chatbot",
                description: "Get real-time advice tailored to your crop needs.",
              },
              {
                to: "/weather",
                Icon: CloudIcon,
                title: "Weather-Based Crop Advice",
                description: "Know which crops thrive in your local climate.",
              },
              {
                to: "/diagnosis",
                Icon: ShieldCheckIcon,
                title: "Disease Diagnosis",
                description: "Upload an image to diagnose crop diseases.",
              },
              {
                to: "/locationBasedRecommendation",
                Icon: MapPinIcon,
                title: "Location-Based Crop Advice",
                description: "Get recommendations based on your location.",
              },
            ].map((feature, index) => (
              <Link
                key={index}
                to={feature.to}
                className="relative group block bg-gradient-to-br from-green-100 to-green-200 p-4 sm:p-6 rounded-lg shadow-lg transform transition-transform hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 opacity-0 group-hover:opacity-50 transition duration-500 blur-lg rounded-lg"></div>

                <div className="relative flex flex-col items-center text-center">
                  <feature.Icon className="w-16 h-16 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="mt-4 text-lg sm:text-xl font-semibold text-green-700 group-hover:text-green-900 transition duration-300">
                    {feature.title}
                  </h4>
                  <p className="mt-2 text-sm sm:text-base text-black">
                    {feature.description}
                  </p>
                  <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded-full shadow-lg group-hover:bg-green-900 transition duration-300">
                    Learn More
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 sm:py-8 text-center text-gray-400 text-sm sm:text-base">
        <p>&copy; 2024 AgroAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
