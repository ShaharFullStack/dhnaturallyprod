import React from 'react';
import './App.css';
import { Routing } from './Components/LayoutArea/Routing/Routing';
import { LanguageProvider } from './Contexts/language-context';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
          <Routing />
      </div>
    </LanguageProvider>
  );
}

export default App;