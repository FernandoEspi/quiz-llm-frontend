import { useState } from 'react';
import Quiz from './pages/Quiz';
import Resultado from './pages/Resultado';
import Roadmap from './pages/Roadmap';

// Vista temporal de desarrollo: navegación simple por estado, sin React Router
// todavía. Cuando agreguemos Router, esto pasará a ser el árbol de rutas
// (Login, Dashboard, SubirContenido, Quiz, Resultado, Roadmap).
function App() {
  const [vista, setVista] = useState('quiz'); // 'quiz' | 'resultado' | 'roadmap'

  if (vista === 'resultado') {
    return (
      <Resultado
        onVerRoadmap={() => setVista('roadmap')}
        onVolverInicio={() => setVista('quiz')}
      />
    );
  }

  if (vista === 'roadmap') {
    return <Roadmap onVolverInicio={() => setVista('quiz')} />;
  }

  return <Quiz onTerminar={() => setVista('resultado')} />;
}

export default App;