import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { t } from 'i18next';
import { fetchRaces } from '../../api/race';
import { Race } from '../../api/race.dto';
import { Realm } from '../../api/realm.dto';
import RaceCard from '../../shared/cards/RaceCard';

const RealmViewRaces: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const navigate = useNavigate();
  const [races, setRaces] = useState<Race[]>([]);

  const bindRaces = async (realmId: string) => {
    fetchRaces(`realmId==${realmId}`, 0, 50)
      .then((response) => {
        setRaces(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) console.error(err.message);
        else console.error(String(err));
      });
  };

  const onAddRace = () => {
    navigate(`/core/races/create?realmId=${realm.id}`);
  };

  useEffect(() => {
    if (realm) {
      bindRaces(realm.id);
    }
  }, [realm]);

  return (
    <Grid container spacing={2} direction="column">
      <Grid size={12}>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" color="primary" display="inline">
            {t('races')}
          </Typography>
          <IconButton onClick={onAddRace} sx={{ ml: 1 }} color="primary">
            <AddCircleIcon />
          </IconButton>
        </Box>
      </Grid>
      <Grid size={12}>
        <Box mb={2} display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
          {races.map((race) => (
            <RaceCard key={race.id} race={race} />
          ))}
        </Box>
        {races.length === 0 && <p>No races found.</p>}
      </Grid>
    </Grid>
  );
};

export default RealmViewRaces;
