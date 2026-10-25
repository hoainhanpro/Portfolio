import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ChunkLoadErrorBoundary from './components/ChunkLoadErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChunkLoadErrorBoundary>
      <App />
    </ChunkLoadErrorBoundary>
  </StrictMode>,
)
