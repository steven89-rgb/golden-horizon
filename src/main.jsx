import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/styles.css';

// HashRouter keeps deep links (/#/verify, /#/shop, products), refreshes, and
// shared links working on any static host with zero server-side rewrite config.
// Switch back to BrowserRouter once a host-level SPA rewrite (/* -> /index.html)
// is enabled (e.g. the Render dashboard Redirect/Rewrite rule).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
