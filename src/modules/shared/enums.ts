import { AccessType, MagicPresence, ProfessionArchetype } from '@labcabrera-rmu/rmu-react-shared-lib';

// Static values offered by the EnumPicker of the forms and filters (spec 046, decision 9).

export const ACCESS_TYPES: AccessType[] = ['public', 'private'];

export const MAGIC_PRESENCES: MagicPresence[] = ['unlimited', 'limited', 'none'];

export const PROFESSION_ARCHETYPES: ProfessionArchetype[] = [
  'non-spellcaster',
  'semi-spellcaster',
  'pure-spellcaster',
  'hybrid',
];

/** Race sizes, labelled `size-<value>`. */
export const RACE_SIZES = [
  'minuscule',
  'diminutive',
  'tiny',
  'small',
  'medium',
  'big',
  'large',
  'huge',
  'gigantic',
  'enormous',
];

/** Kinds of trait: `isTalent` true or false. */
export const TRAIT_TYPES = ['talent', 'flaw'];
