import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import DictionaryEntryExpansion from './DictionaryEntryExpansion';

const styles = StyleSheet.create({
  entry: {
    margin: 5,
    backgroundColor: 'white',
  },
  topEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pos: {fontStyle: 'italic'},
});

const getExpressions = wordInfo => {
  const expressions = wordInfo.targets[0].expressions;
  return expressions;
};

const DictionaryEntry = ({wordInfo}) => {
  // make this DictionaryEntryContainer
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <View style={styles.entry}>
      <View style={styles.topEntry}>
        <Text>
          {wordInfo.source.lemma}{' '}
          <Text style={styles.pos}>({wordInfo.source.pos})</Text>
        </Text>
        <Text>{wordInfo.targets[0].lemma}</Text>
      </View>
      <DictionaryEntryExpansion expressions={getExpressions(wordInfo)} />
    </View>
  );
};

DictionaryEntry.propTypes = {
  wordInfo: PropTypes.object.isRequired,
};

export default DictionaryEntry;
