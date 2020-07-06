import React from 'react';
import {Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import DictionaryEntry from './DictionaryEntry.js';

const getEntries = (data, emptyMessage) => {
  if (emptyMessage.length != 0) return <Text>{emptyMessage}</Text>;
  const entries = [];
  for (entry in data)
    entries.push(<DictionaryEntry key={entry} wordInfo={data[entry]} />);
  return entries;
};

const DictionaryEntriesContainer = ({data, emptyMessage}) => {
  return <ScrollView>{getEntries(data, emptyMessage)}</ScrollView>;
};

export default DictionaryEntriesContainer;

DictionaryEntriesContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyMessage: PropTypes.string.isRequired,
};
