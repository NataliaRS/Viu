import { forwardRef } from "react";
import { PickerField, type PickerFieldProps } from "../TimePicker/PickerField";

export type DatepickerProps = Omit<PickerFieldProps, "pickerType">;

/** Date field: a trigger that opens the native date picker (Datepicker). */
export const Datepicker = forwardRef<HTMLInputElement, DatepickerProps>(function Datepicker(props, ref) {
  return <PickerField ref={ref} pickerType="date" {...props} />;
});
