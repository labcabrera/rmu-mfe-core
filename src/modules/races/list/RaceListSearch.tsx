import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';
import { Realm } from '../../api/realm.dto';
import SelectRealm from '../../shared/selects/SelectRealm';

type Props = {
  setQueryString: Dispatch<SetStateAction<string>>;
  realms: Realm[];
};

const RaceListSearch: FC<Props> = ({ setQueryString, realms }) => {
  const [searchName, setSearchName] = React.useState('');
  const [searchRealm, setSearchRealm] = React.useState('');

  const handleClearName = () => {
    setSearchName('');
  };

  useEffect(() => {
    let queryString = ``;
    if (searchName) {
      queryString += `name=re=${searchName}`;
    }
    if (searchRealm) {
      queryString += `${queryString ? ';' : ''}realmId==${searchRealm}`;
    }
    setQueryString(queryString);
  }, [searchName, searchRealm]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          label="Name"
          name="name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          fullWidth
          slotProps={{
            input: searchName
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" aria-label="clear name" onClick={handleClearName} edge="end">
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : undefined,
          }}
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
