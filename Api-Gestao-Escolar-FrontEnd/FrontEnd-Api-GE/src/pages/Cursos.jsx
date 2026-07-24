import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './Cursos.css';

export function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  // Estados dos Campos
  const [nome, setNome] = useState('');
  const [materiaInput, setMateriaInput] = useState('');
  const [area, setArea] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [numeroAlunos, setNumeroAlunos] = useState('0');
  const [professorId, setProfessorId] = useState('');

  async function carregarCursos() {
    try {
      const response = await api.get('/cursos');
      const dados = Array.isArray(response.data)
        ? response.data
        : (response.data?.content || []);

      setCursos(dados);
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
      setCursos([]);
    }
  }

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
    setMateriaInput('');
    setArea('');
    setCargaHoraria('');
    setNumeroAlunos('0');
    setProfessorId('');
  }

  function handleIniciarEdicao(curso) {
    setIdEditando(curso.id);
    setNome(curso.nome || '');
    setArea(curso.area || '');
    setCargaHoraria(curso.cargaHoraria ? String(curso.cargaHoraria) : '');
    setNumeroAlunos(String(curso.numeroAlunos ?? curso.qtdAlunos ?? curso.alunosCount ?? 0));
    
    // Tenta pegar o ID do professor ou do objeto professor
    const idProf = curso.professor?.id || curso.professorId || '';
    setProfessorId(String(idProf));

    // Se houver matéria no curso ou no professor
    const mat = curso.materia || curso.disciplina || curso.professor?.materia || '';
    setMateriaInput(mat);
  }

  async function handleSalvar(e) {
    e.preventDefault();

    const qtdAlunos = Number(numeroAlunos) || 0;
    const horas = Number(cargaHoraria) || 0;
    const profIdNum = professorId ? Number(professorId) : null;

    // Se um professor foi selecionado, podemos pegar a matéria dele
    const profSelecionado = professores.find(p => p.id === profIdNum);
    const materiaFinal = materiaInput.trim() || profSelecionado?.materia || '';

    const payload = {
      nome: nome.trim(),
      materia: materiaFinal,
      disciplina: materiaFinal,
      area: area.trim(),
      cargaHoraria: horas,
      numeroAlunos: qtdAlunos,
      alunosCount: qtdAlunos,
      professorId: profIdNum,
      professor: profIdNum ? { id: profIdNum } : null
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
            value={materiaInput}
            onChange={(e) => setMateriaInput(e.target.value)}
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

          <select value={professorId} onChange={(e) => setProfessorId(e.target.value)} required>
            <option value="">Selecione um Professor...</option>
            {professores.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.nome} ({prof.materia || 'Sem Matéria'})
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
            // Busca o nome do professor
            const nomeProfessor =
              curso.professor?.nome ||
              curso.nomeProfessor ||
              professores.find(p => p.id === curso.professorId || p.id === curso.professor?.id)?.nome ||
              '-';

            // Busca a matéria (no curso ou no objeto do professor)
            const materiaExibida =
              curso.materia ||
              curso.disciplina ||
              curso.professor?.materia ||
              professores.find(p => p.id === curso.professorId || p.id === curso.professor?.id)?.materia ||
              '-';

            const qtdAlunosExibida =
              curso.numeroAlunos ??
              curso.qtdAlunos ??
              curso.alunosCount ??
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