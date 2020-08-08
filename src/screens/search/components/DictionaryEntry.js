import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import { StyleSheet } from 'react-native';
import { Button, Card, CardItem, Body, Text } from 'native-base';
import DictionaryEntryExpansion from './DictionaryEntryExpansion';

// Utils
import { addWordToUserList } from '../../../utils/storage';

// Vars
const BUTTON_TEXT = 'Add Word';

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginRight: 10,
  },
  topEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pos: { fontStyle: 'italic' },
});

const DictionaryEntry = ({ wordInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded((expanded) => !expanded);
  };

  const handleButtonPress = () => {
    addWordToUserList(wordInfo);
    setIsExpanded(false);
  };

  return (
    <Card style={styles.card}>
      <CardItem header style={styles.topEntry}>
        <Text>
          {wordInfo.source.lemma}{' '}
          <Text style={styles.pos}>({wordInfo.source.pos})</Text>
        </Text>
        <Text>{wordInfo.targets[0].lemma}</Text>
      </CardItem>
      {isExpanded ? (
        <CardItem>
          <Body>
            <DictionaryEntryExpansion
              expressions={wordInfo.targets[0].expressions}
              handleButtonPress={handleButtonPress}
            />
          </Body>
        </CardItem>
      ) : null}
      <CardItem footer>
        {isExpanded ? (
          <Button
            small
            transparent
            bordered
            success
            title={BUTTON_TEXT}
            onPress={handleButtonPress}>
            <Text>{BUTTON_TEXT}</Text>
          </Button>
        ) : null}
        <Button
          small
          transparent
          bordered
          light
          title={BUTTON_TEXT}
          onPress={handlePress}>
          <Text>{isExpanded ? 'See less' : 'See more'}</Text>
        </Button>
      </CardItem>
    </Card>
  );
};

DictionaryEntry.propTypes = {
  wordInfo: PropTypes.object.isRequired,
};

export default DictionaryEntry;
