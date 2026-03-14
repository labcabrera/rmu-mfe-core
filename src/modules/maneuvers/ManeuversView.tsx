import React, { FC } from 'react';
import { Box, Tabs, Tab, Grid } from '@mui/material';
import { t } from 'i18next';
import AbsoluteManeuverView from './AbsoluteManeuverView';
import EnduranceManeuverView from './EnduranceManeuverView';
import ManeuversActions from './ManeuversActions';
import PercentManeuverView from './PercentManeuverView';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const ManeuversView: FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <ManeuversActions />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={t('absolute')} {...a11yProps(0)} />
              <Tab label={t('percent')} {...a11yProps(1)} />
              <Tab label={t('endurance')} {...a11yProps(2)} />
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <AbsoluteManeuverView />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <PercentManeuverView />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            <EnduranceManeuverView />
          </CustomTabPanel>
        </Grid>
      </Grid>
    </>
  );
};

export default ManeuversView;
