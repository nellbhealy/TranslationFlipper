import React from 'react';

import { StatusBar } from 'react-native';

const ScreenWrapper = ({ children }) => (
  <>
    <StatusBar barStyle="dark-content" />
    {children}
  </>
);

export default ScreenWrapper;
