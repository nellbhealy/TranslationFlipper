import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Text } from 'native-base';
import DictionaryEntry from './DictionaryEntry';

// Vars
const SEARCHING_MESSAGE = 'Searching...';

const DictionaryEntriesContainer = ({ data, emptyMessage, isSearching }) => {
  const getEntries = () => {
    if (emptyMessage.length !== 0) {
      return <Text>{emptyMessage}</Text>;
    }

    const makeEntries = (entry) => (
      <DictionaryEntry key={entry} wordInfo={data[entry]} />
    );

    return Object.keys(data).map(makeEntries);
  };

  return <>{isSearching ? <Text>{SEARCHING_MESSAGE}</Text> : getEntries()}</>;
};

DictionaryEntriesContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyMessage: PropTypes.string.isRequired,
};

export default DictionaryEntriesContainer;
