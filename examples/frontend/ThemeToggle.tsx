/**
 * Ejemplo de Dark Mode Toggle (UX_UI_MANIFESTO.md §4.1)
 * Toggle en esquina superior derecha, controla data-theme en <html>.
 *
 * Referencia: standards/frontend/UX_UI_MANIFESTO.md §4
 */
import { useState, useEffect } from "react";
import "./ThemeToggle.css";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={dark ? "Modo claro" : "Modo oscuro"}
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
