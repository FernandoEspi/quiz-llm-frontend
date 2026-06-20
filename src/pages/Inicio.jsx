import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Boton from '../components/Boton';
import { estaSesionActiva, obtenerUsuario, simularLogin, cerrarSesion } from '../services/auth';

/**
 * Página de inicio (landing).
 *
 * - Si NO hay sesión activa: muestra navbar con botón "Iniciar sesión" +
 *   contenido explicativo de la app (hero, objetivos, cómo funciona).
 * - Si SÍ hay sesión activa: navbar muestra el nombre del usuario + botones
 *   para "Hacer un quiz", "Ver mis PDFs" (quizzes/roadmaps guardados), y
 *   cerrar sesión. El contenido explicativo se mantiene igual debajo.
 *
 * TODO (cuando conectemos el backend real):
 * - Reemplazar simularLogin() por la navegación real a /login
 * - "Ver mis PDFs" debe listar los PDFs reales desde S3/DynamoDB del usuario
 */
export default function Inicio() {
  const navigate = useNavigate();
  const sesionActiva = estaSesionActiva();
  const usuario = obtenerUsuario();

  function manejarCerrarSesion() {
    cerrarSesion();
    navigate('/'); // recarga el estado de la navbar (sin sesión)
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* ===== Navbar ===== */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4 md:px-12">
        <Logo />

        {!sesionActiva ? (
          <Boton onClick={() => navigate('/login')}>Iniciar sesión</Boton>
        ) : (
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-text-muted font-body md:inline">
              Hola, {usuario?.nombre}
            </span>
            <Boton variant="ghost" onClick={() => navigate('/mis-archivos')}>
              Mis PDFs
            </Boton>
            <Boton onClick={() => navigate('/subir-contenido')}>Hacer un quiz</Boton>
            <button
              onClick={manejarCerrarSesion}
              className="text-sm font-medium text-text-muted underline-offset-2 hover:underline font-body"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </header>

      {/* ===== Hero ===== */}
      <section className="flex flex-col items-center gap-8 px-6 py-16 text-center md:py-24">
        <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight text-text md:text-5xl">
          Convierte tus apuntes en quizzes, <span className="text-accent">y descubre qué repasar</span>
        </h1>
        <p className="max-w-xl text-base text-text-muted font-body md:text-lg">
          Sube un PDF o pega tu contenido de estudio. Generamos un cuestionario al instante,
          y cuando termines, te decimos exactamente qué temas necesitas repasar — en el orden
          correcto.
        </p>

        {!sesionActiva ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <Boton onClick={() => navigate('/login')}>Comenzar gratis</Boton>
            {/* Botón de prueba mientras no hay backend real conectado */}
            <Boton
              variant="ghost"
              onClick={() => {
                simularLogin('Fernando');
                window.location.reload();
              }}
            >
              Simular sesión (demo)
            </Boton>
          </div>
        ) : (
          <Boton onClick={() => navigate('/subir-contenido')}>Crear mi primer quiz</Boton>
        )}

        <HeroIlustracion />
      </section>

      {/* ===== Cómo funciona ===== */}
      <section className="bg-surface px-6 py-16 md:py-20">
        <h2 className="mb-10 text-center font-display text-3xl font-bold text-text">
          Cómo funciona
        </h2>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          <PasoCard
            numero="1"
            titulo="Sube tu contenido"
            descripcion="Un PDF de tus apuntes, o simplemente pega el texto del tema que quieres practicar."
            icono={<IconoSubir />}
          />
          <PasoCard
            numero="2"
            titulo="Responde tu quiz"
            descripcion="Preguntas generadas al instante, con o sin cronómetro, a tu ritmo."
            icono={<IconoQuiz />}
          />
          <PasoCard
            numero="3"
            titulo="Repasa lo que falta"
            descripcion="Recibe un roadmap personalizado con los temas a reforzar, en el orden correcto."
            icono={<IconoRoadmap />}
          />
        </div>
      </section>

      {/* ===== Objetivo del proyecto ===== */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 md:flex-row">
          <div className="flex-1">
            <h2 className="mb-4 font-display text-3xl font-bold text-text">
              Por qué lo hicimos
            </h2>
            <p className="text-base leading-relaxed text-text-muted font-body">
              Estudiar para un examen no debería significar adivinar qué temas repasar.
              Esta herramienta usa inteligencia artificial para generar quizzes a partir de
              tu propio material, y analiza tus respuestas para mostrarte un plan de estudio
              claro — basado en lo que realmente necesitas reforzar, no en el orden en que
              aparece en tus apuntes.
            </p>
          </div>
          <div className="flex-1">
            <ObjetivoIlustracion />
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-text-muted font-body">
        Proyecto académico — Arquitectura Basada en Eventos e Integración con LLMs
      </footer>
    </div>
  );
}

function PasoCard({ numero, titulo, descripcion, icono }) {
  return (
    <div className="rounded-card border border-border bg-bg p-7 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-accent-dark">
        {icono}
      </div>
      <p className="mb-1 text-xs font-bold uppercase tracking-wide text-accent-dark font-body">
        Paso {numero}
      </p>
      <h3 className="mb-2 font-display text-lg font-semibold text-text">{titulo}</h3>
      <p className="text-sm leading-relaxed text-text-muted font-body">{descripcion}</p>
    </div>
  );
}

/* ===== Ilustraciones SVG propias (evita depender de imágenes externas con licencia ambigua) ===== */

function HeroIlustracion() {
  return (
    <svg width="280" height="180" viewBox="0 0 280 180" fill="none" className="mt-4">
      <rect x="20" y="40" width="240" height="120" rx="14" fill="#FFFFFF" stroke="#EDE5D6" strokeWidth="2" />
      <rect x="40" y="60" width="160" height="14" rx="4" fill="#E8742C" opacity="0.85" />
      <rect x="40" y="84" width="200" height="10" rx="4" fill="#EDE5D6" />
      <rect x="40" y="102" width="180" height="10" rx="4" fill="#EDE5D6" />
      <circle cx="225" cy="65" r="10" fill="#2F9E6E" />
      <path d="M220 65l4 4 6-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="40" y="124" width="100" height="22" rx="11" fill="#E8742C" />
      <text x="56" y="139" fontSize="11" fill="white" fontFamily="sans-serif" fontWeight="600">
        Siguiente
      </text>
    </svg>
  );
}

function ObjetivoIlustracion() {
  return (
    <svg width="100%" height="200" viewBox="0 0 320 200" fill="none">
      <circle cx="160" cy="100" r="80" fill="#FFF3E8" />
      <path
        d="M120 110l25 25 55-65"
        stroke="#2F9E6E"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="160" cy="100" r="80" stroke="#E8742C" strokeWidth="3" fill="none" strokeDasharray="6 6" />
    </svg>
  );
}

function IconoSubir() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 16V4M12 4l-5 5M12 4l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconoQuiz() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function IconoRoadmap() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 18l5-12 5 8 6-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="20" cy="4" r="2" fill="currentColor" />
    </svg>
  );
}
