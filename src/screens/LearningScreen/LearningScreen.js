import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import FlashCardContainer from './components/FlashCardContainer';
import { getUserWordList } from '../../utils/storage';

const LearningScreen = () => {
  const [list, setList] = useState('Loading...');

  useEffect(() => {
    getUserWordList().then((userList) => setList(userList));
  }, []);

  return (
    <View>
      <FlashCardContainer />
    </View>
  );
};

export default LearningScreen;
