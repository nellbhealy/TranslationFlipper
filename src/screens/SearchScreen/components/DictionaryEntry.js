import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import DictionaryEntryExpansion from './DictionaryEntryExpansion';
import {TouchableHighlight} from 'react-native-gesture-handler';

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

// make this DictionaryEntryContainer
const DictionaryEntry = ({wordInfo}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(expanded => !expanded);
  };

  return (
    <TouchableHighlight onPress={handlePress}>
      <View style={styles.entry}>
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
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

DictionaryEntry.propTypes = {
  wordInfo: PropTypes.object.isRequired,
};

export default DictionaryEntry;
