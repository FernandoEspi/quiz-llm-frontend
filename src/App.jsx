import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import SubirContenido from './pages/SubirContenido';
import Quiz from './pages/Quiz';
import Resultado from './pages/Resultado';
import Roadmap from './pages/Roadmap';
import MisArchivos from './pages/MisArchivos';

/**
 * Árbol de rutas de la app.
 *
 * Flujo: Inicio -> Login -> SubirContenido -> Quiz -> Resultado -> Roadmap
 * "/" ya no redirige directo a /login — ahora es la landing page pública,
 * que muestra contenido distinto según haya o no sesión activa
 * (ver services/auth.js, versión mock con localStorage por ahora).
 *
 * TODO (cuando conectemos backend con Cognito/auth propio):
 * envolver las rutas protegidas (/subir-contenido, /quiz, /resultado,
 * /roadmap, /mis-archivos) en un componente <RutaProtegida> que verifique
 * el token y redirija a /login si no existe o expiró.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/subir-contenido" element={<SubirContenido />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/resultado" element={<Resultado />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/mis-archivos" element={<MisArchivos />} />
    </Routes>
  );
}

export default App;
