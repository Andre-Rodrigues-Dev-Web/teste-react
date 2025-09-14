import "./LabeledInput.css";
import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
interface BaseLabeledInputProps {
  title: string;
  id: string;
  placeholder: string;
  value: string;
  className?: string;
}
interface LabeledInputProps {
  textarea?: false;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
}

interface LabeledTextareaProps {
  textarea: true;
  rows?: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export const LabeledInput = (
  props: BaseLabeledInputProps & (LabeledInputProps | LabeledTextareaProps),
) => {
  return (
    <div className={`labeled-input ${props.className ?? ""}`}>
      <label className="labeled-input__label" htmlFor={props.id}>
        {props.title}
      </label>
      {props.textarea ? (
        <textarea
          className="labeled-input__textarea"
          id={props.id}
          value={props.value}
          placeholder={props.placeholder}
          rows={props.rows}
          onChange={props.onChange}
        />
      ) : (
        <input
          className="labeled-input__input"
          type={props.type}
          id={props.id}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      )}
    </div>
  );
};
