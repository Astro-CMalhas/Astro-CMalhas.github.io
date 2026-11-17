import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext.jsx';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Research from './pages/Research.jsx';
import Code from './pages/Code.jsx';
import Explorer from './pages/Explorer.jsx';
import { profile } from './content.js';

// HashRouter keeps GitHub Pages happy: every URL is served by index.html.
export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <div className="site">
          <Header />
          <main className="page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/research" element={<Research />} />
              <Route path="/code" element={<Code />} />
              <Route path="/data" element={<Explorer />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <footer className="footer">
            © {new Date().getFullYear()} {profile.name}
          </footer>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}
