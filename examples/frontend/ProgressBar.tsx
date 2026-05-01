/**
 * Ejemplo de barra de progreso con animaciones éxito/error
 * UX_UI_MANIFESTO.md §1: Transparencia de Estado
 *
 * - >800ms = visible
 * - % real, actualización cada 300ms
 * - Éxito = pulso suave (NO color)
 * - Error = sacudida (NO color)
 * - Mensaje humano debajo
 */
import { useEffect, useState, useCallback } from "react";
import "./ProgressBar.css";

type BarStatus = "idle" | "running" | "success" | "error";

interface ProgressBarProps {
  progress: number; // 0-100
  message: string;
  status?: BarStatus;
}

export function ProgressBar({
  progress,
  message,
  status = "running",
}: ProgressBarProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Actualizar suavemente cada 300ms hacia el % real
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (Math.abs(prev - progress) < 1) return progress;
        return prev + (progress - prev) * 0.3;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [progress]);

  // Si la operación dura <800ms, esperar ese mínimo antes de mostrar
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible && status === "running") return null;

  return (
    <div className="progress" role="progressbar" aria-valuenow={Math.round(displayProgress)} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress__track">
        <div
          className={`progress__bar progress__bar--${status}`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      <p className={`progress__message progress__message--${status}`}>
        {message}
      </p>
    </div>
  );
}
