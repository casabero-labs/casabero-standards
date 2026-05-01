/**
 * Ejemplo de componente "tonto" siguiendo UX_UI_MANIFESTO.md §7.2
 * Arquitectura "Dumb": componente acoplado a su archivo CSS homónimo.
 *
 * Referencia: standards/frontend/UX_UI_MANIFESTO.md §7.2, §7.3
 */
import "./Card.css";

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "default" | "elevated" | "glass";
}

export function Card({ title, subtitle, children, variant = "default" }: CardProps) {
  return (
    <div className={`card card--${variant}`}>
      <div className="card__header">
        <h3 className="card__title">{title}</h3>
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
      </div>
      <div className="card__body">{children}</div>
    </div>
  );
}
