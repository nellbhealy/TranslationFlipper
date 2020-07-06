import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expression: {
    flex: 1,
    flexWrap: 'wrap',
  },
});

const Expression = ({expressions}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.expression}>{expressions.source}</Text>
      <Text style={styles.expression}>{expressions.target}</Text>
    </View>
  );
};

export default Expression;
