import React from 'react';
import {View, TextInput, Button} from 'react-native';
import PropTypes from 'prop-types';

const PLACEHOLDER_TEXT = 'What word do you want to look up?';

const SearchBar = props => {
  return (
    <View>
      <TextInput
        placeholder={PLACEHOLDER_TEXT}
        onChangeText={inputText => props.setSearchTerm(inputText)}
        onEndEditing={props.updateData}
      />
      <Button onPress={props.updateData} title="search" />
    </View>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
};
