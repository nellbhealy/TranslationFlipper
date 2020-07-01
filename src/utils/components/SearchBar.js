import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import translate from '../api/api';

const SearchBar = props => {
  let searchTerm;
  const updateText = () => {
    let words = translate('en', 'fr', searchTerm)
      .then(data => {
        data = data.data;
        data = data.map(word => (word = word.targets[0].lemma + '\n'));
        props.setText(data);
      })
      .catch(error => {
        props.setText('Bad search. Did you spell the word correctly?');
      });
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
