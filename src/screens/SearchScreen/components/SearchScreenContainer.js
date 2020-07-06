import React, {useState} from 'react';
import {View} from 'react-native';
import SearchBar from './SearchBar';
import DictionaryEntriesContainer from './DictionaryEntriesContainer';
import translate from '../../../api/api';

const BAD_SEARCH = 'Bad search. Did you spell the word correctly?';
const SOURCE_LANG = 'en';
const TARGET_LANG = 'fr';

const updateData = (searchTerm, setData) => {
  translate(SOURCE_LANG, TARGET_LANG, searchTerm)
    .then(responseData => {
      responseData = responseData.data;
      setData(responseData);
    })
    .catch(error => {
      setData([BAD_SEARCH]);
    });
};

const SearchScreenContainer = ({navigation}) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <View>
      <SearchBar
        updateData={() => updateData(searchTerm, setData)}
        setSearchTerm={setSearchTerm}
      />
      <DictionaryEntriesContainer data={data} />
    </View>
  );
};

export default SearchScreenContainer;
