import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Race, UpdateRaceDto } from '../../api/race.dto';
import RaceEditActions from './RaceEditActions';
import RaceEditAttributes from './RaceEditAttributes';

const RaceEdit: FC = () => {
  const location = useLocation();
  const race = (location.state as { race?: Race })?.race;
  const [formData, setFormData] = useState<UpdateRaceDto>(null);

  useEffect(() => {
    if (race) {
      setFormData(race);
    }
  }, [race]);

  if (!race) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RaceEditActions race={race} formData={formData} />
      <RaceEditAttributes formData={formData} setFormData={setFormData} />
    </>
  );
};

export default RaceEdit;
