import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native-gesture-handler';

import DictionaryEntryExpansion from './DictionaryEntryExpansion';
import { addWordToUserList } from '../../../utils/storage';

const BUTTON_TEXT = 'Add Word';

const styles = StyleSheet.create({
  entry: {
    margin: 5,
    backgroundColor: 'white',
  },
  topEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pos: { fontStyle: 'italic' },
});

const handleButtonPress = (word) => {
  addWordToUserList(word);
};

// make this DictionaryEntryContainer
const DictionaryEntry = ({ wordInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded((expanded) => !expanded);
  };

  return (
    <View style={styles.entry}>
      <TouchableHighlight onPress={handlePress}>
        <View>
          <View style={styles.topEntry}>
            <Text>
              {wordInfo.source.lemma}{' '}
              <Text style={styles.pos}>({wordInfo.source.pos})</Text>
            </Text>
            <Text>{wordInfo.targets[0].lemma}</Text>
          </View>
          {isExpanded ? (
            <DictionaryEntryExpansion
              expressions={wordInfo.targets[0].expressions}
              handleButtonPress={() => {
                handleButtonPress(wordInfo);
              }}
            />
          ) : null}
        </View>
      </TouchableHighlight>
      {isExpanded ? (
        <Button
          title={BUTTON_TEXT}
          onPress={() => handleButtonPress(wordInfo)}
        />
      ) : null}
    </View>
  );
};

DictionaryEntry.propTypes = {
  wordInfo: PropTypes.object.isRequired,
};

export default DictionaryEntry;
