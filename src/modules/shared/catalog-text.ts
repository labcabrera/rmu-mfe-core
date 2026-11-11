import { Culture, Profession } from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';

/** The text of a rulebook entity comes from the locales; what users create shows the text they wrote. */
const localized = (key: string, entity: Profession | Culture, t: TFunction): string | undefined =>
  entity.description && entity.entitySource === 'system'
    ? t(key, { defaultValue: entity.description })
    : entity.description;

export const professionDescription = (profession: Profession, t: TFunction): string | undefined =>
  localized(`profession-description-${profession.id}`, profession, t);

/** Cultures are keyed by their name: their ids differ between environments. */
export const cultureDescription = (culture: Culture, t: TFunction): string | undefined =>
  localized(`culture-description-${culture.name.toLowerCase().replace(/\s+/g, '-')}`, culture, t);
