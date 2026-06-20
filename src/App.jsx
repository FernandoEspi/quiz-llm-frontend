import Quiz from './pages/Quiz';

function App() {
  // Vista temporal de desarrollo: renderiza directamente la página de Quiz
  // con datos mock. Cuando agreguemos React Router, esto pasará a ser
  // el árbol de rutas (Login, Dashboard, Quiz, Resultado, Roadmap).
  return <Quiz />;
}

export default App;
