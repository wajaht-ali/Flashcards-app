import React from 'react'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth.jsx';
import { SearchProvider } from './context/Search.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </SearchProvider>
  </React.StrictMode>,
)
