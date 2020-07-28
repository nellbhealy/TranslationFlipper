import React, { useState, useEffect } from 'react';

// Components
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/home/HomeScreen';
import SearchScreen from './src/screens/search/SearchScreen';
import LearningScreen from './src/screens/learning/LearningScreen';
import SettingsScreen from './src/screens/settings/SettingsScreen';

// Context
import UserContext from './src/contexts/UserContext';

// Utils
import { getUser } from './src/utils/storage';

Icon.loadFont();

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then(setUser);
  }, [setUser]);

  return (
    <UserContext.Provider value={[user, setUser]}>
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
