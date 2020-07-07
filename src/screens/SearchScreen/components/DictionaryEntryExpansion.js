import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Expression from './Expression';

const DictionaryEntryExpansion = ({ expressions }) => (
  <View>
    {expressions.length
      ? expressions.map((expression) => (
          // probably a bad key, should find a better one
          <Expression key={expression.source} expressions={expression} />
          // eslint-disable-next-line indent
        ))
      : null}
  </View>
);

DictionaryEntryExpansion.propTypes = {
  // TODO: expand into arrayOf
  expressions: PropTypes.array.isRequired,
};

export default DictionaryEntryExpansion;
