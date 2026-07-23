import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ flex: 1 }}>
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}