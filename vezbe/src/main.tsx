import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './strane/App.tsx'
import Navbar from './strane/navbar.tsx'
import Str2 from'./strane/Strana2.tsx'
import { Route, Routes } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
    <Navbar/> 
    <div>
    <Routes>
          <Route path="/" element={    <App />} />
          <Route path="/News" element={<Str2/>} />
      
        </Routes>
        </div>

  </StrictMode>,
  </BrowserRouter>
)
