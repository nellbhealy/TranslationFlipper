import React, {useState} from 'react';
import {View} from 'react-native';
import SearchBar from './SearchBar';
import DictionaryEntriesContainer from './DictionaryEntriesContainer';
import translate from '../../../api/api';

const BAD_SEARCH = 'No results. Did you spell the word correctly?';
const SOURCE_LANG = 'en';
const TARGET_LANG = 'fr';

const updateData = (searchTerm, setData, setEmptyMessage) => {
  translate(SOURCE_LANG, TARGET_LANG, searchTerm)
    .then(responseData => {
      responseData = responseData.data;
      if (responseData === undefined) {
        setData([]);
        setEmptyMessage(BAD_SEARCH);
      } else {
        setData(responseData);
        setEmptyMessage('');
      }
    })
    .catch(error => {
      setData([]);
      setEmptyMessage(BAD_SEARCH);
    });
};

const SearchScreenContainer = ({navigation}) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [emptyMessage, setEmptyMessage] = useState('');

  return (
    <View>
      <SearchBar
        updateData={() => updateData(searchTerm, setData, setEmptyMessage)}
        setSearchTerm={setSearchTerm}
      />
      <DictionaryEntriesContainer data={data} emptyMessage={emptyMessage} />
    </View>
  );
};

export default SearchScreenContainer;
