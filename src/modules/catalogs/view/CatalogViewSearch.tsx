import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Realm } from '../../api/realm.dto';
import ClearableTextField from '../../shared/inputs/ClearableTextField';
import SelectRealm from '../../shared/selects/SelectRealm';

type Props = {
  category: string;
  realms: Realm[];
  setQueryString: Dispatch<SetStateAction<string | undefined>>;
};

const CatalogListSearch: FC<Props> = ({ category, realms, setQueryString }) => {
  const [searchName, setSearchName] = React.useState('');
  const [searchRealm, setSearchRealm] = React.useState('');

  useEffect(() => {
    let queryString = `category==${category}`;
    if (searchName && searchName.length > 2) {
      queryString += `;key=re=${searchName}`;
    }
    if (searchRealm) {
      queryString += `;realmId==${searchRealm}`;
    }
    setQueryString!(queryString);
  }, [searchName, searchRealm]);

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

export default CatalogListSearch;
