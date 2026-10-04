/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import {
  DeleteButton,
  DeleteDialog,
  deleteEffectType,
  EditButton,
  EffectType,
  fetchEffectType,
  LayoutBase,
  RefreshButton,
  TechnicalInfo,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import EffectTypeViewInfo from './EffectTypeViewInfo';

const EffectTypeView: FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { effectTypeId } = useParams<{ effectTypeId?: string }>();
  const { showError } = useError();
  const [effectType, setEffectType] = useState<EffectType>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const bindEffectType = () => {
    if (!effectTypeId) return;
    fetchEffectType(effectTypeId, auth)
      .then((response) => setEffectType(response))
      .catch((err: Error) => showError(err.message));
  };

  const onDelete = () => {
    if (!effectType) return;
    deleteEffectType(effectType.id, auth)
      .then(() => navigate('/core/effect-types'))
      .catch((err: Error) => showError(err.message));
  };

  useEffect(() => {
    if (location.state && location.state.effectType) {
      setEffectType(location.state.effectType);
    } else if (effectTypeId) {
      bindEffectType();
    }
  }, [location.state, effectTypeId]);

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('effect-types'), link: '/core/effect-types' },
        { name: t('view') },
      ]}
      actions={[
        <RefreshButton onClick={() => bindEffectType()} />,
        <EditButton onClick={() => navigate(`/core/effect-types/edit/${effectType?.id}`, { state: { effectType } })} />,
        <DeleteButton onClick={() => setDeleteDialogOpen(true)} />,
      ]}
    >
      {!effectType ? (
        <CircularProgress />
      ) : (
        <>
          <EffectTypeViewInfo effectType={effectType} />
          <DeleteDialog
            message={`Are you sure you want to delete ${t(effectType.id)} effect type? This action cannot be undone.`}
            onDelete={() => onDelete()}
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          />
          <TechnicalInfo>
            <pre>{JSON.stringify(effectType, null, 2)}</pre>
          </TechnicalInfo>
        </>
      )}
    </LayoutBase>
  );
};

export default EffectTypeView;
