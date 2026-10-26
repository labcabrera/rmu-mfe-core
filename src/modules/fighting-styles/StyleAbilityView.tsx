import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Box,
  Chip,
  CircularProgress,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FightingStyles, fetchFightingStyles, LayoutBase, useNotify } from '@labcabrera-rmu/rmu-react-shared-lib';
import RulesText from './RulesText';
import { equipmentLabel } from './style-conditions';

/** One ability of the fighting styles catalog (spec 032): its requirements, the styles that grant it and its text. */
const StyleAbilityView: FC = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const notify = useNotify();
  const { abilityId } = useParams<{ abilityId: string }>();
  const [catalog, setCatalog] = useState<FightingStyles>();

  useEffect(() => {
    fetchFightingStyles(auth)
      .then(setCatalog)
      .catch((err) => notify.error(err));
  }, []);

  const ability = catalog?.abilities.find((a) => a.id === abilityId);
  const grantedBy = (catalog?.styles ?? [])
    .flatMap((style) => style.abilities.filter((a) => a.abilityId === abilityId).map((a) => ({ style, cost: a.cost })))
    .sort((a, b) => t(a.style.id).localeCompare(t(b.style.id)));
  const abilityLink = (id: string) => (
    <Link key={id} component={RouterLink} to={`/core/fighting-styles/abilities/${id}`}>
      {t(`style-ability-${id}`)}
    </Link>
  );

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('fighting-styles'), link: '/core/fighting-styles' },
        { name: abilityId ? t(`style-ability-${abilityId}`) : '' },
      ]}
    >
      {!catalog ? (
        <CircularProgress size={24} />
      ) : !ability ? (
        <Typography variant="body2" color="text.secondary">
          {t('style-ability-not-found')}
        </Typography>
      ) : (
        <Stack spacing={2} sx={{ maxWidth: 900 }}>
          <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap', mb: 1.5 }}>
              <Typography variant="h5">{t(`style-ability-${ability.id}`)}</Typography>
              {ability.types.map((type) => (
                <Chip key={type} size="small" label={t(`style-ability-type-${type}`)} />
              ))}
              {ability.repeatable && (
                <Chip
                  size="small"
                  variant="outlined"
                  label={
                    ability.maxTimes
                      ? t('style-ability-repeatable-max', { times: ability.maxTimes })
                      : t('style-ability-repeatable')
                  }
                />
              )}
            </Stack>
            <Stack spacing={0.5}>
              <Field label={t('equipment')}>{equipmentLabel(ability.equipment, t)}</Field>
              {ability.requiresAbilities.length > 0 && (
                <Field label={t('style-ability-required-abilities')}>
                  {ability.requiresAbilities.map((id, index) => [index > 0 && ', ', abilityLink(id)])}
                </Field>
              )}
              {ability.requiresSkills.length + ability.requiresTraits.length > 0 && (
                <Field label={t('requirements')}>
                  {[
                    ...ability.requiresSkills.map((id) => t(id.split('@')[0])),
                    ...ability.requiresTraits.map((id) => t(id)),
                  ].join(', ')}
                </Field>
              )}
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t('style-ability-granted-by')}
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small" sx={{ '& td, & th': { px: { xs: 0.75, sm: 2 } } }}>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('fighting-style')}</TableCell>
                    <TableCell>{t('skill')}</TableCell>
                    <TableCell align="right">{t('cost')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {grantedBy.map(({ style, cost }) => (
                    <TableRow key={`${style.skillId}-${style.id}`}>
                      <TableCell>
                        <Link component={RouterLink} to={`/core/fighting-styles?skill=${style.skillId}`}>
                          {t(style.id)}
                        </Link>
                      </TableCell>
                      <TableCell>{t(style.skillId)}</TableCell>
                      <TableCell align="right">{cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {t('style-ability-rules-text')}
            </Typography>
            {ability.description ? (
              <RulesText text={ability.description} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                {t('style-ability-no-description')}
              </Typography>
            )}
          </Paper>
        </Stack>
      )}
    </LayoutBase>
  );
};

const Field: FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
  <Typography variant="body2">
    <Box component="span" sx={{ color: 'text.secondary' }}>
      {label}:{' '}
    </Box>
    {children}
  </Typography>
);

export default StyleAbilityView;
