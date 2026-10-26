import { StyleCondition } from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';

/** Readable label of an equipment condition of a style or an ability (spec 032). */
export const conditionLabel = (condition: StyleCondition, t: TFunction): string => {
  const value = condition.value;
  switch (condition.kind) {
    case 'weapon-skill': {
      const [skillId, specialization] = (value ?? '').split('@');
      return specialization ? `${t(skillId)} (${t(specialization)})` : t(skillId);
    }
    case 'weapon-tag':
      return t(`weapon-tag-${value}`, { defaultValue: value });
    case 'weapon-category':
      return t(`style-condition-weapon-category-${value}`, { defaultValue: value });
    case 'unarmed':
      return value
        ? `${t('style-condition-unarmed')} (${t(`style-condition-unarmed-${value}`)})`
        : t('style-condition-unarmed');
    case 'max-armor':
      return t('style-condition-max-armor', { value });
    case 'max-shield':
      return t(`style-condition-max-shield-${value}`, { defaultValue: value });
    default:
      return t(`style-condition-${condition.kind}`, { defaultValue: condition.kind });
  }
};

/** Alternatives joined with "or", the conditions of each one with "+". Empty is "any equipment". */
export const equipmentLabel = (equipment: StyleCondition[][], t: TFunction): string =>
  equipment.length === 0
    ? t('style-condition-any')
    : equipment.map((all) => all.map((c) => conditionLabel(c, t)).join(' + ')).join(` ${t('or')} `);
