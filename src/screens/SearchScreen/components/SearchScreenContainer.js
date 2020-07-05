import React, {useState} from 'react';
import {View} from 'react-native';
import SearchBar from './SearchBar';
import DictionaryEntriesContainer from './DictionaryEntriesContainer';
import translate from '../../../api/api';

const BAD_SEARCH = 'Bad search. Did you spell the word correctly?';

const SearchScreenContainer = ({navigation}) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const updateData = () => {
    translate('en', 'fr', searchTerm)
      .then(responseData => {
        responseData = responseData.data;
        setData(responseData);
      })
      .catch(error => {
        setData([BAD_SEARCH]);
      });
  };

  return (
    <View>
      <SearchBar updateData={updateData} setSearchTerm={setSearchTerm} />
      <DictionaryEntriesContainer data={data} />
    </View>
  );
};

export default SearchScreenContainer;
