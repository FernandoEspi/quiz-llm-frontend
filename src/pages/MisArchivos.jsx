import { useNavigate } from 'react-router-dom';
import Boton from '../components/Boton';
import Logo from '../components/Logo';

// Datos de prueba — vendrán de listar los PDFs guardados en S3 para este
// usuario (Lambdas "GenerarPdfQuiz" y "GenerarPdfExplicacion" los generan
// y los asocian al userId en DynamoDB).
const ARCHIVOS_MOCK = [
  {
    id: '1',
    tipo: 'quiz',
    titulo: 'Quiz — Derivadas y Límites',
    fecha: '18 jun 2026',
    url: '#',
  },
  {
    id: '2',
    tipo: 'roadmap',
    titulo: 'Roadmap — Derivadas y Límites',
    fecha: '18 jun 2026',
    url: '#',
  },
  {
    id: '3',
    tipo: 'quiz',
    titulo: 'Quiz — Integrales',
    fecha: '10 jun 2026',
    url: '#',
  },
];

const ETIQUETAS_TIPO = {
  quiz: { texto: 'Cuestionario', color: 'bg-accent-light text-accent-dark' },
  roadmap: { texto: 'Roadmap', color: 'bg-success-bg text-success' },
};

export default function MisArchivos() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg">
      <header className="flex items-center justify-between border-b border-border px-6 py-4 md:px-12">
        <Logo size="sm" />
        <Boton variant="ghost" onClick={() => navigate('/')}>
          Volver al inicio
        </Boton>
      </header>

      <div className="flex flex-col items-center gap-6 px-5 py-12">
        <div className="w-full max-w-xl">
          <h1 className="font-display text-2xl font-bold text-text">Mis archivos</h1>
          <p className="mt-1 text-sm text-text-muted font-body">
            Tus quizzes y roadmaps guardados como PDF, listos para descargar cuando los necesites.
          </p>
        </div>

        {ARCHIVOS_MOCK.length === 0 ? (
          <div className="w-full max-w-xl rounded-card border border-border bg-surface p-10 text-center">
            <p className="text-sm text-text-muted font-body">
              Aún no tienes archivos generados. Crea tu primer quiz para empezar.
            </p>
            <div className="mt-4 flex justify-center">
              <Boton onClick={() => navigate('/subir-contenido')}>Hacer un quiz</Boton>
            </div>
          </div>
        ) : (
          <div className="flex w-full max-w-xl flex-col gap-3">
            {ARCHIVOS_MOCK.map((archivo) => {
              const etiqueta = ETIQUETAS_TIPO[archivo.tipo];
              return (
                <div
                  key={archivo.id}
                  className="flex items-center justify-between rounded-card border border-border bg-surface p-5"
                >
                  <div>
                    <span
                      className={`mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold font-body ${etiqueta.color}`}
                    >
                      {etiqueta.texto}
                    </span>
                    <p className="font-display text-base font-semibold text-text">
                      {archivo.titulo}
                    </p>
                    <p className="text-xs text-text-muted font-body">{archivo.fecha}</p>
                  </div>
                  <a href={archivo.url} target="_blank" rel="noopener noreferrer">
                    <Boton variant="ghost">Descargar</Boton>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}