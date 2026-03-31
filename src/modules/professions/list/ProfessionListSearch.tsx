import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { ClearableTextField } from '@labcabrera-rmu/rmu-react-shared-lib';
import { t } from 'i18next';
import { ProfessionArchetype } from '../../api/profession.dto';
import SelectProfessionArchetype from '../../shared/selects/SelectProfessionArchetype';

type Props = {
  setQueryString: Dispatch<SetStateAction<string>>;
};

const ProfessionListSearch: FC<Props> = ({ setQueryString }) => {
  const [searchName, setSearchName] = useState<string>('');
  const [searchArchetype, setSearchArchetype] = useState<ProfessionArchetype | null>(null);

  useEffect(() => {
    let queryString = ``;
    if (searchName) {
      queryString += `id=re=${searchName}`;
    }
    if (searchArchetype) {
      if (queryString) queryString += `;`;
      queryString += `archetype==${searchArchetype}`;
    }
    setQueryString(queryString);
  }, [searchName, searchArchetype]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField
          label={t('Name')}
          name="name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectProfessionArchetype
          label={t('Archetype')}
          name="archetype"
          value={searchArchetype}
          required={false}
          allowAll
          onChange={(archetype) => setSearchArchetype(archetype)}
        />
      </Grid>
    </Grid>
  );
};

export default ProfessionListSearch;
