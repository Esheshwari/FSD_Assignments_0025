import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar, Sidebar } from './components/Navigation';
import { Home } from './pages/Home';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <AppProvider>
      <div className="app-shell">
        <Navbar />
        <div className="app-body">
          <Sidebar />
          <main className="main-content">
            <Home />
          </main>
        </div>
        <Toaster position="bottom-right" />
      </div>
    </AppProvider>
  );
}