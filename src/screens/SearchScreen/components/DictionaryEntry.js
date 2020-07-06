import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

const DictionaryEntry = ({getUpdatedInfo, entryNum}) => {
  return (
    <View>
      <Text>{getUpdatedInfo(entryNum)}</Text>
    </View>
  );
};

DictionaryEntry.propTypes = {
  entryNum: PropTypes.string.isRequired,
  getUpdatedInfo: PropTypes.func.isRequired,
};

export default DictionaryEntry;
