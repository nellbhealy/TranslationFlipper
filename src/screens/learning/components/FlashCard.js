import React from 'react';

// Components
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Card,
  CardItem,
  Body,
  Text,
  Content,
  H1,
  H2,
} from 'native-base';
import {
  getExpressions,
  getTargetLemma,
  getSourceLemma,
} from '../../../api/getters';

// Styles
const styles = StyleSheet.create({
  card: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 50,
  },
  lemma: {
    justifyContent: 'center',
  },
  expression: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
  },
});

const FlashCard = ({ word, isRevealed, isExpanded, children }) => (
  <Card style={styles.card}>
    <CardItem header style={styles.lemma}>
      <H1>{word.targets ? getTargetLemma(word) : null}</H1>
    </CardItem>
    <CardItem style={styles.lemma}>
      <H2>{isRevealed && word.source ? getSourceLemma(word) : null}</H2>
    </CardItem>
    <CardItem>
      <Content>
        {isExpanded
          ? getExpressions(word).map((exp) => (
              <View style={styles.expression}>
                <Text>{exp.target}</Text>
                <Text>{isRevealed ? exp.source : null}</Text>
              </View>
            ))
          : null}
      </Content>
    </CardItem>
    <CardItem footer>{children}</CardItem>
  </Card>
);

export default FlashCard;
