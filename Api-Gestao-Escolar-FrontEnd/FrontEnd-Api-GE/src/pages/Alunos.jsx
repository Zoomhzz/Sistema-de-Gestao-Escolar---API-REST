import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './Alunos.css';

export function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [turno, setTurno] = useState('Manhã');
  const [turma, setTurma] = useState('');
  const [cursoId, setCursoId] = useState('');

  async function carregarAlunos() {
    try {
      const response = await api.get('/alunos');
      const dados = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.content || []);

      setAlunos(dados);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      setAlunos([]);
    }
  }

  useEffect(() => {
    carregarAlunos();
  }, []);

  function limparFormulario() {
    setIdEditando(null);
    setNome('');
    setMatricula('');
    setTurno('Manhã');
    setTurma('');
    setCursoId('');
  }

  function handleIniciarEdicao(aluno) {
    setIdEditando(aluno.id);
    setNome(aluno.nome || '');
    setMatricula(aluno.matricula || '');
    setTurno(aluno.turno || 'Manhã');
    setTurma(aluno.turma || '');
    setCursoId(aluno.cursoId ? String(aluno.cursoId) : '');
  }

  async function handleSalvar(e) {
    e.preventDefault();

    const payload = {
      nome,
      matricula,
      turno,
      turma,
      cursoId: cursoId ? Number(cursoId) : null
    };

    try {
      if (idEditando) {
        await api.put(`/alunos/${idEditando}`, payload);
        alert('Aluno atualizado com sucesso!');
      } else {
        await api.post('/alunos', payload);
        alert('Aluno cadastrado com sucesso!');
      }

      limparFormulario();
      carregarAlunos();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error.response?.data || error.message);
      alert(`Erro: ${JSON.stringify(error.response?.data || 'Erro na requisição')}`);
    }
  }

  async function handleExcluir(id) {
    if (window.confirm('Tem certeza que deseja apagar este aluno?')) {
      try {
        await api.delete(`/alunos/${id}`);
        alert('Aluno excluído com sucesso!');
        carregarAlunos();
      } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        alert('Erro ao excluir o aluno.');
      }
    }
  }

  return (
    <div className="container">
      <h2>🎓 Gestão de Alunos</h2>

      <form onSubmit={handleSalvar} className="form-card">
        <h3>{idEditando ? '✏️ Editar Aluno' : '➕ Novo Aluno'}</h3>

        <input
          type="text"
          placeholder="Nome do Aluno"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Matricular"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />

        <select value={turno} onChange={(e) => setTurno(e.target.value)} required>
          <option value="Manhã">Manhã</option>
          <option value="Tarde">Tarde</option>
          <option value="Noite">Noite</option>
          <option value="Integral">Integral</option>
        </select>

        <input
          type="text"
          placeholder="Número da Turma"
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="ID do Curso (Opcional)"
          value={cursoId}
          onChange={(e) => setCursoId(e.target.value)}
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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>Turno</th>
            <th>Turma</th>
            <th>ID Curso</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(alunos) && alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.matricula}</td>
              <td>{aluno.turno || '-'}</td>
              <td>{aluno.turma || '-'}</td>
              <td>{aluno.cursoId || '-'}</td>
              <td style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleIniciarEdicao(aluno)}
                  style={{ backgroundColor: '#f39c12', color: '#fff' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleExcluir(aluno.id)}
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
  );
}