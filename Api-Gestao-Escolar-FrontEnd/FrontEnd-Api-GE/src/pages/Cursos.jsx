import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './Cursos.css';

export function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [idEditando, setIdEditando] = useState(null);

  const [nome, setNome] = useState('');
  const [materia, setMateria] = useState('');
  const [area, setArea] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [numeroAlunos, setNumeroAlunos] = useState('');
  const [professor, setProfessor] = useState('');

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

  useEffect(() => {
    carregarCursos();
  }, []);

  function limparFormulario() {
    setIdEditando(null);
    setNome('');
    setMateria('');
    setArea('');
    setCargaHoraria('');
    setNumeroAlunos('');
    setProfessor('');
  }

  function handleIniciarEdicao(curso) {
    setIdEditando(curso.id);
    setNome(curso.nome || '');
    setMateria(curso.materia || '');
    setArea(curso.area || '');
    setCargaHoraria(curso.cargaHoraria ? String(curso.cargaHoraria) : '');
    setNumeroAlunos(curso.numeroAlunos ? String(curso.numeroAlunos) : '');
    setProfessor(curso.professor || '');
  }

  async function handleSalvar(e) {
    e.preventDefault();

    const payload = {
      nome,
      materia,
      area,
      cargaHoraria: Number(cargaHoraria),
      numeroAlunos: Number(numeroAlunos),
      professor
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
      console.error('Erro ao salvar curso:', error.response?.data || error.message);
      alert(`Erro: ${JSON.stringify(error.response?.data || 'Erro na requisição')}`);
    }
  }

  async function handleExcluir(id) {
    if (window.confirm('Tem certeza que deseja apagar este curso?')) {
      try {
        await api.delete(`/cursos/${id}`);
        alert('Curso excluído com sucesso!');
        carregarCursos();
      } catch (error) {
        console.error('Erro ao excluir curso:', error);
        alert('Erro ao excluir o curso.');
      }
    }
  }

  return (
    <div className="container">
      <h2>📚 Gestão de Cursos</h2>

      <form onSubmit={handleSalvar} className="form-card">
        <h3>{idEditando ? '✏️ Editar Curso' : '➕ Novo Curso'}</h3>

        <input
          type="text"
          placeholder="Nome do Curso"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Matéria"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Área (ex: TI, Exatas)"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Carga Horária (em horas)"
          value={cargaHoraria}
          onChange={(e) => setCargaHoraria(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Número de Alunos"
          value={numeroAlunos}
          onChange={(e) => setNumeroAlunos(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Professor Responsável"
          value={professor}
          onChange={(e) => setProfessor(e.target.value)}
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

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Matéria</th>
            <th>Área</th>
            <th>Carga Horária</th>
            <th>Nº Alunos</th>
            <th>Professor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cursos) && cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.id}</td>
              <td>{curso.nome}</td>
              <td>{curso.materia}</td>
              <td>{curso.area || '-'}</td>
              <td>{curso.cargaHoraria ? `${curso.cargaHoraria}h` : '-'}</td>
              <td>{curso.numeroAlunos}</td>
              <td>{curso.professor}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}