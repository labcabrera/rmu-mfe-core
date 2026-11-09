import { MANEUVER_DIFFICULTIES, SkillDifficultyGuide } from '@labcabrera-rmu/rmu-react-shared-lib';

/**
 * The guide the picker shows: the skill's examples, completed with the general text for each difficulty the book
 * gives no example of. Without a skill guide (no skill chosen, or still loading) it is the general scale.
 */
export const completeDifficultyGuide = (
  guide: SkillDifficultyGuide | null,
  general: SkillDifficultyGuide | null
): SkillDifficultyGuide | null => {
  if (!guide) return general;
  if (!general || guide.fallback) return guide;
  const examples = MANEUVER_DIFFICULTIES.flatMap(({ key }) => {
    const example =
      guide.examples.find((each) => each.difficulty === key) ??
      general.examples.find((each) => each.difficulty === key);
    return example ? [example] : [];
  });
  return { ...guide, examples };
};
