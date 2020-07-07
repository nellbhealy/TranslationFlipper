import React, { useState } from 'react';
import { View } from 'react-native';
import SearchBar from './SearchBar';
import DictionaryEntriesContainer from './DictionaryEntriesContainer';
import translate from '../../../api/api';

const BAD_SEARCH = 'No results. Did you spell the word correctly?';
const SOURCE_LANG = 'en';
const TARGET_LANG = 'fr';

const updateData = (searchTerm, setData, setEmptyMessage, setIsSearching) => {
  setIsSearching(true);
  translate(SOURCE_LANG, TARGET_LANG, searchTerm)
    .then((responseData) => {
      const wordData = responseData.data;
      if (wordData === undefined) {
        setData([]);
        setEmptyMessage(BAD_SEARCH);
      } else {
        setData(responseData);
        setEmptyMessage('');
      }
      setIsSearching(false);
    })
    .catch(() => {
      setData([]);
      setEmptyMessage(BAD_SEARCH);
      setIsSearching(false);
    });
};

const SearchContainer = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [emptyMessage, setEmptyMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  return (
    <View>
      <SearchBar
        updateData={() =>
          updateData(searchTerm, setData, setEmptyMessage, setIsSearching)
        }
        setSearchTerm={setSearchTerm}
      />
      <DictionaryEntriesContainer
        data={data}
        emptyMessage={emptyMessage}
        isSearching={isSearching}
      />
    </View>
  );
};

export default SearchContainer;
