import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    getData().then((value) => setName(value));
  }, []);

  useEffect(() => {
    getUserWordList(name).then((value) => setUserData(value));
  }, [name]);

  const refreshList = () => {
    getUserWordList(name).then((value) => setUserData(value));
  };

  const getWords = () => {
    const words = {};
    Object.keys(userData).map(
      (key) => (words[key] = Object.keys(userData[key])),
    );
    return words;
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
