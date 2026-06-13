import {
  forwardRef,
  useState,
  type CSSProperties,
  type InputHTMLAttributes,
} from "react";
import styles from "./Slider.module.css";

/** Single-value slider — a native `<input type="range">`. */
export type SingleSliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  range?: false;
};

/** Range slider — two thumbs selecting a `[low, high]` band (Figma `Modo=Rango`). */
export interface RangeSliderProps {
  range: true;
  min?: number;
  max?: number;
  step?: number;
  /** Controlled `[low, high]`. */
  value?: [number, number];
  /** Uncontrolled initial `[low, high]`. */
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  disabled?: boolean;
  /** Accessible labels for the `[low, high]` thumbs. */
  labels?: [string, string];
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export type SliderProps = SingleSliderProps | RangeSliderProps;

const cx = (...a: Array<string | false | undefined>) => a.filter(Boolean).join(" ");

const fillFor = (pct: number) =>
  `linear-gradient(90deg, var(--color-bg-brand) ${pct}%, var(--color-bg-subtle) ${pct}%)`;

function RangeSlider({
  min = 0,
  max = 100,
  step,
  value,
  defaultValue,
  onValueChange,
  disabled,
  labels = ["Valor mínimo", "Valor máximo"],
  className,
  style,
  id,
}: Omit<RangeSliderProps, "range">) {
  const controlled = value != null;
  const [internal, setInternal] = useState<[number, number]>(defaultValue ?? [min, max]);
  const [lo, hi] = controlled ? value : internal;

  const span = max > min ? max - min : 1;
  const pctLo = ((lo - min) / span) * 100;
  const pctHi = ((hi - min) / span) * 100;
  // Keep both thumbs grabbable when they overlap: raise whichever sits where the
  // overlap lands (low when the pair is past the midpoint, high otherwise).
  const loOnTop = (pctLo + pctHi) / 2 > 50;

  const commit = (next: [number, number]) => {
    if (!controlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <span
      className={cx(styles.range, disabled && styles.rangeDisabled, className)}
      style={style}
    >
      <span className={styles.rail} aria-hidden />
      <span
        className={styles.band}
        aria-hidden
        style={{ left: `${pctLo}%`, right: `${100 - pctHi}%` }}
      />
      <input
        type="range"
        className={styles.rangeInput}
        min={min}
        max={max}
        step={step}
        value={lo}
        disabled={disabled}
        aria-label={labels[0]}
        id={id ? `${id}-min` : undefined}
        style={{ zIndex: loOnTop ? 4 : 3 }}
        onChange={(e) => commit([Math.min(Number(e.target.value), hi), hi])}
      />
      <input
        type="range"
        className={styles.rangeInput}
        min={min}
        max={max}
        step={step}
        value={hi}
        disabled={disabled}
        aria-label={labels[1]}
        id={id ? `${id}-max` : undefined}
        style={{ zIndex: loOnTop ? 3 : 4 }}
        onChange={(e) => commit([lo, Math.max(Number(e.target.value), lo)])}
      />
    </span>
  );
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(props, ref) {
  if (props.range) {
    const { range: _range, ...rangeProps } = props;
    return <RangeSlider {...rangeProps} />;
  }

  const {
    range: _range,
    className,
    min = 0,
    max = 100,
    value,
    defaultValue,
    style,
    onInput,
    ...rest
  } = props;

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
