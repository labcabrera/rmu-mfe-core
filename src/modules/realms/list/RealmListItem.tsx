import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Realm } from '../../api/realm';

const RealmListItem: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const navigate = useNavigate();

  const handleRealmClick = () => {
    navigate(`/core/realms/view/${realm.id}`, { state: { realm } });
  };

  if (!realm) {
    return <p>Loading...</p>;
  }

  const getSubtitle = () => {
    return realm.name ? `${realm.name}` : '';
  };

  return (
    <ListItemButton onClick={handleRealmClick}>
      <ListItemAvatar>
        <Avatar src="/static/images/characters/lotr-witch-king.jpg" />
      </ListItemAvatar>
      <ListItemText primary={realm.name} secondary={getSubtitle()} />
    </ListItemButton>
  );
};

export default RealmListItem;
