import { forwardRef, type CSSProperties, type InputHTMLAttributes } from "react";
import styles from "./Slider.module.css";

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

const fillFor = (pct: number) =>
  `linear-gradient(90deg, var(--color-bg-brand) ${pct}%, var(--color-bg-subtle) ${pct}%)`;

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { className, min = 0, max = 100, value, defaultValue, style, onInput, ...rest },
  ref,
) {
  const lo = Number(min);
  const hi = Number(max);
  const current = Number(value ?? defaultValue ?? lo);
  const pct = hi > lo ? ((current - lo) / (hi - lo)) * 100 : 0;

  return (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      value={value}
      defaultValue={defaultValue}
      className={cx(styles.slider, className)}
      style={{ "--viu-track": fillFor(pct), ...style } as CSSProperties}
      onInput={(e) => {
        // keep the WebKit fill live for uncontrolled usage too
        const el = e.currentTarget;
        const p = hi > lo ? ((Number(el.value) - lo) / (hi - lo)) * 100 : 0;
        el.style.setProperty("--viu-track", fillFor(p));
        onInput?.(e);
      }}
      {...rest}
    />
  );
});
