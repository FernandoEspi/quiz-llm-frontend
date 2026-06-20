import { useEffect, useState } from 'react';

export default function Cronometro({ segundosRestantes, onTiempoAgotado }) {
  useEffect(() => {
    if (segundosRestantes <= 0) {
      onTiempoAgotado?.();
    }
  }, [segundosRestantes, onTiempoAgotado]);

  const minutos = Math.floor(segundosRestantes / 60);
  const segundos = segundosRestantes % 60;
  const formato = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

  const urgente = segundosRestantes <= 30;

  return (
    <div
      className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold font-body ${
        urgente
          ? 'border-error bg-error-bg text-error'
          : 'border-border bg-surface text-accent-dark'
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full animate-pulse ${
          urgente ? 'bg-error' : 'bg-accent'
        }`}
      />
      {formato}
    </div>
  );
}