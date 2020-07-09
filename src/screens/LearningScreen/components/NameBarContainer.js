import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

import {
  getUser,
  setUser,
  getUserData,
  clearWordList,
  getWordData,
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
  const [userData, setUserData] = useState('');

  useEffect(() => {
    getData().then((value) => setName(value));
  }, []);

  useEffect(() => {
    getUserData(name)
      .then((list) => list.wordList.map((word) => word.word))
      .then((value) => setUserData(value));
  }, [name]);

  return (
    <View>
      <Text>Hi, {name}</Text>
      <NameBar
        setInputText={setInputText}
        updateData={() => updateData(inputText, setName)}
      />
      <Button title="Clear word list" onPress={handleClearButtonPress} />
      <ScrollView>
        <Text>User Data: {JSON.stringify(userData)}</Text>
      </ScrollView>
    </View>
  );
};

export default NameBarContainer;
