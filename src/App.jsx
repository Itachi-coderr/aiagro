import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Chatbot from './components/Chatbot';
import WeatherAdvice from './components/WeatherAdvice';
import DiseaseDiagnosis from './components/DiseaseDiagnosis';
import LocationBasedRecommendation from './components/LocationBasedRecommendation';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <Router>
      <div>
        <header className="p-4 bg-gray-800 text-white">
          <div className="container mx-auto flex justify-between items-center">
            {/* Simplified AgroAI title */}
            <h1 className="text-2xl font-bold">AgroAI</h1>

            {/* Navbar links */}
            <nav className="hidden md:flex space-x-12 ml-auto">
              <Link to="/" className="text-lg transform transition duration-300 hover:text-green-400 hover:scale-110">Home</Link>
              <Link to="/chatbot" className="text-lg transform transition duration-300 hover:text-green-400 hover:scale-110">Chatbot</Link>
              <Link to="/weather" className="text-lg transform transition duration-300 hover:text-green-400 hover:scale-110">Crops Details</Link>
              <Link to="/diagnosis" className="text-lg transform transition duration-300 hover:text-green-400 hover:scale-110">Disease Diagnosis</Link>
              <Link to="/locationBasedRecommendation" className="text-lg transform transition duration-300 hover:text-green-400 hover:scale-110">Location-Based Crops Advice</Link>
            </nav>

            {/* Mobile menu button */}
            <button onClick={toggleMenu} className="block md:hidden text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                ></path>
              </svg>
            </button>
          </div>

          {/* Mobile menu dropdown */}
          <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden bg-gray-700 mt-2`}>
            <nav className="flex flex-col space-y-2 p-4">
              <Link to="/" className="text-lg transform transition duration-300 hover:text-green-400 hover:scale-110" onClick={toggleMenu}>Home</Link>
              <Link to="/chatbot" className="text-lg transform transition duration-300 hover:text-green-400 hover:scale-110" onClick={toggleMenu}>Chatbot</Link>
              <Link to="/weather" className="text-lg transform transition duration-300 hover:text-green-400 hover:scale-110" onClick={toggleMenu}>Crops Details</Link>
              <Link to="/diagnosis" className="text-lg transform transition duration-300 hover:text-green-400 hover:scale-110" onClick={toggleMenu}>Disease Diagnosis</Link>
              <Link to="/locationBasedRecommendation" className="text-lg transform transition duration-300 hover:text-green-400 hover:scale-110" onClick={toggleMenu}>Location-Based Crops Advice</Link>
            </nav>
          </div>
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/weather" element={<WeatherAdvice />} />
            <Route path="/diagnosis" element={<DiseaseDiagnosis />} />
            <Route path="/locationBasedRecommendation" element={<LocationBasedRecommendation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
