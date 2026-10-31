import { defaultImages, imageBaseUrl, Trait } from '@labcabrera-rmu/rmu-react-shared-lib';

// `discipline` has no image of its own (workspace spec 057): it uses the generic trait one.
const CATEGORIES_WITH_IMAGE = ['combat', 'magical', 'senses', 'racial', 'physical'];

/** Asset path of the image of a trait category (`images/generic/trait-<category>.png`, or the generic trait one). */
export const traitCategoryImage = (category: string | null | undefined): string =>
  category && CATEGORIES_WITH_IMAGE.includes(category) ? `images/generic/trait-${category}.png` : defaultImages.trait;

export const getTraitImage = (trait: Trait) => {
  if (!trait) return '';
  return `${imageBaseUrl}${traitCategoryImage(trait.category)}`;
};
