import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  getExpressions,
  getTargetLemma,
  getSourceLemma,
} from '../../../api/getters';

const styles = StyleSheet.create({
  card: {
    margin: 5,
    backgroundColor: 'white',
  },
});

const FlashCard = ({ word, isRevealed, isExpanded, children }) => (
  <View style={styles.card}>
    <Text>{word.targets ? getTargetLemma(word) : null}</Text>
    <Text>{isRevealed && word.source ? getSourceLemma(word) : null}</Text>
    <View>
      {isExpanded
        ? getExpressions(word).map((exp) => (
            <Text>
              {exp.target} {isRevealed ? exp.source : null}
            </Text>
          ))
        : null}
    </View>
    {children}
  </View>
);

export default FlashCard;
