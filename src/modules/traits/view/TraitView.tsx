/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import {
  DeleteButton,
  DeleteDialog,
  deleteTrait,
  EditButton,
  fetchTrait,
  GenericAvatar,
  LayoutBase,
  RefreshButton,
  TechnicalInfo,
  Trait,
} from '@labcabrera-rmu/rmu-react-shared-lib';
import { useError } from '../../../ErrorContext';
import { getTraitImage } from '../../services/trait-image-service';
import TraitViewInfo from './TraitViewInfo';

export default function TraitView() {
  const auth = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { traitId } = useParams<{ traitId?: string }>();
  const { showError } = useError();
  const [trait, setTrait] = useState<Trait>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const bindTrait = () => {
    if (!traitId) return;
    fetchTrait(traitId, auth)
      .then((response) => setTrait(response))
      .catch((err: Error) => showError(err.message));
  };

  const onDelete = () => {
    deleteTrait(trait!.id, auth)
      .then(() => navigate('/core/traits'))
      .catch((err: Error) => showError(err.message));
  };

  useEffect(() => {
    if (location.state && location.state.trait) {
      setTrait(location.state.trait);
    } else if (traitId) {
      bindTrait();
    }
  }, [location.state, traitId]);

  return (
    <LayoutBase
      breadcrumbs={[
        { name: t('home'), link: '/' },
        { name: t('core'), link: '/core' },
        { name: t('traits'), link: '/core/traits' },
        { name: t('view') },
      ]}
      actions={[
        <RefreshButton onClick={() => bindTrait()} />,
        <EditButton onClick={() => navigate(`/core/traits/edit/${trait?.id}`, { state: { trait } })} />,
        <DeleteButton onClick={() => setDeleteDialogOpen(true)} />,
      ]}
      leftPanel={<GenericAvatar imageUrl={trait ? getTraitImage(trait) : ''} />}
    >
      {!trait ? (
        <CircularProgress />
      ) : (
        <>
          <TraitViewInfo trait={trait} />
          <DeleteDialog
            message={`Are you sure you want to delete ${t(trait.id)} trait? This action cannot be undone.`}
            onDelete={() => onDelete()}
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          />
          <TechnicalInfo>
            <pre>{JSON.stringify(trait, null, 2)}</pre>
          </TechnicalInfo>
        </>
      )}
    </LayoutBase>
  );
}
