/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { EntityType } from '@labcabrera-rmu/rmu-react-shared-lib';

export type FormMode = 'create' | 'edit';

/** The form never edits the owner, and the source only through the admin field (spec 063). */
const withoutServerFields = <F>(data: F): F => {
  if (!data || typeof data !== 'object') return data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { owner, entitySource, ...rest } = data as Record<string, unknown>;
  return rest as F;
};

/**
 * Form state of a create/edit page: starts from `empty` when creating, or from the loaded entity
 * (through `toForm`) when editing, and reports whether the user changed anything.
 *
 * The form data never carries `owner` or `entitySource`. The source (spec 063) lives apart: `sourceField` binds the
 * admin-only EntitySourceField, and `withSource` adds `entitySource` to a request only after that field changed it.
 */
export function useFormData<T, F = T>(
  mode: FormMode,
  entity: T | undefined,
  empty: () => F,
  toForm: (entity: T) => F = (value) => value as unknown as F
) {
  const [formData, setFormData] = useState<F>();
  const [initial, setInitial] = useState<string>();
  const [entitySource, setEntitySource] = useState<EntityType>();

  useEffect(() => {
    if (formData) return;
    const data = mode === 'create' ? empty() : entity && toForm(entity);
    if (data) {
      const clean = withoutServerFields(data);
      setFormData(clean);
      setInitial(JSON.stringify(clean));
    }
  }, [entity]);

  const current = mode === 'edit' ? (entity as { entitySource?: EntityType } | undefined)?.entitySource : undefined;

  return {
    formData,
    setFormData: setFormData as (data: F) => void,
    dirty: !!formData && (JSON.stringify(formData) !== initial || !!entitySource),
    sourceField: { value: entitySource ?? current, onChange: setEntitySource },
    withSource: <D extends object>(dto: D): D & { entitySource?: EntityType } =>
      entitySource ? { ...dto, entitySource } : dto,
  };
}
