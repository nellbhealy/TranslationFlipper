import React from 'react';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import DictionaryEntry from './DictionaryEntry.js';

const getEntries = data => {
  const entries = [];
  for (entry in data)
    entries.push(<DictionaryEntry key={entry} wordInfo={data[entry]} />);
  return entries;
};

const DictionaryEntriesContainer = ({data}) => {
  return <ScrollView>{getEntries(data)}</ScrollView>;
};

export default DictionaryEntriesContainer;

DictionaryEntriesContainer.propTypes = {
  //TODO: expand into arrayOf
  data: PropTypes.array.isRequired,
};
