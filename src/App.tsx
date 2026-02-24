import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Editor } from './components/Editor';
import { TemplateSelection } from './components/TemplateSelection';
import { Template } from './types';

export default function App() {
  const [view, setView] = useState<'landing' | 'selection' | 'editor'>('landing');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleStart = () => {
    setView('selection');
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setView('editor');
  };

  return (
    <main className="min-h-screen">
      {view === 'landing' && (
        <LandingPage onStart={handleStart} />
      )}
      {view === 'selection' && (
        <TemplateSelection 
          onSelect={handleSelectTemplate} 
          onBack={() => setView('landing')} 
        />
      )}
      {view === 'editor' && selectedTemplate && (
        <Editor 
          initialTemplate={selectedTemplate}
          onBack={() => setView('selection')} 
        />
      )}
    </main>
  );
}


