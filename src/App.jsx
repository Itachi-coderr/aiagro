import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'; 
import Home from './pages/Home';
import Chatbot from './components/Chatbot';
import WeatherAdvice from './components/WeatherAdvice';
import DiseaseDiagnosis from './components/DiseaseDiagnosis';

function App() {
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <Router>
      <div>
       
        <header className="p-4 bg-gray-800 text-white">
          <div className="container mx-auto flex justify-between items-center">
           
            <h1 className="text-2xl font-bold">AgroAI - Smart Farming Assistant</h1>

            <button 
              onClick={toggleMenu} 
              className="block md:hidden text-white focus:outline-none">
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

            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/chatbot" className="hover:underline">Chatbot</Link>
              <Link to="/weather" className="hover:underline">Weather Advice</Link>
              <Link to="/diagnosis" className="hover:underline">Disease Diagnosis</Link>
            </nav>
          </div>

          {/* Mobile menu dropdown */}
          <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden bg-gray-700 mt-2`}>
            <nav className="flex flex-col space-y-2 p-4">
              <Link to="/" className="hover:underline" onClick={toggleMenu}>Home</Link>
              <Link to="/chatbot" className="hover:underline" onClick={toggleMenu}>Chatbot</Link>
              <Link to="/weather" className="hover:underline" onClick={toggleMenu}>Weather Advice</Link>
              <Link to="/diagnosis" className="hover:underline" onClick={toggleMenu}>Disease Diagnosis</Link>
            </nav>
          </div>
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/weather" element={<WeatherAdvice />} />
            <Route path="/diagnosis" element={<DiseaseDiagnosis />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
