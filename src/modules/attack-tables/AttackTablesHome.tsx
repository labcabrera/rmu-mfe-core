import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { EntityCard, CardGrid, LayoutBase } from '@labcabrera-rmu/rmu-react-shared-lib';

const OPTIONS = [
  { value: 'attack-tables-attack', subtitle: 'attack-tables-attack-subtitle', image: 'warrior.png', to: 'attack' },
  {
    value: 'attack-tables-critical',
    subtitle: 'attack-tables-critical-subtitle',
    image: 'trait-combat.png',
    to: 'critical',
  },
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
      <CardGrid
        items={OPTIONS}
        getKey={(c) => c.value}
        renderItem={(c) => (
          <EntityCard
            title={t(c.value)}
            description={t(c.subtitle)}
            image={`images/generic/${c.image}`}
            onClick={() => navigate(`/core/attack-tables/${c.to}`)}
          />
        )}
      />
    </LayoutBase>
  );
};

export default AttackTablesHome;
