import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { AuthProvider } from './context/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    {/* <BrowserRouter> */}
    <HashRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HashRouter>
    {/* </BrowserRouter> */}
  </AuthProvider>,
)
