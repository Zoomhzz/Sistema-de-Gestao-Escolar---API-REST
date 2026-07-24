import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './Cursos.css';

export function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  // Estados dos Campos do Formulário
  const [nome, setNome] = useState('');
  const [materia, setMateria] = useState('');
  const [area, setArea] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [numeroAlunos, setNumeroAlunos] = useState('0');
  const [professorId, setProfessorId] = useState('');

  // 1. Carrega Cursos
  async function carregarCursos() {
    try {
      const response = await api.get('/cursos');
      const dados = Array.isArray(response.data)
        ? response.data
        : (response.data?.content || []);

      console.log('Dados de Cursos recebidos:', dados);
      setCursos(dados);
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
      setCursos([]);
    }
  }

  // 2. Carrega Professores
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
    carregarCursos();
    carregarProfessores();
  }, []);

  function limparFormulario() {
    setIdEditando(null);
    setNome('');
    setMateria('');
    setArea('');
    setCargaHoraria('');
    setNumeroAlunos('0');
    setProfessorId('');
  }

  function handleIniciarEdicao(curso) {
    setIdEditando(curso.id);
    setNome(curso.nome || '');
    setMateria(curso.materia || curso.disciplina || curso.nomeMateria || '');
    setArea(curso.area || '');
    setCargaHoraria(curso.cargaHoraria ? String(curso.cargaHoraria) : '');
    setNumeroAlunos(String(curso.numeroAlunos ?? curso.qtdAlunos ?? curso.alunosCount ?? 0));
    setProfessorId(curso.professor?.id || curso.professorId || '');
  }

  async function handleSalvar(e) {
    e.preventDefault();

    const qtdAlunos = Number(numeroAlunos) || 0;
    const horas = Number(cargaHoraria) || 0;

    // Envia todas as variações de chaves comuns no Spring Boot
    const payload = {
      nome: nome.trim(),
      materia: materia.trim(),
      disciplina: materia.trim(),
      nomeMateria: materia.trim(),
      area: area.trim(),
      cargaHoraria: horas,
      numeroAlunos: qtdAlunos,
      alunosCount: qtdAlunos,
      professorId: professorId ? Number(professorId) : null,
      professor: professorId ? { id: Number(professorId) } : null
    };

    try {
      if (idEditando) {
        await api.put(`/cursos/${idEditando}`, payload);
        alert('Curso atualizado com sucesso!');
      } else {
        await api.post('/cursos', payload);
        alert('Curso cadastrado com sucesso!');
      }

      limparFormulario();
      carregarCursos();
    } catch (error) {
      console.error('Erro detalhado:', error.response?.data);
      const mensagemErro = error.response?.data?.Mensagem 
        || error.response?.data?.message 
        || error.response?.data 
        || 'Erro ao salvar curso.';

      alert(`Erro: ${typeof mensagemErro === 'object' ? JSON.stringify(mensagemErro) : mensagemErro}`);
    }
  }

  async function handleExcluir(id) {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      try {
        await api.delete(`/cursos/${id}`);
        alert('Curso excluído com sucesso!');
        carregarCursos();
      } catch (error) {
        console.error('Erro ao excluir curso:', error);
        alert('Erro ao excluir curso.');
      }
    }
  }

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>📚 Gestão de Cursos</h2>

      {/* Formulário de Cadastro / Edição */}
      <form onSubmit={handleSalvar} className="form-card" style={{ marginBottom: '30px' }}>
        <h3>{idEditando ? '✏️ Editar Curso' : '➕ Novo Curso'}</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <input
            type="text"
            placeholder="Nome do Curso"
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
            type="text"
            placeholder="Área (ex: Exatas, TI)"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Carga Horária (horas)"
            value={cargaHoraria}
            onChange={(e) => setCargaHoraria(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Nº de Alunos"
            value={numeroAlunos}
            onChange={(e) => setNumeroAlunos(e.target.value)}
            required
          />

          <select value={professorId} onChange={(e) => setProfessorId(e.target.value)}>
            <option value="">Selecione um Professor...</option>
            {professores.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.nome} - {prof.materia || 'Geral'}
              </option>
            ))}
          </select>
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

      {/* Tabela de Exibição */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>MATÉRIA</th>
            <th>ÁREA</th>
            <th>CARGA HORÁRIA</th>
            <th>Nº ALUNOS</th>
            <th>PROFESSOR</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cursos) && cursos.map((curso) => {
            // Mapeamento extensivo para capturar qualquer nome retornado pelo backend
            const materiaExibida =
              curso.materia ||
              curso.disciplina ||
              curso.nomeMateria ||
              curso.materiaNome ||
              '-';

            const nomeProfessor =
              curso.professor?.nome ||
              curso.nomeProfessor ||
              curso.professorNome ||
              (typeof curso.professor === 'string' ? curso.professor : null) ||
              '-';

            const qtdAlunosExibida =
              curso.numeroAlunos ??
              curso.qtdAlunos ??
              curso.alunosCount ??
              curso.alunos?.length ??
              0;

            return (
              <tr key={curso.id}>
                <td>{curso.id}</td>
                <td>{curso.nome}</td>
                <td>{materiaExibida}</td>
                <td>{curso.area || '-'}</td>
                <td>{curso.cargaHoraria ? `${curso.cargaHoraria}h` : '-'}</td>
                <td>{qtdAlunosExibida}</td>
                <td>{nomeProfessor}</td>
                <td style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleIniciarEdicao(curso)}
                    style={{ backgroundColor: '#f39c12', color: '#fff' }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(curso.id)}
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