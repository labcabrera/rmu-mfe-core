import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleAbility } from '@labcabrera-rmu/rmu-react-shared-lib';

/** Namespace with the rule text of the style abilities, keyed by the ability id. */
const STYLE_ABILITY_TEXT_NAMESPACE = 'style-ability-text';

/**
 * Workspace spec 092: the rule text of a style ability in the current language, or the one of the catalog when it has
 * no translation. Reads the namespace directly, so that an id never matches a key of the other namespaces.
 */
export const useStyleAbilityText = (): ((ability: StyleAbility) => string) => {
  const { t, i18n } = useTranslation(STYLE_ABILITY_TEXT_NAMESPACE, { useSuspense: false });
  return useCallback(
    (ability) => {
      const text = i18n.getResource?.(i18n.language, STYLE_ABILITY_TEXT_NAMESPACE, ability.id);
      return typeof text === 'string' && text ? text : (ability.description ?? '');
    },
    // `t` changes when the namespace finishes loading
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, i18n]
  );
};
