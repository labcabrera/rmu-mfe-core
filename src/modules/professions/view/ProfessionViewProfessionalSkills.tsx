import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip } from '@mui/material';
import { ChipRow, EmptyState, Profession } from '@labcabrera-rmu/rmu-react-shared-lib';

const ProfessionViewProfessionalSkills: FC<{
  profession: Profession;
}> = ({ profession }) => {
  const { t } = useTranslation();
  if (profession.professionalSkills.length === 0) return <EmptyState dense />;
  return (
    <ChipRow>
      {profession.professionalSkills.map((skill, index) => (
        <Chip key={index} label={t(skill)} color="primary" />
      ))}
    </ChipRow>
  );
};

export default ProfessionViewProfessionalSkills;
