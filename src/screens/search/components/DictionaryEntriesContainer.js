import React from 'react';
import { Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import DictionaryEntry from './DictionaryEntry';
import { SEARCHING_MESSAGE } from '../../../utils/constants';

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

  return (
    <ScrollView>
      {isSearching ? <Text>{SEARCHING_MESSAGE}</Text> : getEntries()}
    </ScrollView>
  );
};

DictionaryEntriesContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyMessage: PropTypes.string.isRequired,
};

export default DictionaryEntriesContainer;
