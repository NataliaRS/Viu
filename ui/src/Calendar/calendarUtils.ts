/** Shared date helpers for Calendar / DateField / Datepicker / DateRangePicker. */

export const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

/** Monday-first weekday initials, matching Figma (Mié shares "M" with Mar). */
export const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

const pad = (n: number) => String(n).padStart(2, "0");
export const fmt = (d: Date) => `${pad(d.getDate())} / ${pad(d.getMonth() + 1)} / ${d.getFullYear()}`;
export const sameDay = (a: Date | null, b: Date | null) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Days of `month` (0-based) laid out Monday-first, with leading nulls for blanks. */
export function monthCells(year: number, month: number): Array<Date | null> {
  const lead = (new Date(year, month, 1).getDay() + 6) % 7; // Mon-first
  const days = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = Array(lead).fill(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
  return cells;
}
