import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { AddButton, CategorySeparator, Culture } from '@labcabrera-rmu/rmu-react-shared-lib';
import AddCultureSkillRankDialog from '../shared/AddCultureSkillRankDialog';
import CultureSkillRankTable from '../shared/CultureSkillRankTable';

/** Skill rank entries edited locally; saving the form sends the whole list (PATCH replaces it). */
const CultureFormSkillRanks: FC<{
  formData: Culture;
  setFormData: (data: Culture) => void;
}> = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const [addOpen, setAddOpen] = useState(false);
  const entries = formData.skillRanks || [];

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <CategorySeparator text={t('culture-skill-ranks')}>
          <AddButton onClick={() => setAddOpen(true)} />
        </CategorySeparator>
      </Grid>
      <Grid size={12}>
        <CultureSkillRankTable
          entries={entries}
          onDelete={(index) => setFormData({ ...formData, skillRanks: entries.filter((_, i) => i !== index) })}
        />
      </Grid>
      <AddCultureSkillRankDialog
        open={addOpen}
        onAdd={(entry) => setFormData({ ...formData, skillRanks: [...entries, entry] })}
        onClose={() => setAddOpen(false)}
      />
    </Grid>
  );
};

export default CultureFormSkillRanks;
