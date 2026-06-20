/**
 * Logo de la app — versión placeholder en texto.
 * TODO: reemplazar por <img src="/logo.svg" /> cuando tengas el diseño final.
 */
export default function Logo({ size = 'md' }) {
  const tamanos = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <span className={`font-display font-bold text-text ${tamanos[size]}`}>
      Quiz<span className="text-accent">LLM</span>
    </span>
  );
}
