import { useState, useCallback, ChangeEvent } from 'react';

type Form = Record<string, string>;
type OnChange = (e: ChangeEvent<HTMLInputElement>) => void;
type Reset = () => void;

interface InputEventTarget extends EventTarget {
  name: string;
  value: string;
}

function useInputs(initialForm: Form): [Form, OnChange, Reset] {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target as InputEventTarget;
      setForm({ ...form, [name]: value });
    },
    [form],
  );

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, onChange, reset];
}

export default useInputs;
