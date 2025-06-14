import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Toaster } from '@/components/ui/sonner';
import { HomePage } from '@/pages/HomePage';
import { TutorialsPage } from '@/pages/TutorialsPage';
import { TutorialDetailPage } from '@/pages/TutorialDetailPage';
import { SubmitTutorialPage } from '@/pages/SubmitTutorialPage';
import { AboutPage } from '@/pages/AboutPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/tutorial/:id" element={<TutorialDetailPage />} />
            <Route path="/submit" element={<SubmitTutorialPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;