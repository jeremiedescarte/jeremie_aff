import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './themes.css'
import './i18n/index.js' // initialisation de i18n
import App from './App.jsx'
import { FournisseurTheme } from './context/ThemeContext'

<link
  href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
  rel='stylesheet'
></link>

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FournisseurTheme>
      <App />
    </FournisseurTheme>
  </StrictMode>,
)
