import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { ChipRow, EntityCard, Section, SectionLabel, Trait, traitPrerequisiteValues } from '@labcabrera-rmu/rmu-react-shared-lib';

const TraitViewInfo: FC<{
  trait: Trait;
}> = ({ trait }) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={2}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 4 }}>
          <EntityCard title={t(trait.category)} subtitle={t('category')} noImage />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <EntityCard title={t(trait.isTalent ? t('trait') : t('flaw'))} subtitle={t('type')} noImage />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <EntityCard
            title={String(trait.specialization ? t(trait.specialization) : t('none'))}
            subtitle={t('specialization')}
            noImage
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <EntityCard
            title={String(trait.isTierBased ? `1 - ${trait.maxTier}` : t('no'))}
            subtitle={t('tier-based')}
            noImage
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <EntityCard title={String(trait.adquisitionCost)} subtitle={t('adquisition-cost')} noImage />
        </Grid>
        {trait.tierCost && (
          <Grid size={{ xs: 12, md: 4 }}>
            <EntityCard title={String(trait.tierCost || '')} subtitle={t('tier-cost')} noImage />
          </Grid>
        )}
        {trait.talentCategory && (
          <Grid size={{ xs: 12, md: 4 }}>
            <EntityCard title={t(trait.talentCategory)} subtitle={t('talent-category')} noImage />
          </Grid>
        )}
        {trait.source && (
          <Grid size={{ xs: 12, md: 4 }}>
            <EntityCard title={t(trait.source)} subtitle={t('source')} noImage />
          </Grid>
        )}
      </Grid>

      {!!trait.prerequisites?.length && (
        <Box>
          <SectionLabel>{t('trait-prerequisites')}</SectionLabel>
          <ChipRow>
            {trait.prerequisites.map((prerequisite, index) => (
              <Chip
                key={index}
                size="small"
                title={prerequisite.description || undefined}
                label={[
                  t(`trait-prerequisite-${prerequisite.type}`),
                  ...traitPrerequisiteValues(prerequisite.value).map((value) => t(value, { defaultValue: value })),
                ].join(': ')}
              />
            ))}
          </ChipRow>
        </Box>
      )}

      {!!trait.possibleFlaws?.length && (
        <Box>
          <SectionLabel>{t('trait-possible-flaws')}</SectionLabel>
          <ChipRow>
            {trait.possibleFlaws.map((flaw) => (
              <Chip key={flaw} size="small" variant="outlined" label={t(flaw, { defaultValue: flaw })} />
            ))}
          </ChipRow>
        </Box>
      )}

      <Section title={t('description')}>
        <Typography variant="body1">{trait.description}</Typography>
      </Section>
    </Stack>
  );
};

export default TraitViewInfo;
