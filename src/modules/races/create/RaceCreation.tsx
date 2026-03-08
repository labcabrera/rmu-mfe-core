import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { CreateRaceDto, raceCreateTemplate } from '../../api/race.dto';
import { fetchRealm } from '../../api/realm';
import { Realm } from '../../api/realm.dto';
import EdditableAvatar from '../../shared/avatars/EditableAvatar';
import CharacterSeparator from '../../shared/display/CategorySeparator';
import TechnicalInfo from '../../shared/display/TechnicalInfo';
import RaceCreationActions from './RaceCreationActions';
import RaceCreationAttributes from './RaceCreationAttributes';
import RaceCreationLore from './RaceCreationLore';
import RaceCreationResistances from './RaceCreationResistances';
import RaceCreationStats from './RaceCreationStats';

const RaceCreation: FC = () => {
  const [searchParams] = useSearchParams();
  const realmId = searchParams.get('realmId');
  const { showError } = useError();
  const [realm, setRealm] = useState<Realm | null>(null);
  const [formData, setFormData] = useState<CreateRaceDto>(raceCreateTemplate);
  const [isValid, setIsValid] = useState(false);

  const validateForm = (formData: CreateRaceDto) => {
    if (!formData.name) return false;
    if (!formData.realmId) return false;
    return true;
  };

  useEffect(() => {
    setIsValid(validateForm(formData));
  }, [formData]);

  useEffect(() => {
    if (realm) {
      setFormData({ ...formData, realmId: realm.id });
    }
  }, [realm]);

  useEffect(() => {
    if (realmId) {
      fetchRealm(realmId)
        .then((response) => setRealm(response))
        .catch((err) => showError(err.message));
    }
  }, [realmId, showError]);

  if (!realm || !formData) return <div>Loading...</div>;

  return (
    <>
      <RaceCreationActions formData={formData} isValid={isValid} realm={realm} />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}>
          <EdditableAvatar
            imageUrl={formData.imageUrl || ''}
            onImageChange={(avatar) => setFormData({ ...formData, imageUrl: avatar })}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <RaceCreationAttributes formData={formData} setFormData={setFormData} />
          <CharacterSeparator text={t('statistics')} />
          <RaceCreationStats formData={formData} setFormData={setFormData} />
          <CharacterSeparator text={t('resistances')} />
          <RaceCreationResistances formData={formData} setFormData={setFormData} />
          <CharacterSeparator text={t('lore')} />
          <RaceCreationLore formData={formData} setFormData={setFormData} />
          <TechnicalInfo>
            <pre>FormData: {JSON.stringify(formData, null, 2)}</pre>
          </TechnicalInfo>
        </Grid>
      </Grid>
    </>
  );
};

export default RaceCreation;
