import React, { FC, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Realm } from '../../api/realm.dto';
import RealmViewLanguages from './RealmViewLanguages';
import RealmViewRaces from './RealmViewRaces';

type RealmViewTabsProps = {
  realm: Realm;
  initialTab?: number;
};

const RealmViewTabs: FC<RealmViewTabsProps> = ({ realm, initialTab = 0 }) => {
  const [value, setValue] = useState<number>(initialTab);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} aria-label="Realm view tabs">
        <Tab label="Races" />
        <Tab label="Languages" />
        <Tab label="Regions" />
      </Tabs>

      <Box role="tabpanel" hidden={value !== 0} sx={{ p: 2 }}>
        {value === 0 && <RealmViewRaces realm={realm} />}
      </Box>

      <Box role="tabpanel" hidden={value !== 1} sx={{ p: 2 }}>
        {value === 1 && <RealmViewLanguages realm={realm} />}
      </Box>

      <Box role="tabpanel" hidden={value !== 2} sx={{ p: 2 }}>
        {value === 1 && (
          <>
            <p>TODO</p>
          </>
        )}
      </Box>
    </Box>
  );
};

export default RealmViewTabs;
