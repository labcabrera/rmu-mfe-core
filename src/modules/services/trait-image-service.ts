import { defaultImages, imageBaseUrl, Trait } from '@labcabrera-rmu/rmu-react-shared-lib';

const CATEGORIES_WITH_IMAGE = ['combat', 'discipline', 'magical', 'senses', 'racial', 'physical', 'wealth'];
const FLAW_CATEGORIES_WITH_IMAGE = ['physical', 'senses'];
const GENERIC_FLAW_IMAGE = 'images/generic/flaw.png';

/** Asset path of the image of a trait category (`images/generic/trait-<category>.png`, or the generic trait one). */
export const traitCategoryImage = (category: string | null | undefined): string =>
  category && CATEGORIES_WITH_IMAGE.includes(category) ? `images/generic/trait-${category}.png` : defaultImages.trait;

/** Asset path of the image of a flaw (`images/generic/flaw-<category>.png`, or the generic flaw one). */
const flawCategoryImage = (category: string | null | undefined): string =>
  category && FLAW_CATEGORIES_WITH_IMAGE.includes(category)
    ? `images/generic/flaw-${category}.png`
    : GENERIC_FLAW_IMAGE;

/** Asset path of the image of a talent or a flaw. */
export const traitImage = (trait: Pick<Trait, 'category' | 'isTalent'>): string =>
  trait.isTalent === false ? flawCategoryImage(trait.category) : traitCategoryImage(trait.category);

export const getTraitImage = (trait: Trait) => {
  if (!trait) return '';
  return `${imageBaseUrl}${traitImage(trait)}`;
};
