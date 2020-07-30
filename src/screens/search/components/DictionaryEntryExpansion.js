import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Expression from './Expression';

const DictionaryEntryExpansion = ({ expressions }) => (
  <View>
    {expressions.length
      ? expressions.map((expression) => (
          <Expression key={expression.source} expressions={expression} />
          // eslint-disable-next-line indent
        ))
      : null}
  </View>
);

DictionaryEntryExpansion.propTypes = {
  expressions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleButtonPress: PropTypes.func.isRequired,
};

export default DictionaryEntryExpansion;
