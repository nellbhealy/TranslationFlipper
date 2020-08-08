import React from 'react';
import PropTypes from 'prop-types';

// Components
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';

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

const Expression = ({ expressions }) => (
  <View style={styles.container}>
    <Text style={styles.expression}>{expressions.source}</Text>
    <Text style={styles.expression}>{expressions.target}</Text>
  </View>
);

Expression.propTypes = {
  expressions: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Expression;
