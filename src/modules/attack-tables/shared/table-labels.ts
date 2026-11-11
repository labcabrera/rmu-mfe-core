import type { TableEffect } from '@labcabrera-rmu/rmu-react-shared-lib';
import type { TFunction } from 'i18next';

/** `cold-ball` -> `Cold ball`: the name of a table without a translation. */
const readable = (id: string) => id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' ');

/** Name of an attack or fumble table: its translation when there is one, else the id made readable. */
export const tableName = (id: string, t: TFunction): string => t(id, { defaultValue: readable(id) });

/** Name of a critical type (`P` -> Puncture). */
export const criticalTypeName = (type: string, t: TFunction): string =>
  t(`critical-type-${type}`, { defaultValue: readable(type) });

export const rollBand = (rollMin: number, rollMax: number): string =>
  rollMin === rollMax ? `${rollMin}` : `${rollMin}-${rollMax}`;

/**
 * Short label of a critical or fumble effect: its status with the value, the location or severity, the rounds and the
 * delay (as the combat dashboard shows them, spec 034).
 */
export const effectLabel = (effect: TableEffect, t: TFunction): string => {
  const value = effect.value as number | string | undefined;
  const labels = [value !== undefined && value !== null ? `${t(effect.status)} ${value}` : t(effect.status)];
  if (typeof effect.location === 'string') labels.push(t(effect.location));
  if (typeof effect.severity === 'string') labels.push(t('critical-severity-n', { severity: effect.severity }));
  if (typeof effect.rounds === 'number')
    labels.push(`${effect.rounds} ${effect.rounds === 1 ? t('round') : t('rounds')}`);
  if (effect.delay !== undefined) labels.push(`${t('delay')} ${String(effect.delay)}`);
  return labels.join(', ');
};
