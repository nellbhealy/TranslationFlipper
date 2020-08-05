import React from 'react';
import PropTypes from 'prop-types';

// Components
import Expression from './Expression';

const DictionaryEntryExpansion = ({ expressions }) => (
  <>
    {expressions.length
      ? expressions.map((expression) => (
          <Expression key={expression.source} expressions={expression} />
          // eslint-disable-next-line indent
        ))
      : null}
  </>
);

DictionaryEntryExpansion.propTypes = {
  expressions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleButtonPress: PropTypes.func.isRequired,
};

export default DictionaryEntryExpansion;
