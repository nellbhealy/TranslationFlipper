import React from 'react';
import { SafeAreaView, StatusBar, Button } from 'react-native';

import NameBarContainer from './components/NameBarContainer';

const HomeScreen = ({ navigation }) => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <NameBarContainer />
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title="Go to Learning Page"
        onPress={() => navigation.navigate('Learn')}
      />
    </SafeAreaView>
  </>
);

export default HomeScreen;
