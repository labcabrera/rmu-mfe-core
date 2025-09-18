import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListItem, Typography } from '@mui/material';
import { fetchRaces, Race } from '../../api/race';
import { Realm } from '../../api/realm';

const RealmRaces: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const { t } = useTranslation();
  const [races, setRaces] = useState<Race[]>([]);

  const bindRaces = async (realmId: string) => {
    fetchRaces(`"realmId=='${realmId}'"`, 0, 50)
      .then((response) => {
        setRaces(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) console.error(err.message);
        else console.error(String(err));
      });
  };

  useEffect(() => {
    if (realm) {
      bindRaces(realm.id);
    }
  }, [realm]);

  return (
    <>
      <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
        {t('races')}
      </Typography>
      <List>
        {races.map((race) => (
          <ListItem key={race.id}>{race.name}</ListItem>
        ))}
      </List>
    </>
  );
};

export default RealmRaces;
