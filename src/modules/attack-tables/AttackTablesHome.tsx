import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { EntityCard, gridSizeShowcase, LayoutBase } from '@labcabrera-rmu/rmu-react-shared-lib';

const OPTIONS = [
  { value: 'attack-tables-attack', subtitle: 'attack-tables-attack-subtitle', image: 'warrior.png', to: 'attack' },
  { value: 'attack-tables-critical', subtitle: 'attack-tables-critical-subtitle', image: 'hp.png', to: 'critical' },
  { value: 'attack-tables-fumble', subtitle: 'attack-tables-fumble-subtitle', image: 'physical.png', to: 'fumble' },
];

/** Entry of the attack, critical and fumble tables (spec 036). */
const AttackTablesHome: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <LayoutBase
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('attack-tables') }]}
    >
      <Grid container spacing={2}>
        {OPTIONS.map((c) => (
          <Grid size={gridSizeShowcase} key={c.value}>
            <EntityCard
              title={t(c.value)}
              description={t(c.subtitle)}
              image={`images/generic/${c.image}`}
              onClick={() => navigate(`/core/attack-tables/${c.to}`)}
            />
          </Grid>
        ))}
      </Grid>
    </LayoutBase>
  );
};

export default AttackTablesHome;
