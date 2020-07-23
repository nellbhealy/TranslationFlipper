import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

import {
  getUser,
  setUser,
  clearWordList,
  getUserWordList,
} from '../../../utils/storage';

import NameBar from './NameBar';

const updateData = (inputText, setName) => {
  setName(inputText);
  setUser(inputText);
};

const getData = async () => getUser();

const handleClearButtonPress = async () => {
  clearWordList();
};

const NameBarContainer = () => {
  const [name, setName] = useState('');
  const [inputText, setInputText] = useState('');
  const [userData, setUserData] = useState({});

  const refreshList = useCallback(() => {
    getUserWordList(name).then(setUserData);
  }, [name]);

  useEffect(() => {
    getData().then(setName);
  }, []);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  const getWords = () => {
    const levels = Object.keys(
      userData || { one: [], two: [], three: [], four: [], five: [] },
    );
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
      <Text>Hi, {name}</Text>
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

export default NameBarContainer;
