import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { useError } from '../../../ErrorContext';
import { fetchTraits } from '../../api/trait';
import { Trait } from '../../api/trait.dto';
import TraitListActions from './TraitListActions';
import TraitListItem from './TraitListItem';
import TraitListSearch from './TraitListSearch';

const TraitList: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showError } = useError();
  const [traits, setTraits] = useState<Trait[]>([]);

  const bindTraits = (id: string, category: string) => {
    let query = '';
    if (id) query += `id=re=${id}`;
    if (category && category !== '') {
      if (query !== '') query += ';';
      query += `category==${category}`;
    }
    fetchTraits(query, 0, 20)
      .then((response) => {
        setTraits(response);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) showError(err.message);
        else showError('An unknown error occurred');
      });
  };

  const handleNewTrait = () => {
    navigate('/core/traits/create');
  };

  useEffect(() => {
    bindTraits(undefined, undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TraitListSearch onSearch={(id, category) => bindTraits(id, category)} />
      <TraitListActions />
      {traits.map((trait) => (
        <TraitListItem key={trait.id} trait={trait} />
      ))}
      {traits.length === 0 ? (
        <p>
          No traits found.{' '}
          <Link component="button" onClick={handleNewTrait}>
            {t('create-new')}
          </Link>
        </p>
      ) : null}
    </>
  );
};

export default TraitList;
