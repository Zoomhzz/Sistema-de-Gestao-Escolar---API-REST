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

  // Cache local seguro
  const [dadosLocais, setDadosLocais] = useState(() => {
    try {
      const salvo = localStorage.getItem('@EduCore:dadosCursos');
      return salvo ? JSON.parse(salvo) : {};
    } catch {
      return {};
    }
  });

  // 1. Carrega Cursos da API
  async function carregarCursos() {
    try {
      const response = await api.get('/cursos');
      const dados = Array.isArray(response.data)
        ? response.data
        : (response.data?.content || []);

      setCursos(dados);
    } catch (error) {
      console.error('Erro ao buscar cursos:', error.message || error);
      setCursos([]);
    }
  }

  // 2. Carrega Professores da API
  async function carregarProfessores() {
    try {
      const response = await api.get('/professores');
      const dados = Array.isArray(response.data)
        ? response.data
        : (response.data?.content || []);

      setProfessores(dados);
    } catch (error) {
      console.error('Erro ao buscar professores:', error.message || error);
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
    const local = dadosLocais[curso.id] || {};

    setIdEditando(curso.id);
    setNome(curso.nome || '');
    setArea(curso.area || '');
    setCargaHoraria(curso.cargaHoraria ? String(curso.cargaHoraria) : '');
    
    // Nº de Alunos (Prioriza Local -> API)
    const qtd = local.numeroAlunos ?? curso.numeroAlunos ?? curso.qtdAlunos ?? 0;
    setNumeroAlunos(String(qtd));
    
    // ID do Professor
    const idProf = curso.professor?.id || curso.professorId || local.professorId || '';
    setProfessorId(String(idProf));

    // Matéria
    const mat = curso.materia || curso.disciplina || local.materia || '';
    setMateriaInput(mat);
  }

  async function handleSalvar(e) {
    e.preventDefault();

    const qtdAlunos = Number(numeroAlunos) || 0;
    const horas = Number(cargaHoraria) || 0;
    const profIdNum = professorId ? Number(professorId) : null;

    const profSelecionado = professores.find(p => String(p.id) === String(professorId));
    const materiaFinal = materiaInput.trim() || profSelecionado?.materia || '';
    const nomeProfessorFinal = profSelecionado?.nome || '';

    // Payload estruturado estritamente para o Spring Boot
    const payload = {
      nome: nome.trim(),
      materia: materiaFinal,
      area: area.trim(),
      cargaHoraria: horas,
      numeroAlunos: qtdAlunos,
      professor: profIdNum ? { id: profIdNum } : null
    };

    try {
      let cursoIdTarget = idEditando;

      if (idEditando) {
        await api.put(`/cursos/${idEditando}`, payload);
        alert('Curso atualizado com sucesso!');
      } else {
        const response = await api.post('/cursos', payload);
        cursoIdTarget = response.data?.id;
        alert('Curso cadastrado com sucesso!');
      }

      // Persiste os dados visuais no localStorage
      const target = cursoIdTarget || idEditando;
      if (target) {
        const novosDadosLocais = {
          ...dadosLocais,
          [target]: {
            materia: materiaFinal,
            professorId: professorId,
            nomeProfessor: nomeProfessorFinal,
            numeroAlunos: qtdAlunos
          }
        };
        setDadosLocais(novosDadosLocais);
        try {
          localStorage.setItem('@EduCore:dadosCursos', JSON.stringify(novosDadosLocais));
        } catch (e) {
          console.warn('Não foi possível salvar no localStorage', e);
        }
      }

      limparFormulario();
      carregarCursos();
    } catch (error) {
      const msg = error.response?.data?.message 
        || error.response?.data?.error
        || 'Erro ao processar a requisição no servidor.';
      
      console.error('Erro na requisição:', msg);
      alert(`Atenção: ${typeof msg === 'object' ? JSON.stringify(msg) : msg}`);
    }
  }

  async function handleExcluir(id) {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      try {
        await api.delete(`/cursos/${id}`);
        
        const novosDados = { ...dadosLocais };
        delete novosDados[id];
        setDadosLocais(novosDados);
        try {
          localStorage.setItem('@EduCore:dadosCursos', JSON.stringify(novosDados));
        } catch (e) {
          console.warn('Erro ao atualizar localStorage', e);
        }

        alert('Curso excluído com sucesso!');
        carregarCursos();
      } catch (error) {
        console.error('Erro ao excluir curso:', error.message || error);
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

          <select value={professorId} onChange={(e) => setProfessorId(e.target.value)}>
            <option value="">Selecione um Professor...</option>
            {professores.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.nome} ({prof.materia || 'Geral'})
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
            const cache = dadosLocais[curso.id] || {};

            const profObj = curso.professor || professores.find(p => String(p.id) === String(curso.professorId || cache.professorId));

            const nomeProfessor =
              profObj?.nome ||
              curso.nomeProfessor ||
              cache.nomeProfessor ||
              '-';

            const materiaExibida =
              curso.materia ||
              curso.disciplina ||
              profObj?.materia ||
              cache.materia ||
              '-';

            const qtdAlunosExibida =
              cache.numeroAlunos ??
              curso.numeroAlunos ??
              curso.qtdAlunos ??
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