import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';

const SearchBar = props => {
  let searchTerm;
  const updateText = () => {
    props.setText(searchTerm);
  };

  return (
    <View>
      <TextInput
        placeholder="What word do you want to look up?"
        onChangeText={inputText => (searchTerm = inputText)}
        onEndEditing={updateText}
      />
      <Button onPress={updateText} title="search" />
    </View>
  );
};

export default SearchBar;
