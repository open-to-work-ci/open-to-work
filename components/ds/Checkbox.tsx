"use client";

import type { CSSProperties, InputHTMLAttributes } from "react";
import { useId, useState } from "react";
import { Icon } from "./Icon";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "style" | "type"> {
  label?: string;
  description?: string;
  style?: CSSProperties;
}

export function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled,
  id,
  style,
  ...rest
}: CheckboxProps) {
  const [internal, setInternal] = useState(!!defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  const uid = id || useId();
  const toggle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (disabled) return;
    if (!isControlled) setInternal(e.target.checked);
    onChange?.(e);
  };
  return (
    <label
      htmlFor={uid}
      style={{
        display: "flex",
        gap: "var(--space-3)",
        alignItems: description ? "flex-start" : "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
    >
      <input
        id={uid}
        type="checkbox"
        checked={on}
        onChange={toggle}
        disabled={disabled}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }}
        {...rest}
      />
      <span
        aria-hidden="true"
        style={{
          display: "grid",
          placeItems: "center",
          width: 20,
          height: 20,
          flex: "0 0 auto",
          marginTop: description ? 2 : 0,
          background: on ? "var(--surface-brand)" : "var(--surface-card)",
          border: `var(--border-width-hairline) solid ${on ? "var(--surface-brand)" : "var(--border-default)"}`,
          borderRadius: "var(--radius-xs)",
          transition: "var(--transition-control)",
        }}
      >
        {on ? <Icon name="check" size={13} style={{ background: "var(--otw-white)" }} /> : null}
      </span>
      <span style={{ display: "grid", gap: 2 }}>
        <span style={{ font: "var(--fw-medium) var(--text-sm)/1.4 var(--font-sans)", color: "var(--text-strong)" }}>{label}</span>
        {description ? (
          <span style={{ font: "var(--fw-regular) var(--text-sm)/1.5 var(--font-sans)", color: "var(--text-muted)" }}>{description}</span>
        ) : null}
      </span>
    </label>
  );
}
