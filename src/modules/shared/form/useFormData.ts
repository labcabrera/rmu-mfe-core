/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export type FormMode = 'create' | 'edit';

/**
 * Form state of a create/edit page: starts from `empty` when creating, or from the loaded entity
 * (through `toForm`) when editing, and reports whether the user changed anything.
 */
export function useFormData<T, F = T>(
  mode: FormMode,
  entity: T | undefined,
  empty: () => F,
  toForm: (entity: T) => F = (value) => value as unknown as F
) {
  const [formData, setFormData] = useState<F>();
  const [initial, setInitial] = useState<string>();

  useEffect(() => {
    if (formData) return;
    const data = mode === 'create' ? empty() : entity && toForm(entity);
    if (data) {
      setFormData(data);
      setInitial(JSON.stringify(data));
    }
  }, [entity]);

  return {
    formData,
    setFormData: setFormData as (data: F) => void,
    dirty: !!formData && JSON.stringify(formData) !== initial,
  };
}
