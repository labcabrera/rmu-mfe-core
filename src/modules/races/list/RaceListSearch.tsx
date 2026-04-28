import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid } from '@mui/material';
import { ClearableTextField, Realm } from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectRealm from '../../shared/selects/SelectRealm';

type Props = {
  setQueryString: Dispatch<SetStateAction<string>>;
  realms: Realm[];
};

const RaceListSearch: FC<Props> = ({ setQueryString, realms }) => {
  const [searchName, setSearchName] = React.useState('');
  const [searchRealm, setSearchRealm] = React.useState('');

  useEffect(() => {
    let queryString = ``;
    if (searchName) {
      queryString += `name=re=${searchName}`;
    }
    if (searchRealm) {
      queryString += `${queryString ? ';' : ''}realmId==${searchRealm}`;
    }
    setQueryString(queryString);
  }, [searchName, searchRealm, setQueryString]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField
          label="Name"
          name="name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectRealm
          value={searchRealm}
          onChange={(value: string) => setSearchRealm(value)}
          realms={realms}
          allowEmpty={true}
        />
      </Grid>
    </Grid>
  );
};

export default RaceListSearch;
