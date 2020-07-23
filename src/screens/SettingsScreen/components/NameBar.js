import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const PLACEHOLDER_TEXT = 'What is your name?';
const MARGIN = 16;

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
    margin: MARGIN,
    backgroundColor: 'white',
  },
});

const NameBar = (props) => (
  <View style={styles.fixToText}>
    <TextInput
      placeholder={PLACEHOLDER_TEXT}
      onChangeText={(inputText) => props.setInputText(inputText)}
      onEndEditing={props.updateData}
      style={styles.input}
    />
    <View style={styles.button}>
      <Button onPress={props.updateData} title="search" />
    </View>
  </View>
);

export default NameBar;

NameBar.propTypes = {
  setInputText: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
};
