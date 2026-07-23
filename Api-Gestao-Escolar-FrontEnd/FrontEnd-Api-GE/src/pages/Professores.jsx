import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './Professores.css';

export function Professores() {
  const [professores, setProfessores] = useState([]);
  const [nome, setNome] = useState('');
  const [materia, setMateria] = useState('');
  const [alunos, setAlunos] = useState('');

  async function carregarProfessores() {
    try {
      const response = await api.get('/professores');
      setProfessores(response.data);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
    }
  }

  useEffect(() => {
    carregarProfessores();
  }, []);

  async function handleCadastrar(e) {
    e.preventDefault();
    try {
      await api.post('/professores', {
        nome,
        materia,
        alunosCount: Number(alunos) || 0
      });
      setNome('');
      setMateria('');
      setAlunos('');
      carregarProfessores();
    } catch (error) {
      console.error('Erro ao cadastrar professor:', error);
    }
  }

  return (
    <div className="professores-layout">
      {/* Formulário de Cadastro */}
      <div className="container" style={{ flex: 1 }}>
        <h2>👨‍🏫 Gestão de Professores</h2>

        <form onSubmit={handleCadastrar} className="form-card">
          <h3>Novo Professor</h3>

          <input
            type="text"
            placeholder="Nome do Professor"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Matéria / Disciplina"
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Qtd. de Alunos"
            value={alunos}
            onChange={(e) => setAlunos(e.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>

      {/* Sidebar estilo Twitch */}
      <aside className="twitch-sidebar">
        <div className="twitch-header">
          <span>Professores em aula</span>
          <span className="twitch-icon">⇅</span>
        </div>

        <ul className="twitch-list">
          {professores.map((prof) => (
            <li key={prof.id} className="twitch-item">
              <div className="avatar-wrapper">
                <img
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${prof.nome}`}
                  alt={prof.nome}
                  className="twitch-avatar"
                />
                <span className="status-dot"></span>
              </div>

              <div className="twitch-info">
                <span className="twitch-name">{prof.nome}</span>
                <span className="twitch-category">{prof.materia || 'Disciplina'}</span>
              </div>

              <div className="twitch-viewers">
                <span className="red-dot">🔴</span>
                <span>{prof.alunosCount || prof.numeroAlunos || Math.floor(Math.random() * 50) + 10}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}