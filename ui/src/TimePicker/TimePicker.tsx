import { forwardRef } from "react";
import { PickerField, type PickerFieldProps } from "./PickerField";

export type TimePickerProps = Omit<PickerFieldProps, "pickerType">;

/** Time field: a trigger that opens the native time picker (Time picker). */
export const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(function TimePicker(props, ref) {
  return <PickerField ref={ref} pickerType="time" {...props} />;
});
