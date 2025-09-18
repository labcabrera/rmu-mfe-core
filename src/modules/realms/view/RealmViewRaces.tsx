import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, List, Typography } from '@mui/material';
import { fetchRaces } from '../../api/race';
import { Race } from '../../api/race.dto';
import { Realm } from '../../api/realm';
import RaceListItem from '../../shared/list-items/RaceListItem';

const RealmViewRaces: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const { t } = useTranslation();
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
    <>
      <Typography variant="h6" color="primary">
        {t('races')}
      </Typography>
      <List>
        {races.map((race) => (
          <RaceListItem key={race.id} race={race} />
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={onAddRace}>
        {t('add-race')}
      </Button>
    </>
  );
};

export default RealmViewRaces;
