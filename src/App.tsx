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
// TODO: switch to lazy loading once pages are implemented
// const PromptsPage = React.lazy(() => import('@/pages/PromptsPage'));
// const PromptDetailPage = React.lazy(() => import('@/pages/PromptDetailPage'));
// const CreateEditPromptPage = React.lazy(() => import('@/pages/CreateEditPromptPage'));

// Temporary eager imports (remove after enabling lazy loading)
import { PromptsPage } from '@/pages/PromptsPage';
import { PromptDetailPage } from '@/pages/PromptDetailPage';
import { CreateEditPromptPage } from '@/pages/CreateEditPromptPage';
import { PricingPage } from '@/pages/PricingPage';

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
            <Route path="/pricing" element={<PricingPage />} />

            {/* Prompt routes */}
            <Route path="/prompts" element={<PromptsPage />} />
            <Route path="/prompts/create" element={<CreateEditPromptPage />} />
            <Route path="/prompt/:id" element={<PromptDetailPage />} />
            <Route path="/prompt/:id/edit" element={<CreateEditPromptPage />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;