import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SmoothSlider from './projects/SmoothSlider.jsx'
import PassWordGeneratorCom from './projects/PassWordGenerator.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <PassWordGeneratorCom /> */}
    {/* <SmoothSlider /> */}
  </StrictMode>,
)
