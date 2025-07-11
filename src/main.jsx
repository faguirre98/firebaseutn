import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './Router/Router.jsx'

import "./assets/index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
