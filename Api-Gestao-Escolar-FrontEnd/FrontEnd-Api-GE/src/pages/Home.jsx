import { Link } from 'react-router-dom';
import './Home.css';

export function Home() {
  return (
    <div className="home-container">
      {/* Banner / Hero Decorado */}
      <section className="hero-section">
        <div className="badge">🎓 Plataforma Integrada</div>
        <h1>Bem-vindo ao <span className="highlight">EduCore</span></h1>
        <p>
          Gerencie professores, cursos e alunos com praticidade e visualização em tempo real.
        </p>

        {/* Botões Pill-shaped (Arredondados) da Navbar */}
        <div className="pill-buttons-group">
          <Link to="/professores" className="pill-btn btn-professores">
            👨‍🏫 Professores
          </Link>
          <Link to="/cursos" className="pill-btn btn-cursos">
            📚 Cursos
          </Link>
          <Link to="/alunos" className="pill-btn btn-alunos">
            🎓 Alunos
          </Link>
        </div>
      </section>

      {/* Cards Decorativos na Home */}
      <div className="home-cards-grid">
        <div className="home-card">
          <div className="card-icon">👨‍🏫</div>
          <h3>Corpo Docente</h3>
          <p>Acompanhe os professores cadastrados e turmas ativas em tempo real no estilo sidebar.</p>
        </div>

        <div className="home-card">
          <div className="card-icon">📚</div>
          <h3>Matérias & Cursos</h3>
          <p>Controle carga horária, áreas de conhecimento e lista de alunos por modalidade.</p>
        </div>

        <div className="home-card">
          <div className="card-icon">🎓</div>
          <h3>Gestão de Alunos</h3>
          <p>Matricule, edite e organize os turnos e turmas de cada estudante do sistema.</p>
        </div>
      </div>
    </div>
  );
}