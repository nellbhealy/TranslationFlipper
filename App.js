import React, { useState } from 'react';

// Components
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/home/HomeScreen';
import SearchScreen from './src/screens/search/SearchScreen';
import LearningScreen from './src/screens/learning/LearningScreen';
import SettingsScreen from './src/screens/settings/SettingsScreen';

// Context
import UserContext from './src/UserContext';

Icon.loadFont();

const Stack = createStackNavigator();

const App = () => {
  const userState = useState(null);
  return (
    <UserContext.Provider value={userState}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Learn" component={LearningScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
