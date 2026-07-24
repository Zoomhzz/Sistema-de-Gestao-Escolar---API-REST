import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './Professores.css';

export function Professores() {
  const [professores, setProfessores] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  const [nome, setNome] = useState('');
  const [materia, setMateria] = useState('');
  const [alunos, setAlunos] = useState('0');
  const [turno, setTurno] = useState('MANHA');
  const [salario, setSalario] = useState('');

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

  function limparFormulario() {
    setIdEditando(null);
    setNome('');
    setMateria('');
    setAlunos('0');
    setTurno('MANHA');
    setSalario('');
  }

  function handleIniciarEdicao(prof) {
    setIdEditando(prof.id);
    setNome(prof.nome || '');
    setMateria(prof.materia || '');
    setTurno(prof.turno || 'MANHA');
    setSalario(prof.salario ? String(prof.salario) : '');
    setAlunos(String(prof.numeroAlunos ?? prof.alunosCount ?? 0));
  }

  async function handleSalvar(e) {
    e.preventDefault();

    const valorNumAlunos = Number(alunos);
    const qtdAlunos = isNaN(valorNumAlunos) ? 0 : valorNumAlunos;

    const valorNumSalario = Number(salario);
    const valorSalario = isNaN(valorNumSalario) || valorNumSalario <= 0 ? 1000 : valorNumSalario;

    const payload = {
      nome: nome.trim(),
      materia: materia.trim(),
      turno: turno,
      salario: valorSalario,
      numeroAlunos: qtdAlunos,
      alunosCount: qtdAlunos
    };

    try {
      if (idEditando) {
        await api.put(`/professores/${idEditando}`, payload);
        alert('Professor atualizado com sucesso!');
      } else {
        await api.post('/professores', payload);
        alert('Professor cadastrado com sucesso!');
      }

      limparFormulario();
      carregarProfessores();
    } catch (error) {
      console.error('Erro detalhado:', error.response?.data);
      const mensagemErro = error.response?.data?.Mensagem 
        || error.response?.data?.message 
        || error.response?.data 
        || 'Erro ao salvar no servidor.';

      alert(`Erro: ${typeof mensagemErro === 'object' ? JSON.stringify(mensagemErro) : mensagemErro}`);
    }
  }

  async function handleExcluir(id) {
    if (window.confirm('Tem certeza que deseja apagar este professor?')) {
      try {
        await api.delete(`/professores/${id}`);
        alert('Professor excluído com sucesso!');
        carregarProfessores();
      } catch (error) {
        console.error('Erro ao excluir professor:', error);
        alert('Erro ao excluir o professor.');
      }
    }
  }

  return (
    <div className="professores-layout">
      <div className="container" style={{ flex: 1 }}>
        <h2>👨‍🏫 Gestão de Professores</h2>

        {/* Formulário de Cadastro / Edição */}
        <form onSubmit={handleSalvar} className="form-card">
          <h3>{idEditando ? '✏️ Editar Professor' : '➕ Novo Professor'}</h3>

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
            <option value="MANHA">Manhã</option>
            <option value="TARDE">Tarde</option>
            <option value="NOITE">Noite</option>
            <option value="INTEGRAL">Integral</option>
          </select>

          <input
            type="number"
            step="0.01"
            placeholder="Salário (R$)"
            value={salario}
            onChange={(e) => setSalario(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Qtd. de Alunos"
            value={alunos}
            onChange={(e) => setAlunos(e.target.value)}
            required
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit">
              {idEditando ? 'Atualizar' : 'Cadastrar'}
            </button>
            {idEditando && (
              <button
                type="button"
                onClick={limparFormulario}
                style={{ backgroundColor: '#7f8c8d', color: '#fff' }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Tabela de Professores */}
        <table style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Matéria</th>
              <th>Turno</th>
              <th>Salário</th>
              <th>Nº Alunos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(professores) && professores.map((prof) => (
              <tr key={prof.id}>
                <td>{prof.id}</td>
                <td>{prof.nome}</td>
                <td>{prof.materia}</td>
                <td>{prof.turno || '-'}</td>
                <td>{prof.salario ? `R$ ${prof.salario.toFixed(2)}` : '-'}</td>
                <td>{prof.numeroAlunos ?? prof.alunosCount ?? 0}</td>
                <td style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleIniciarEdicao(prof)}
                    style={{ backgroundColor: '#f39c12', color: '#fff' }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(prof.id)}
                    style={{ backgroundColor: '#e74c3c', color: '#fff' }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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