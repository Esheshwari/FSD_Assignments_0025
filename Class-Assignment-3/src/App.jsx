import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import SurveyForm from './components/SurveyForm';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <main className="main-content">
        <SurveyForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
