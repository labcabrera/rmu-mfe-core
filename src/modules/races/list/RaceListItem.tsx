import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { t } from 'i18next';
import { Race } from '../../api/race.dto';

const RaceListItem: FC<{
  race: Race;
}> = ({ race }) => {
  const navigate = useNavigate();

  const handleRealmClick = () => {
    navigate(`/core/races/view/${race.id}`, { state: { race } });
  };

  if (!race) return <p>Loading...</p>;

  const getSubtitle = () => {
    return `${race.realmName} - ${t(race.archetype)}`;
  };

  return (
    <ListItemButton onClick={handleRealmClick}>
      <ListItemAvatar>
        <Avatar src="/static/images/characters/lotr-witch-king.jpg" />
      </ListItemAvatar>
      <ListItemText primary={race.name} secondary={getSubtitle()} />
    </ListItemButton>
  );
};

export default RaceListItem;
