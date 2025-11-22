import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import ScrollToTop from './components/ScrollToTop';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Get backend URL from environment or use default
const getBackendUrl = () => {
  const envUrl = import.meta.env.VITE_BACKEND_URL;
  
  // Check if envUrl is valid
  if (envUrl && typeof envUrl === 'string' && envUrl !== 'undefined' && envUrl.trim() !== '') {
    let url = envUrl.trim();
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `http://${url}`;
    }
    return url;
  }
  
  // Default fallback - use port 8000 (backend default)
  console.warn('⚠️ VITE_BACKEND_URL not set, using default: http://localhost:8000');
  return 'http://localhost:8000';
};

export const backendUrl = getBackendUrl();
console.log("Backend URL configured:", backendUrl);
export const currency = '₹';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):''); 
  useEffect(()=>{
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      <ToastContainer
        toastClassName="glass rounded-xl shadow-xl"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        progressStyle={{ background: 'linear-gradient(135deg, #0066ff, #8b5cf6)' }}
      />
      
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <div className="relative z-10">
          <ScrollToTop />
          <NavBar setToken={setToken} />
          <div className="h-px bg-gradient-to-r from-transparent via-blue-400/60 via-purple-400/60 to-transparent my-6 mx-8 shadow-sm" />
          <div className="flex w-full gap-6">
            <Sidebar />
            <div 
              className="flex-1 mx-6 my-6 text-gray-900 transition-all duration-300" 
              style={{ 
                position: 'relative', 
                zIndex: 10, 
                minHeight: 'calc(100vh - 200px)',
                opacity: 1,
                visibility: 'visible'
              }}
            >
              <Routes>
                <Route path="/" element={<Add token={token}/>} />
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/order" element={<Orders token={token} />} />
                <Route path="/users" element={<Users token={token} />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
