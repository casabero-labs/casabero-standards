/**
 * Ejemplo de tarjeta con efecto Liquid Glass (glassmorphism)
 * UX_UI_MANIFESTO.md §4: Diseño Visual y Jerarquía
 *
 * - Material translúcido con backdrop-filter
 * - Reflejos dinámicos (light source simulation)
 * - Profundidad con capas
 * - Contenido siempre en primer plano
 */
import type { ReactNode } from "react";
import "./GlassCard.css";

interface GlassCardProps {
  children: ReactNode;
  depth?: 1 | 2 | 3;
  interactive?: boolean;
}

export function GlassCard({
  children,
  depth = 1,
  interactive = false,
}: GlassCardProps) {
  return (
    <div
      className={`glass-card glass-card--depth-${depth} ${interactive ? "glass-card--interactive" : ""}`}
    >
      <div className="glass-card__reflection" />
      <div className="glass-card__content">{children}</div>
    </div>
  );
}
