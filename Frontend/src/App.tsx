import './App.css';
import { Layout } from './Components/LayoutArea/Layout/Layout';
import { LanguageProvider } from './Contexts/language-context';
import { AuthProvider } from './Contexts/auth-context';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="App">
            <Layout />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;