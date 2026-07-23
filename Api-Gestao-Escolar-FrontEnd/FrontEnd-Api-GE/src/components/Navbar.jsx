import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import './Navbar.css';

export function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Início</Link></li>
        <li><Link to="/professores">Professores</Link></li>
        <li><Link to="/cursos">Cursos</Link></li>
        <li><Link to="/alunos">Alunos</Link></li>
        <li>
          <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Claro' : '🌙 Escuro'}
          </button>
        </li>
      </ul>
    </nav>
  );
}