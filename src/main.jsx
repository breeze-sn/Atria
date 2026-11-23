import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Docs from './Docs.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      {window.location.pathname === '/docs' ? <Docs /> : <App />}
    </ThemeProvider>
  </React.StrictMode>,
)
