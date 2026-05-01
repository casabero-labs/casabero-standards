/**
 * Ejemplo de formulario con inputs perfectos (UX_UI_MANIFESTO.md §2)
 * Auto-focus, inputmode adaptativo, prevención de errores.
 *
 * Referencia: standards/frontend/UX_UI_MANIFESTO.md §2.1, §2.2, §2.3
 */
import { useEffect, useRef } from "react";
import "./Input.css";

interface InputProps {
  label: string;
  type?: "text" | "number" | "tel" | "email";
  placeholder?: string;
  hint?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

export function Input({
  label,
  type = "text",
  placeholder,
  hint,
  error,
  value,
  onChange,
  autoFocus = false,
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
    }
  }, [autoFocus]);

  const inputMode =
    type === "number" || type === "tel" ? "numeric" : undefined;

  return (
    <div className={`input-group ${error ? "input-group--error" : ""}`}>
      <label className="input-group__label">{label}</label>
      {hint && <span className="input-group__hint">{hint}</span>}
      <input
        ref={ref}
        className="input-group__field"
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="input-group__error">{error}</span>}
    </div>
  );
}
