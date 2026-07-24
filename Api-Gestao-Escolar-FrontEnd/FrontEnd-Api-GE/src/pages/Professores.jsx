import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './Professores.css';

export function Professores() {
  const [professores, setProfessores] = useState([]);
  const [nome, setNome] = useState('');
  const [materia, setMateria] = useState('');
  const [alunos, setAlunos] = useState('0');
  const [turno, setTurno] = useState('Manhã');

  async function carregarProfessores() {
    try {
      const response = await api.get('/professores');
      const dados = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.content || []);

      setProfessores(dados);
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      setProfessores([]);
    }
  }

  useEffect(() => {
    carregarProfessores();
  }, []);

  async function handleCadastrar(e) {
    e.preventDefault();

    const valorNum = Number(alunos);
    const qtdAlunos = isNaN(valorNum) ? 0 : valorNum;

    // Payload ajustado conforme as regras do Spring Validation (@Positive e @NotBlank)
    const payload = {
      nome: nome.trim(),
      materia: materia.trim(),
      turno: turno,                  // Fix: atende 'O turno é obrigatório'
      salario: 1000.0,              // Fix: atende 'O salário deve ser um valor positivo'
      numeroAlunos: qtdAlunos,
      alunosCount: qtdAlunos
    };

    try {
      await api.post('/professores', payload);
      setNome('');
      setMateria('');
      setAlunos('0');
      setTurno('Manhã');
      carregarProfessores();
      alert('Professor cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro detalhado:', error.response?.data);
      const mensagemErro = error.response?.data?.Mensagem 
        || error.response?.data?.message 
        || error.response?.data 
        || 'Erro ao cadastrar no servidor.';

      alert(`Erro no cadastro: ${typeof mensagemErro === 'object' ? JSON.stringify(mensagemErro) : mensagemErro}`);
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

          <select value={turno} onChange={(e) => setTurno(e.target.value)} required>
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
            <option value="Integral">Integral</option>
          </select>

          <input
            type="number"
            placeholder="Qtd. de Alunos"
            value={alunos}
            onChange={(e) => setAlunos(e.target.value)}
            required
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
          {Array.isArray(professores) && professores.map((prof) => (
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
                <span>{prof.numeroAlunos ?? prof.alunosCount ?? 0}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}