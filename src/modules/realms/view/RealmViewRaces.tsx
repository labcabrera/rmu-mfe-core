import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { useError } from '../../../ErrorContext';
import { fetchRaces } from '../../api/race';
import { Race } from '../../api/race.dto';
import { Realm } from '../../api/realm.dto';
import AddButton from '../../shared/buttons/AddButton';
import RaceCard from '../../shared/cards/RaceCard';

const RealmViewRaces: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const navigate = useNavigate();
  const { showError } = useError();
  const [races, setRaces] = useState<Race[]>([]);

  const onAddRace = () => {
    navigate(`/core/races/create?realmId=${realm.id}`);
  };

  useEffect(() => {
    if (realm) {
      fetchRaces(`realmId==${realm.id}`, 0, 50)
        .then((response) => setRaces(response))
        .catch((err) => showError(err.message));
    }
  }, [realm]);

  return (
    <Grid container spacing={1} direction="column">
      <Grid size={12}>
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <Typography variant="h6" color="primary" display="inline">
            {t('races')}
          </Typography>
          <AddButton onClick={onAddRace} />
        </Box>
      </Grid>
      <Grid size={12}>
        <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
          {races.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </Box>
        {races.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            No races added
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default RealmViewRaces;
