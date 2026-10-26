import { ManeuverModifier } from '@labcabrera-rmu/rmu-react-shared-lib';

/** What the user picked for each catalog modifier: a flag on, an option key, or a number of units. */
export type ModifierSelections = Record<string, true | string | number>;

/** Value of one modifier for its selection: the flag's value, the option's value, or units × per unit. */
export const modifierValue = (modifier: ManeuverModifier, selection: true | string | number | undefined): number => {
  if (selection === undefined) return 0;
  switch (modifier.type) {
    case 'flag':
      return modifier.value ?? 0;
    case 'choice':
      return modifier.options?.find((option) => option.key === selection)?.value ?? 0;
    case 'number':
      return typeof selection === 'number' ? selection * (modifier.perUnit ?? 0) : 0;
  }
};

export const modifiersTotal = (modifiers: ManeuverModifier[], selections: ModifierSelections): number =>
  modifiers.reduce((total, modifier) => total + modifierValue(modifier, selections[modifier.key]), 0);
