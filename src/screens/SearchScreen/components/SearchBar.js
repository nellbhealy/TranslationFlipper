import React from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const PLACEHOLDER_TEXT = 'What word do you want to look up?';
const MARGIN_HORIZ = 16;

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    flex: 3,
  },
  button: {
    flex: 1,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: MARGIN_HORIZ,
    backgroundColor: 'white',
  },
});

const SearchBar = props => {
  return (
    <View style={styles.fixToText}>
      <TextInput
        placeholder={PLACEHOLDER_TEXT}
        onChangeText={inputText => props.setSearchTerm(inputText)}
        onEndEditing={props.updateData}
        style={styles.input}
      />
      <View style={styles.button}>
        <Button onPress={props.updateData} title="search" />
      </View>
    </View>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
};
