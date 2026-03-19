import React, { FC, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Realm } from '../../api/realm.dto';
import { imageBaseUrl } from '../../services/config';
import RealmViewEnumerations from './RealmViewEnumerations';
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Realm view tabs">
          <Tab label="Races" />
          <Tab label="Languages" />
          <Tab label="Regions" />
        </Tabs>
      </Box>

      <Box role="tabpanel" hidden={value !== 0} sx={{ p: 2 }}>
        {value === 0 && <RealmViewRaces realm={realm} />}
      </Box>

      <Box role="tabpanel" hidden={value !== 1} sx={{ p: 2 }}>
        {value === 1 && (
          <RealmViewEnumerations
            realm={realm}
            category="language"
            imageUrl={`${imageBaseUrl}images/generic/language.png`}
          />
        )}
      </Box>

      <Box role="tabpanel" hidden={value !== 2} sx={{ p: 2 }}>
        {value === 2 && (
          <RealmViewEnumerations realm={realm} category="region" imageUrl={`${imageBaseUrl}images/generic/realm.png`} />
        )}
      </Box>
    </Box>
  );
};

export default RealmViewTabs;
