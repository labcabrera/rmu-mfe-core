import { Trait } from '../api/trait.dto';

const imageBaseUrl = process.env.RMU_MFE_ASSETS!;

export const getTraitImage = (trait: Trait) => {
  if (trait.category === 'combat') return `${imageBaseUrl}images/generic/trait-combat.png`;
  if (trait.category === 'magical') return `${imageBaseUrl}images/generic/trait-magical.png`;
  if (trait.category === 'senses') return `${imageBaseUrl}images/generic/trait-senses.png`;
  if (trait.category === 'discipline') return `${imageBaseUrl}images/generic/trait-discipline.png`;
  if (trait.category === 'racial') return `${imageBaseUrl}images/generic/trait-racial.png`;
  if (trait.category === 'physical') return `${imageBaseUrl}images/generic/trait-physical.png`;
  return `${imageBaseUrl}images/generic/trait.png`;
};
