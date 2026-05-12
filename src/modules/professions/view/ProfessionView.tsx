import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Chip, Stack } from '@mui/material';
import {
  CategorySeparator,
  TechnicalInfo,
  Profession,
  fetchProfession,
  LayoutBase,
  DeleteButton,
  EditButton,
  RefreshButton,
  DeleteDialog,
  deleteProfession,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import ProfessionViewProfessionalSkills from './ProfessionViewProfessionalSkills';
import ProfessionViewResume from './ProfessionViewResume';
import ProfessionViewSkillCosts from './ProfessionViewSkillCosts';

export default function ProfessionView() {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { showError } = useError();
  const { professionId } = useParams<{ professionId: string | undefined }>();
  const [profession, setProfession] = useState<Profession>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const bindProfession = (professionId: string) => {
    fetchProfession(professionId, auth)
      .then((response) => setProfession(response))
      .catch((err: Error) => showError(err.message));
  };

  const onDelete = () => {
    deleteProfession(profession!.id, auth)
      .then(() => navigate(`/core/professions`))
      .catch((err) => showError(err.message));
  };

  useEffect(() => {
    if (location.state && location.state.profession) {
      setProfession(location.state.profession);
    } else if (professionId) {
      bindProfession(professionId);
    }
  }, [location.state, professionId]);

  if (!profession) return <p>Loading profession...</p>;

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('professions'), link: '/core/professions' },
        { name: t('view') },
      ]}
      actions={[
        <RefreshButton onClick={() => bindProfession(profession.id)} />,
        <EditButton onClick={() => navigate(`/core/professions/edit/${profession.id}`, { state: { profession } })} />,
        <DeleteButton onClick={() => setDeleteDialogOpen(true)} />,
      ]}
      leftPanel={<ProfessionViewResume profession={profession} setProfession={setProfession} />}
    >
      {profession.availableRealmTypes.length > 0 && (
        <>
          <CategorySeparator text={t('availabe-realms')} />
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
      <DeleteDialog
        message={`Are you sure you want to delete ${profession.id} profession? This action cannot be undone.`}
        onDelete={onDelete}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
      <TechnicalInfo>
        <pre>{JSON.stringify(profession, null, 2)}</pre>
      </TechnicalInfo>
    </LayoutBase>
  );
}
