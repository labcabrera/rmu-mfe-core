import { ReactNode } from 'react';
import { SkillDifficultyGuide } from '@labcabrera-rmu/rmu-react-shared-lib';

/** What the maneuvers page passes to the absolute and percent tabs: the difficulty and the chosen skill. */
export interface ManeuverTabProps {
  difficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  /** Example difficulties of the skill, or the general scale. */
  guide: SkillDifficultyGuide | null;
  /** Result table of the skill's profile. */
  resultTable?: string;
  /** Sum of the catalog modifiers picked for the skill. */
  skillModifiers: number;
  /** The panel of the skill's catalog modifiers, when a skill is chosen. */
  modifiersPanel?: ReactNode;
}
