import React, { useContext } from 'react';

// Components
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
import ScreenWrapper from '../../components/ScreenWrapper';

// Context
import UserContext from '../../contexts/UserContext';

// Vars
const CONTENT = `This is where any content will go for the home page! I'm not sure what will end up going, but it's going to be good!
  Use the links at the bottom of the screen to navigate to search or learning pages!`;

const HomeScreen = ({ navigation }) => {
  const [user] = useContext(UserContext);
  const title = user ? `Hey, ${user}!` : 'Not logged in!';
  const text = user ? CONTENT : 'Navigate to the settings page to log in!';

  return (
    <ScreenWrapper>
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.navigate('Settings')}>
              <Icon name="settings-outline" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Text>{text}</Text>
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
    </ScreenWrapper>
  );
};

export default HomeScreen;
