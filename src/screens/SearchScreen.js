import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import SearchBar from '../utils/components/SearchBar';
import DictionaryEntriesContainer from '../utils/components/DictionaryEntriesContainer';
import translate from '../utils/api/api';

// This should be SearchScreenContainer
const SearchScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const updateData = () => {
    translate('en', 'fr', searchTerm)
      .then(responseData => {
        responseData = responseData.data;
        setData(responseData);
      })
      .catch(error => {
        setData('Bad search. Did you spell the word correctly?');
      });
  };

  return (
    <View>
      <SearchBar updateData={updateData} setSearchTerm={setSearchTerm} />
      <DictionaryEntriesContainer data={data} />
    </View>
  );
};

export default SearchScreen;
