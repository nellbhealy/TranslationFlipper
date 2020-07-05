import React, {useCallback, useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import PropTypes from 'prop-types';
import translate from '../api/api';

const SearchBar = props => {
  // const [searchTerm, setSearchTerm] = useState(''); // <-- use state
  // look into useCallback for updateData
  // const updateData = useCallback(() => {
  //   translate('en', 'fr', searchTerm)
  //     .then(data => {
  //       data = data.data;
  //       //data = data.map(word => (word = word.targets[0].lemma + '\n'));
  //       props.setData(data);
  //     })
  //     .catch(error => {
  //       props.setData('Bad search. Did you spell the word correctly?');
  //     });
  // }, [searchTerm, props.setData]);

  // const updateData = () => {
  //   translate('en', 'fr', searchTerm) // <---- Move this into SearchScreen(Container)
  //     .then(data => {
  //       data = data.data;
  //       //data = data.map(word => (word = word.targets[0].lemma + '\n'));
  //       props.setData(data);
  //     })
  //     .catch(error => {
  //       props.setData('Bad search. Did you spell the word correctly?');
  //     });
  // };

  return (
    <View>
      <TextInput
        placeholder="What word do you want to look up?"
        onChangeText={inputText => props.setSearchTerm(inputText)}
        onEndEditing={props.updateData}
      />
      <Button onPress={props.updateData} title="search" />
    </View>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  // setData: PropTypes.func.isRequired,
};
