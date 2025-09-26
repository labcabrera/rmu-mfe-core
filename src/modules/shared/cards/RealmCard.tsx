import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { Realm } from '../../api/realm.dto';
import CardListItem from './CardListItem';

const RealmCard: FC<{
  realm: Realm;
}> = ({ realm }) => {
  const navigate = useNavigate();

  const handleRealmClick = () => {
    navigate(`/core/realms/view/${realm.id}`, { state: { realm } });
  };

  if (!realm) return <p>Loading...</p>;

  return <CardListItem title={realm.name} subtitle={t(realm.shortDescription)} image="/static/images/generic/realm.png" onClick={handleRealmClick} />;
};

export default RealmCard;
