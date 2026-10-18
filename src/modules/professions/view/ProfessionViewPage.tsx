import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Chip, Stack } from '@mui/material';
import {
  CategorySeparator,
  deleteProfession,
  DetailPage,
  fetchProfession,
  Profession,
  useEntity,
  useNotify,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import ProfessionViewProfessionalSkills from './ProfessionViewProfessionalSkills';
import ProfessionViewResume from './ProfessionViewResume';
import ProfessionViewSkillCosts from './ProfessionViewSkillCosts';

export default function ProfessionViewPage() {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const { professionId } = useParams<{ professionId?: string }>();
  const state = useEntity<Profession>(professionId, (id) => fetchProfession(id, auth), {
    initial: location.state?.profession,
    onError: notify.error,
  });

  const onDelete = (profession: Profession) =>
    deleteProfession(profession.id, auth)
      .then(() => navigate('/core/professions'))
      .catch(notify.error);

  return (
    <DetailPage
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('professions'), link: '/core/professions' },
        { name: t('view') },
      ]}
      entity={state}
      summaryTitle={(entity) => t(entity.id)}
      onEdit={(profession) => navigate(`/core/professions/edit/${profession.id}`, { state: { profession } })}
      onDelete={onDelete}
      leftPanel={(profession) => <ProfessionViewResume profession={profession} setProfession={state.setEntity} />}
    >
      {(profession) => (
        <>
          {profession.availableRealmTypes.length > 0 && (
            <>
              <CategorySeparator text={t('available-realms')} />
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {profession.availableRealmTypes.map((rt, index) => (
                  <Chip key={index} label={t(rt)} />
                ))}
              </Stack>
            </>
          )}
          {profession.fixedRealmTypes.length > 0 && (
            <>
              <CategorySeparator text={t('fixed-realms')} />
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {profession.fixedRealmTypes.map((rt, index) => (
                  <Chip key={index} label={t(rt)} color="primary" />
                ))}
              </Stack>
            </>
          )}
          <CategorySeparator text={t('skill-costs')} />
          <ProfessionViewSkillCosts profession={profession} />
          <CategorySeparator text={t('professional-skills')} />
          <ProfessionViewProfessionalSkills profession={profession} />
        </>
      )}
    </DetailPage>
  );
}
