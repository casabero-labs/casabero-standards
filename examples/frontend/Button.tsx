/**
 * Botón unificado Casabero (UX_UI_MANIFESTO.md §8)
 *
 * Principios:
 * - Un solo componente para toda la app
 * - Jerarquía por posición, tamaño y animación — NO por color
 * - Acciones destructivas: sacudida + confirmación, sin fondo rojo
 * - Accesible para daltonismo (protanopia, deuteranopia, tritanopia)
 * - Solo el focus outline usa color (por accesibilidad WCAG)
 */
import { useState, useCallback } from "react";
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void | Promise<void>;
  variant?: "default" | "destructive";
  size?: "standard" | "large";
  disabled?: boolean;
  loading?: boolean;
  destructiveConfirmLabel?: string;
  destructiveCancelLabel?: string;
}

export function Button({
  children,
  onClick,
  variant = "default",
  size = "standard",
  disabled = false,
  loading = false,
  destructiveConfirmLabel = "¿Eliminar?",
  destructiveCancelLabel = "Cancelar",
}: ButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [status, setStatus] = useState<"idle" | "shaking" | "success">("idle");

  const handleClick = useCallback(async () => {
    if (disabled || loading) return;

    // Acción destructiva: primer click → sacudida + confirmación
    if (variant === "destructive" && !confirming) {
      setStatus("shaking");
      setTimeout(() => setConfirming(true), 400);
      return;
    }

    // Ejecutar acción
    setStatus("idle");
    try {
      await onClick();
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setConfirming(false);
      }, 2000);
    } catch {
      setStatus("shaking");
      setTimeout(() => setStatus("idle"), 400);
    }
  }, [disabled, loading, variant, confirming, onClick]);

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirming(false);
    setStatus("idle");
  };

  const label = loading
    ? "..."
    : status === "success"
      ? "✓"
      : confirming
        ? destructiveConfirmLabel
        : children;

  return (
    <div className={`button-wrapper button-wrapper--${size}`}>
      <button
        className={`button button--${status} button--${size} ${disabled || loading ? "button--disabled" : ""}`}
        onClick={handleClick}
        disabled={disabled || loading}
        type="button"
        aria-busy={loading}
        aria-disabled={disabled || loading}
      >
        <span className="button__label">
          {label}
          {loading && <span className="button__ellipsis" aria-hidden="true" />}
        </span>
      </button>

      {confirming && (
        <button
          className="button button--cancel button--${size}"
          onClick={handleCancel}
          type="button"
        >
          {destructiveCancelLabel}
        </button>
      )}
    </div>
  );
}
