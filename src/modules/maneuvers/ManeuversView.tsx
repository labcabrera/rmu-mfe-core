import React, { FC } from 'react';
import AbsoluteManeuverView from './AbsoluteManeuverView';
import EnduranceManeuverView from './EnduranceManeuverView';
import ManeuversActions from './ManeuversActions';
import PercentManeuverView from './PercentManeuverView';

const ManeuversView: FC = () => {
  return (
    <>
      <ManeuversActions />
      <PercentManeuverView />
      <AbsoluteManeuverView />
      <EnduranceManeuverView />
    </>
  );
};

export default ManeuversView;
