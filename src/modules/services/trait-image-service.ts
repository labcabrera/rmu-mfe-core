import { Trait } from '../api/trait.dto';

export const getTraitImage = (trait: Trait) => {
  if (trait.category === 'combat') return '/static/images/generic/trait-combat.png';
  if (trait.category === 'magical') return '/static/images/generic/trait-magical.png';
  if (trait.category === 'senses') return '/static/images/generic/trait-senses.png';
  if (trait.category === 'discipline') return '/static/images/generic/trait-discipline.png';
  if (trait.category === 'racial') return '/static/images/generic/trait-racial.png';
  if (trait.category === 'physical') return '/static/images/generic/trait-physical.png';
  return '/static/images/generic/trait.png';
};
