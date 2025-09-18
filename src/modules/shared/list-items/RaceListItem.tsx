import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Race } from '../../api/race.dto';
import RaceAvatarByName from '../avatars/RaceAvatarByName';

const RaceListItem: React.FC<{
  race: Race;
}> = ({ race }) => {
  const navigate = useNavigate();

  const handleRaceClick = () => {
    navigate(`/core/races/view/${race.id}`, { state: { race } });
  };

  return (
    <ListItemButton onClick={handleRaceClick}>
      <ListItemAvatar sx={{ mr: 2 }}>
        <RaceAvatarByName raceName={race.name} />
      </ListItemAvatar>
      <ListItemText primary={race.name} secondary={race.realmName} />
    </ListItemButton>
  );
};

export default RaceListItem;
