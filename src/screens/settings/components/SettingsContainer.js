import React, { useState, useEffect, useCallback, useContext } from 'react';

// Components
import { View, ScrollView, StatusBar, Alert } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base';
import NameBar from './NameBar';

// Utils
import {
  getUser,
  setUser,
  clearWordList,
  getUserWordList,
} from '../../../utils/storage';

// Context
import UserContext from '../../../contexts/UserContext';

const updateData = (inputText, setName) => {
  setName(inputText);
  setUser(inputText);
};

const getData = async () => getUser();

const clearWords = async () => {
  clearWordList();
};

const handleClearButtonPress = () => {
  Alert.alert(
    'Are you sure you want to delete all of your words?',
    'This action is irreversible. You will lose all of your word data.',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      { text: 'Delete All Words', onPress: clearWords, style: 'danger' },
    ],
  );
};

const SettingsContainer = () => {
  const [name, setName] = useContext(UserContext);
  const [inputText, setInputText] = useState('');
  const [userData, setUserData] = useState({});

  const refreshList = useCallback(() => {
    getUserWordList(name).then(setUserData);
  }, [name]);

  useEffect(() => {
    getData().then(setName);
  }, [setName]);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  const logOut = () => {
    setUser(null);
    setName(null);
  };

  const getWords = () => {
    const levels = Object.keys(userData || {});
    if (levels.length) {
      const words = levels.reduce(
        (obj, level) => ({
          ...obj,
          [level]: Object.keys(userData[level]),
        }),
        {},
      );
      return words;
    }

    return {};
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>{name ? `User: ${name}` : 'Log in below!'}</Title>
          </Body>
          <Right />
        </Header>
        <Container>
          <Content>
            <NameBar
              setInputText={setInputText}
              updateData={() => updateData(inputText, setName)}
            />
            <Text onPress={refreshList}>
              User Data: {JSON.stringify(getWords())}
            </Text>
          </Content>
        </Container>
        <Footer>
          <FooterTab>
            <Button title="Clear word list" onPress={handleClearButtonPress}>
              <Text>Clear word list</Text>
            </Button>
            <Button title="Log out" onPress={logOut}>
              <Text>Log out</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </>
  );
};

export default SettingsContainer;
