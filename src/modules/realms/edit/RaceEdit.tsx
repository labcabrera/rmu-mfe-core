import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { TacticalGame, UpdateTacticalGameDto } from '../../api/tactical-games';
import RaceEditActions from './RaceEditActions';
import RaceEditAttributes from './RaceEditAttributes';

const RaceEdit: FC = () => {
  const location = useLocation();
  const tacticalGame = (location.state as { tacticalGame?: TacticalGame })?.tacticalGame;

  const [formData, setFormData] = useState<UpdateTacticalGameDto>({
    name: tacticalGame?.name || '',
    description: tacticalGame?.description || '',
  });

  if (!tacticalGame) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RaceEditActions tacticalGame={tacticalGame} formData={formData} />
      <RaceEditAttributes formData={formData} setFormData={setFormData} />
    </>
  );
};

export default RaceEdit;
