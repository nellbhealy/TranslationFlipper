import React, { useState, useEffect, useCallback, useContext } from 'react';

// Components
import { View, Text, Button, ScrollView } from 'react-native';
import NameBar from './NameBar';

// Utils
import {
  getUser,
  setUser,
  clearWordList,
  getUserWordList,
} from '../../../utils/storage';

// Context
import UserContext from '../../../contexts/UserContext';

const updateData = (inputText, setName) => {
  setName(inputText);
  setUser(inputText);
};

const getData = async () => getUser();

const handleClearButtonPress = async () => {
  clearWordList();
};

const SettingsContainer = () => {
  const [name, setName] = useContext(UserContext);
  const [inputText, setInputText] = useState('');
  const [userData, setUserData] = useState({});

  const refreshList = useCallback(() => {
    getUserWordList(name).then(setUserData);
  }, [name]);

  useEffect(() => {
    getData().then(setName);
  }, [setName]);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  const getWords = () => {
    const levels = Object.keys(userData || {});
    if (levels.length) {
      const words = levels.reduce(
        (obj, level) => ({
          ...obj,
          [level]: Object.keys(userData[level]),
        }),
        {},
      );
      return words;
    }

    return {};
  };
  return (
    <View>
      <Text>{name ? `Logged in as: ${name}` : 'Log in to see your data!'}</Text>
      <NameBar
        setInputText={setInputText}
        updateData={() => updateData(inputText, setName)}
      />
      <Button title="Clear word list" onPress={handleClearButtonPress} />
      <ScrollView>
        <Text onPress={refreshList}>
          User Data: {JSON.stringify(getWords())}
        </Text>
      </ScrollView>
    </View>
  );
};

export default SettingsContainer;
