import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchRace } from '../../api/race';
import { Race, UpdateRaceDto } from '../../api/race.dto';
import RaceEditActions from './RaceEditActions';
import RaceEditForm from './RaceEditForm';

const RaceEdit: FC = () => {
  const location = useLocation();
  const { raceId } = useParams<{ raceId: string }>();
  const [race, setRace] = useState<Race | null>((location.state as { race?: Race })?.race ?? null);
  const [formData, setFormData] = useState<UpdateRaceDto | null>(null);

  useEffect(() => {
    if (!race && raceId) {
      fetchRace(raceId).then(setRace);
    }
  }, [race, raceId]);

  useEffect(() => {
    if (race) {
      setFormData(race);
    }
  }, [race]);

  if (!race) return <div>Loading...</div>;

  return (
    <>
      <RaceEditActions race={race} formData={formData} />
      <RaceEditForm formData={formData} setFormData={setFormData} />
      <pre>Form: {JSON.stringify(formData, null, 2)}</pre>
    </>
  );
};

export default RaceEdit;
