import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Trait } from '../../api/trait.dto';

const TraitListItem: FC<{
  trait: Trait;
}> = ({ trait }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleTraitClick = () => {
    navigate(`/core/traits/view/${trait.id}`, { state: { trait } });
  };

  if (!trait) {
    return <p>Loading...</p>;
  }

  const getSubtitle = () => {
    return `${t(trait.category)} - ${trait.isTalent ? t('talent') : t('flaw')}`;
  };

  return (
    <ListItemButton onClick={handleTraitClick}>
      <ListItemAvatar>
        <Avatar src="/static/images/characters/lotr-witch-king.jpg" />
      </ListItemAvatar>
      <ListItemText primary={t(trait.id)} secondary={getSubtitle()} />
    </ListItemButton>
  );
};

export default TraitListItem;
