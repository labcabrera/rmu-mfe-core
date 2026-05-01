/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Grid } from '@mui/material';
import { ClearableTextField, Realm } from '@labcabrera-rmu/rmu-react-shared-lib';
import SelectRealm from '../../shared/selects/SelectRealm';
import { useTranslation } from 'react-i18next';

type Props = {
  setQueryString: Dispatch<SetStateAction<string>>;
  realms: Realm[];
};

const CultureListSearch: FC<Props> = ({ setQueryString, realms }) => {
  const { t } = useTranslation();
  const [searchName, setSearchName] = React.useState('');
  const [searchRealm, setSearchRealm] = React.useState('');

  useEffect(() => {
    let queryString = ``;
    if (searchName) {
      queryString += `name=re=${searchName}`;
    }
    if (searchRealm) {
      queryString += `${queryString ? ';' : ''}realm.id==${searchRealm}`;
    }
    setQueryString(queryString);
  }, [searchName, searchRealm]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <ClearableTextField
          label={t('name')}
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

export default CultureListSearch;
