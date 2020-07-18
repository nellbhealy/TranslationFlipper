import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import FlashCardContainer from './components/FlashCardContainer';
import { getUserWordList } from '../../utils/storage';

const LearningScreen = () => (
  <View>
    <FlashCardContainer />
  </View>
);

export default LearningScreen;
