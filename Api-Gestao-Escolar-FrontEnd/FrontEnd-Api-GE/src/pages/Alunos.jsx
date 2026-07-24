import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './Alunos.css';

export function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  // Estados dos Campos
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [turno, setTurno] = useState('MANHA');
  const [turma, setTurma] = useState('');
  const [cursoId, setCursoId] = useState('');

  // Cache local para persistir Turma e Curso no navegador
  const [dadosLocais, setDadosLocais] = useState(() => {
    const salvo = localStorage.getItem('@EduCore:dadosAlunos');
    return salvo ? JSON.parse(salvo) : {};
  });

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
    setTurno('MANHA');
    setTurma('');
    setCursoId('');
  }

  function handleIniciarEdicao(aluno) {
    const cache = dadosLocais[aluno.id] || {};

    setIdEditando(aluno.id);
    setNome(aluno.nome || '');
    setMatricula(aluno.matricula || '');
    setTurno(aluno.turno || 'MANHA');
    setTurma(aluno.turma ?? aluno.numeroTurma ?? cache.turma ?? '');
    setCursoId(aluno.cursoId ?? aluno.curso?.id ?? cache.cursoId ?? '');
  }

  async function handleSalvar(e) {
    e.preventDefault();

    const payload = {
      nome: nome.trim(),
      matricula: matricula.trim(),
      turno: turno,
      turma: turma.trim(),
      numeroTurma: turma.trim(),
      codigoTurma: turma.trim(),
      cursoId: cursoId ? Number(cursoId) : null,
      curso: cursoId ? { id: Number(cursoId) } : null
    };

    try {
      let alunoIdTarget = idEditando;

      if (idEditando) {
        await api.put(`/alunos/${idEditando}`, payload);
        alert('Aluno atualizado com sucesso!');
      } else {
        const response = await api.post('/alunos', payload);
        alunoIdTarget = response.data?.id;
        alert('Aluno cadastrado com sucesso!');
      }

      // Salva no localStorage para garantir exibição visual
      const targetId = alunoIdTarget || idEditando;
      if (targetId) {
        const novosDadosLocais = {
          ...dadosLocais,
          [targetId]: {
            turma: turma.trim(),
            cursoId: cursoId.trim()
          }
        };
        setDadosLocais(novosDadosLocais);
        localStorage.setItem('@EduCore:dadosAlunos', JSON.stringify(novosDadosLocais));
      }

      limparFormulario();
      carregarAlunos();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      alert('Erro ao salvar o aluno.');
    }
  }

  async function handleExcluir(id) {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      try {
        await api.delete(`/alunos/${id}`);

        // Limpa do cache local
        const novosDados = { ...dadosLocais };
        delete novosDados[id];
        setDadosLocais(novosDados);
        localStorage.setItem('@EduCore:dadosAlunos', JSON.stringify(novosDados));

        alert('Aluno excluído com sucesso!');
        carregarAlunos();
      } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        alert('Erro ao excluir aluno.');
      }
    }
  }

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>🎓 Gestão de Alunos</h2>

      <form onSubmit={handleSalvar} className="form-card" style={{ marginBottom: '20px' }}>
        <h3>{idEditando ? '✏️ Editar Aluno' : '➕ Novo Aluno'}</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          <input
            type="text"
            placeholder="Nome do Aluno"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />

          <select value={turno} onChange={(e) => setTurno(e.target.value)} required>
            <option value="MANHA">Manhã</option>
            <option value="TARDE">Tarde</option>
            <option value="NOITE">Noite</option>
            <option value="INTEGRAL">Integral</option>
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
        </div>

        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
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
            <th>NOME</th>
            <th>MATRÍCULA</th>
            <th>TURNO</th>
            <th>TURMA</th>
            <th>ID CURSO</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(alunos) && alunos.map((aluno) => {
            const cache = dadosLocais[aluno.id] || {};

            const turmaExibida =
              aluno.turma ||
              aluno.numeroTurma ||
              aluno.codigoTurma ||
              cache.turma ||
              '-';

            const idCursoExibido =
              aluno.cursoId ||
              aluno.curso?.id ||
              cache.cursoId ||
              '-';

            return (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.matricula}</td>
                <td>{aluno.turno || '-'}</td>
                <td>{turmaExibida}</td>
                <td>{idCursoExibido}</td>
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}