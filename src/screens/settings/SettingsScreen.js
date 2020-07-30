import React from 'react';

// Components
import { Container } from 'native-base';
import SettingsContainer from './components/SettingsContainer';
import ScreenWrapper from '../../components/ScreenWrapper';

const SettingsScreen = () => (
  <ScreenWrapper>
    <Container>
      <SettingsContainer />
    </Container>
  </ScreenWrapper>
);

export default SettingsScreen;
