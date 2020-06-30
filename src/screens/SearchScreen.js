import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import SearchBar from '../utils/components/SearchBar';

const SearchScreen = ({navigation}) => {
  const [text, setText] = useState('');
  return (
    <View>
      <SearchBar setText={setText} />
      <Text>{text}</Text>
    </View>
  );
};

export default SearchScreen;
