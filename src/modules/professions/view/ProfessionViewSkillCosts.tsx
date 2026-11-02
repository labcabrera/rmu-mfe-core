import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Rating } from '@mui/material';
import { DataTable, DataTableColumn, Profession } from '@labcabrera-rmu/rmu-react-shared-lib';

type SkillCostEntry = [string, number[]];

const getRatingValue = (cost: number) => Math.max(0, 6 - Math.ceil(cost));

const ProfessionViewSkillCosts: FC<{
  profession: Profession;
}> = ({ profession }) => {
  const { t } = useTranslation();
  const skillEntries = (Object.entries(profession.skillCosts || {}) as SkillCostEntry[]).filter(
    ([, vals]) => Array.isArray(vals) && vals.length > 0
  );

  const columns: DataTableColumn<SkillCostEntry>[] = [
    { key: 'category', header: t('category'), render: ([skillKey]) => t(skillKey) },
    {
      key: 'cost',
      header: t('cost'),
      render: ([, values]) => `${values[0]}${values.length > 1 ? ` / ${values[1]}` : ''}`,
    },
    {
      key: 'rating',
      header: t('rating'),
      render: ([, values]) => (
        <Rating
          name="size-small"
          defaultValue={getRatingValue(values[0])}
          size="small"
          readOnly
          icon={<CircleIcon fontSize="inherit" />}
          emptyIcon={<CircleOutlinedIcon fontSize="inherit" />}
          sx={{ color: 'primary.main' }}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={skillEntries}
      getKey={([skillKey]) => skillKey}
      emptyTitle={t('no-skill-costs-available')}
    />
  );
};

export default ProfessionViewSkillCosts;
