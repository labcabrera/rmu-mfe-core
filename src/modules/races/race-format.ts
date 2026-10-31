import { normalizeText, Race } from '@labcabrera-rmu/rmu-react-shared-lib';
import { TFunction } from 'i18next';

/** The archetypes of the races with a text (`race-archetype-<key>`); others are shown as their key (spec 059). */
export const RACE_ARCHETYPES = [
  'human',
  'high-human',
  'humanoid',
  'dwarf',
  'elf',
  'grey-elf',
  'high-elf',
  'wood-elf',
  'halfling',
  'orc',
  'high-orc',
  'lesser-orc',
  'goblin',
  'troll',
  'undead',
];

/**
 * The key an archetype is stored as (spec 059): lowercase, without accents, any run of other characters as one `-`,
 * no `-` at the ends (`High Human` → `high-human`). Same rule as the platform migration `059-race-archetypes.js`.
 */
export const raceArchetypeKey = (text: string): string =>
  normalizeText(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** The text of an archetype key, or the key itself when it has none. */
export const archetypeLabel = (key: string, t: TFunction): string => t(`race-archetype-${key}`, { defaultValue: key });

/**
 * The translated name of a race: its own text when the name is a translation key, else the archetype text when the
 * name is an archetype (`Dwarf` → `Enano`), else the name as stored.
 */
export const raceName = (race: Pick<Race, 'name'>, t: TFunction): string => {
  const own = t(race.name);
  if (own !== race.name) return own;
  return t(`race-archetype-${raceArchetypeKey(race.name)}`, { defaultValue: race.name });
};
