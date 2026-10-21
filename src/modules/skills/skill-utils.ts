import { Skill } from '@labcabrera-rmu/rmu-react-shared-lib';

/** i18n key of a skill's description (specialized ids `skill@spec` share the base skill's one). */
export const skillDescriptionKey = (skill: Skill) => `skill-${skill.id.split('@')[0]}-description`;
