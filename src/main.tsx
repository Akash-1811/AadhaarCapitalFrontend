import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Performance optimization: Mark LCP element
const markLCPElement = () => {
  const heroImage = document.querySelector('[data-lcp]');
  if (heroImage) {
    heroImage.setAttribute('fetchpriority', 'high');
  }
};

// Initialize app with performance optimizations
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Add loading state to prevent layout shift
rootElement.innerHTML = `
  <div class="hero-loading">
    <div class="loading-spinner"></div>
  </div>
`;

root.render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <App />
  </BrowserRouter>
);

// Mark LCP element after initial render
setTimeout(markLCPElement, 0);

// Register service worker for caching optimization
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        // Silent registration in production
      })
      .catch((registrationError) => {
        // Silent fail in production
      });
  });
}
