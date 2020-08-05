import React, { useState, useContext } from 'react';

// Components
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';
import SearchBar from './SearchBar';
import DictionaryEntriesContainer from './DictionaryEntriesContainer';
import ScreenWrapper from '../../../components/ScreenWrapper';

// Context
import userContext from '../../../contexts/UserContext';

// Utils
import translate from '../../../api/api';

// Vars
const BAD_SEARCH = 'No results. Did you spell the word correctly?';
const SOURCE_LANG = 'en';
const TARGET_LANG = 'fr';
const NOT_LOGGED_IN =
  'Navigate to the settings tab on the home page to log in!';

const updateData = (searchTerm, setData, setEmptyMessage, setIsSearching) => {
  setIsSearching(true);
  translate(SOURCE_LANG, TARGET_LANG, searchTerm)
    .then((responseData) => {
      const wordData = responseData.data;
      if (wordData === undefined) {
        setData([]);
        setEmptyMessage(BAD_SEARCH);
      } else {
        setData(wordData);
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
  const [user] = useContext(userContext);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [emptyMessage, setEmptyMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const title = user ? `Hey, ${user}!` : 'Not logged in!';

  return (
    <ScreenWrapper>
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right />
        </Header>
        {user ? (
          <>
            <SearchBar
              updateData={() =>
                updateData(searchTerm, setData, setEmptyMessage, setIsSearching)
              }
              setSearchTerm={setSearchTerm}
            />

            <Content>
              <DictionaryEntriesContainer
                data={data}
                emptyMessage={emptyMessage}
                isSearching={isSearching}
              />
            </Content>
          </>
        ) : (
          <Text>{NOT_LOGGED_IN}</Text>
        )}
        <Footer>
          <FooterTab />
        </Footer>
      </Container>
    </ScreenWrapper>
  );
};

export default SearchContainer;
