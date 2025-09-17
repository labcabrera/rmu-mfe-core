import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { Race, fetchRaces } from '../../api/race';
import RaceListActions from './RaceListActions';
import RaceListItem from './RaceListItem';

const RaceList: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [races, setRaces] = useState<Race[]>([]);

  const bindRaces = () => {
    fetchRaces('', 0, 20)
      .then((response) => {
        setRaces(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const handleNewGame = () => {
    navigate('/tactical/games/create');
  };

  useEffect(() => {
    bindRaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RaceListActions />
      {races.map((race) => (
        <RaceListItem key={race.id} race={race} />
      ))}
      {races.length === 0 ? (
        <p>
          No races found.{' '}
          <Link component="button" onClick={handleNewGame}>
            {t('create-new')}
          </Link>
        </p>
      ) : null}
    </>
  );
};

export default RaceList;
