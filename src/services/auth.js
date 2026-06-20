/**
 * Servicio de autenticación — VERSIÓN MOCK con localStorage.
 *
 * TODO (cuando conectemos el backend real con JWT):
 * - estaSesionActiva() seguirá funcionando igual (solo revisa si hay token guardado)
 * - simularLogin() se reemplaza por una llamada real a POST /auth/login
 * - cerrarSesion() seguirá igual (solo borra el token)
 *
 * La forma de leer el estado de auth desde los componentes (estaSesionActiva,
 * obtenerUsuario) no debería cambiar cuando conectemos el backend real —
 * solo cambia CÓMO se obtiene el token, no cómo se consulta.
 */

const CLAVE_TOKEN = 'quiz_llm_token';
const CLAVE_USUARIO = 'quiz_llm_usuario';

export function estaSesionActiva() {
  return Boolean(localStorage.getItem(CLAVE_TOKEN));
}

export function obtenerUsuario() {
  const raw = localStorage.getItem(CLAVE_USUARIO);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Simula un login exitoso sin llamar al backend.
 * Útil para probar el frontend mientras el backend de auth no está conectado.
 */
export function simularLogin(nombre = 'Fernando') {
  localStorage.setItem(CLAVE_TOKEN, 'token-simulado-' + Date.now());
  localStorage.setItem(CLAVE_USUARIO, JSON.stringify({ nombre }));
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_TOKEN);
  localStorage.removeItem(CLAVE_USUARIO);
}
