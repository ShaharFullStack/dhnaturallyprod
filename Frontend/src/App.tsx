import './App.css';
import { Layout } from './Components/LayoutArea/Layout/Layout';
import { LanguageProvider } from './Contexts/language-context';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
          <Layout />
      </div>
    </LanguageProvider>
  );
}

export default App;