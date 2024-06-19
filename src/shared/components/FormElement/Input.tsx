import { forwardRef, InputHTMLAttributes, LabelHTMLAttributes, RefObject, TextareaHTMLAttributes } from "react";

type TInputProps = {
  label: LabelHTMLAttributes<HTMLLabelElement>;
  input?: InputHTMLAttributes<HTMLInputElement>;
  textarea?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  element: "input" | "textarea";
  error: string | null;
};

type TRef = HTMLInputElement | HTMLTextAreaElement;

const Input = forwardRef<TRef, TInputProps>((props, ref) => {
  const inputRef = ref as RefObject<HTMLInputElement>;
  const textareaRef = ref as RefObject<HTMLTextAreaElement>;

  const elementInput =
    props.element === "input" ? (
      <input
        {...props.input}
        ref={inputRef}
        className="w-full p-2 rounded ring-1 ring-slate-500 focus:outline-none focus:outline-slate-600 focus:ring"
      />
    ) : (
      <textarea
        {...props.textarea}
        ref={textareaRef}
        className="w-full p-2 rounded ring-1 ring-slate-500 focus:outline-none focus:outline-slate-600 focus:ring"
      />
    );

  return (
    <div className="max-w-lg md:max-w-2xl mx-auto flex flex-col mb-3">
      <label {...props.label} className="mb-3 text-xl font-serif">
        {props.label.title}
      </label>
      {elementInput}
      {props.error && <p className="text-red-500 my-1.5">{props.error}</p>}
    </div>
  );
});

export default Input;
