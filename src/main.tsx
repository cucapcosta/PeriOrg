import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/orbitron';
import '@fontsource/rajdhani/400.css';
import '@fontsource/rajdhani/600.css';
import '@fontsource/rajdhani/700.css';
import './styles/global.css';
import './styles/animations.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
