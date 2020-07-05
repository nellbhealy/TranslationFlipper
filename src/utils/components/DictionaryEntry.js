import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

const DictionaryEntry = props => {
  return (
    <View>
      <Text>{props.updateInfo(props.entryNum)}</Text>
    </View>
  );
};

DictionaryEntry.propTypes = {
  data: PropTypes.isRequired,
};

export default DictionaryEntry;
