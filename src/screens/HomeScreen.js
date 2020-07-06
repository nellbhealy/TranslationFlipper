import React from 'react';
import {SafeAreaView, StatusBar, Button} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
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
};

export default HomeScreen;
