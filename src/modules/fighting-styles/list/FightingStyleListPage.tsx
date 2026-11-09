import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  EntityCard,
  FightingStyleSkill,
  ListPage,
  useListFilters,
  useLocalPagedQuery,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { equipmentLabel } from '../style-conditions';
import { useFightingStyles } from '../useFightingStyles';
import FightingStyleListFilters, { fightingStyleFilters } from './FightingStyleListFilters';

/** There is no image per style: each type of style has one. */
const SKILL_IMAGES: Record<FightingStyleSkill, string> = {
  'battle-styles': 'images/generic/warrior.png',
  'combat-styles': 'images/generic/trait-combat.png',
  'discipline-styles': 'images/generic/trait-discipline.png',
};

/** Workspace spec 092: the fighting styles as cards, like the race list; a card opens everything about the style. */
export default function FightingStyleListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const catalog = useFightingStyles();
  const filters = useListFilters(fightingStyleFilters(t));
  const notify = useNotify();

  useEffect(() => {
    if (catalog.error) notify.error(catalog.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog.error]);

  const visible = useMemo(
    () => catalog.data?.styles.filter(filters.match).sort((a, b) => t(a.id).localeCompare(t(b.id))),
    [catalog.data, filters.match, t]
  );
  const query = useLocalPagedQuery(visible, {
    pageSize: 48,
    resetKey: filters.key,
    error: catalog.error,
    refresh: () => void catalog.refetch(),
  });

  return (
    <ListPage
      breadcrumbs={[{ name: t('home'), link: '/' }, { name: t('core'), link: '/core' }, { name: t('fighting-styles') }]}
      query={query}
      getKey={(style) => style.id}
      filtersLayout="side"
      filterState={filters}
      filtersStorageKey="core.fighting-styles"
      filters={<FightingStyleListFilters filters={filters} />}
      collection={{ modes: ['cards'], storageKey: 'core.fighting-styles' }}
      renderItem={(style) => (
        <EntityCard
          title={t(style.id)}
          subtitle={t(style.skillId)}
          image={SKILL_IMAGES[style.skillId]}
          metrics={[{ label: t('style-abilities'), value: style.abilities.length }]}
          description={equipmentLabel(style.equipment, t)}
          onClick={() => navigate(`/core/fighting-styles/view/${style.id}`, { state: { from: location.search } })}
        />
      )}
    />
  );
}
