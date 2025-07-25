import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SystemDesignTimeline from './SystemDesignTimeline.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SystemDesignTimeline />
  </StrictMode>,
)
