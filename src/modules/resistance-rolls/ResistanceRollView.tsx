import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { Box, Typography } from '@mui/material';
import {
  emptyResistanceRollQuery,
  LayoutBase,
  Panel,
  resistanceRoll,
  ResistanceRollQuery,
  ResistanceRollResult,
  TechnicalInfo,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import ResistanceRollViewForm from './ResistanceRollViewForm';
import ResistanceRollViewResult from './ResistanceRollViewResult';

/** Resistance roll calculator: the result is asked again whenever the levels and the roll are complete. */
export default function ResistanceRollView() {
  const notify = useNotify();
  const auth = useAuth();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ResistanceRollQuery>(emptyResistanceRollQuery);
  const [result, setResult] = useState<ResistanceRollResult>();

  useEffect(() => {
    const { attackLevel, targetLevel, roll } = formData;
    if (![attackLevel, targetLevel, roll].every((value) => typeof value === 'number')) {
      setResult(undefined);
      return;
    }
    resistanceRoll(formData, auth)
      .then((result) => setResult(result))
      .catch((err) => notify.error(err));
  }, [formData]);

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('resistance-rolls') },
      ]}
    >
      <Typography color="text.secondary" sx={{ mb: 2, maxWidth: '80ch' }}>
        {t('resistance-roll-help')}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 5fr) minmax(0, 7fr)' },
          alignItems: 'start',
        }}
      >
        <Panel title={t('resistance-roll')} sx={{ height: 'auto' }}>
          <ResistanceRollViewForm formData={formData} setFormData={setFormData} />
        </Panel>
        <Panel title={t('result')} sx={{ height: 'auto' }}>
          <ResistanceRollViewResult result={result} />
        </Panel>
      </Box>
      <Box sx={{ mt: 2 }}>
        <TechnicalInfo>
          <pre>{JSON.stringify({ formData, result }, null, 2)}</pre>
        </TechnicalInfo>
      </Box>
    </LayoutBase>
  );
}
