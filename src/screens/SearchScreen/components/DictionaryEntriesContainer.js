import React from 'react';
import {ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import DictionaryEntry from './DictionaryEntry.js';

const getUpdatedInfo = (entryNum, data) => {
  try {
    console.log(data[entryNum]);
    return data[entryNum];
  } catch (error) {
    return error.toString();
  }
};

const getEntries = data => {
  const entries = [];
  for (entry in data)
    entries.push(
      <DictionaryEntry
        key={entry}
        //entryNum={entry}
        //getUpdatedInfo={entryNum => getUpdatedInfo(entryNum, data)}
        wordInfo={data[entry]}
      />,
    );
  return entries;
};

const DictionaryEntriesContainer = ({data}) => {
  return <ScrollView>{getEntries(data)}</ScrollView>;
};

export default DictionaryEntriesContainer;

DictionaryEntriesContainer.propTypes = {
  data: PropTypes.array.isRequired,
};
