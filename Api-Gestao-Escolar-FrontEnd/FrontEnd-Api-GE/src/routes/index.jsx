import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Professores } from '../pages/Professores';
import { Cursos } from '../pages/Cursos';
import { Alunos } from '../pages/Alunos';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/professores" element={<Professores />} />
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/alunos" element={<Alunos />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}