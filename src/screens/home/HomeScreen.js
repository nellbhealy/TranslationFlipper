import React, { useContext, useEffect } from 'react';

// Components
import { StatusBar } from 'react-native';
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

// Utils
import { getUser } from '../../utils/storage';

// Context
import UserContext from '../../UserContext';

// Vars
const CONTENT = `This is where any content will go for the home page! I'm not sure what will end up going, but it's going to be good!
  Use the links at the bottom of the screen to navigate to search or learning pages!`;

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    getUser().then(setUser);
  }, [setUser]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Hey, {user}!</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.navigate('Settings')}>
              <Icon name="settings-outline" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Text>{CONTENT}</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              title="Go to Search"
              onPress={() => navigation.navigate('Search')}>
              <Text>Go to Search</Text>
            </Button>
            <Button
              title="Go to Learning Page"
              onPress={() => navigation.navigate('Learn')}>
              <Text>Go to Learning Page</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </>
  );
};

export default HomeScreen;
