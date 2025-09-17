import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Race } from '../../api/race';

const RaceListItem: FC<{
  race: Race;
}> = ({ race }) => {
  const navigate = useNavigate();

  const handleRaceClick = () => {
    navigate(`/core/races/view/${race.id}`, { state: { race } });
  };

  if (!race) {
    return <p>Loading...</p>;
  }

  const getSubtitle = () => {
    return race.realm ? `${race.realm}` : '';
  };

  return (
    <ListItemButton onClick={handleRaceClick}>
      <ListItemAvatar>
        <Avatar src="/static/images/characters/lotr-witch-king.jpg" />
      </ListItemAvatar>
      <ListItemText primary={race.name} secondary={getSubtitle()} />
    </ListItemButton>
  );
};

export default RaceListItem;
