import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Race } from '../../api/race.dto';
import RaceAvatarByName from '../avatars/RaceAvatar';

const RaceListItem: React.FC<{
  race: Race;
}> = ({ race }) => {
  const navigate = useNavigate();

  const handleRaceClick = () => {
    navigate(`/tactical/races/view/${race.id}`, { state: { race } });
  };

  return (
    <ListItemButton onClick={handleRaceClick}>
      <ListItemAvatar sx={{ mr: 2 }}>
        <RaceAvatarByName race={race} />
      </ListItemAvatar>
      <ListItemText primary={race.name} secondary={race.realmId} />
    </ListItemButton>
  );
};

export default RaceListItem;
