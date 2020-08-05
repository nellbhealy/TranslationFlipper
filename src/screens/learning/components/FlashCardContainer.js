import React, { useState, useEffect, useContext } from 'react';

// Components
import { StyleSheet } from 'react-native';
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
  Button,
} from 'native-base';
import ScreenWrapper from '../../../components/ScreenWrapper';
import FlashCard from './FlashCard';

// Context
import userContext from '../../../contexts/UserContext';

// Utils
import { getUserData } from '../../../utils/storage';
import {
  getRandomWord,
  handleCorrectOrIncorrect,
  getNewWordLevel,
  LIMITS,
  LEVELS,
} from '../../../utils/quizLogic';

// Styles
const styles = StyleSheet.create({
  button: {
    color: 'white',
  },
});

// Vars
const NOT_LOGGED_IN =
  'Navigate to the settings tab on the home page to log in!';

const FlashCardContainer = () => {
  const [user] = useContext(userContext);
  const [list, setList] = useState({});
  const [wordInfo, setWordInfo] = useState({});
  const [isExpanded, setExpanded] = useState(false);
  const [isRevealed, setRevealed] = useState(false);
  const [currentLevel, setCurrentLevel] = useState('one');
  const [numQuizzed, setNumQuizzed] = useState(0);

  const handleExpressionsButtonPress = () => {
    setExpanded((expanded) => !expanded);
  };

  const handleRevealButtonPress = () => {
    setRevealed((flipped) => !flipped);
  };

  const handleCorrectOrIncorrectButtonPress = (isCorrect) => {
    const temp = handleCorrectOrIncorrect(
      isCorrect,
      wordInfo,
      list,
      currentLevel,
    );

    // EFFECTS
    setList(temp);
    setNumQuizzed((quizzed) => quizzed + 1);
    setRevealed(false);
    setExpanded(false);
  };

  useEffect(() => {
    let mounted = true;

    getUserData().then((userData) => {
      if (mounted) {
        setList(userData.wordList);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!list || !currentLevel || !list[currentLevel]) {
      return;
    }

    const currentLevelEmpty = !Object.keys(list[currentLevel]).length;
    const levelLimit = LIMITS[LEVELS.indexOf(currentLevel)];
    const numQuizzedPastLimit = numQuizzed >= levelLimit;
    if (currentLevelEmpty || numQuizzedPastLimit) {
      setCurrentLevel(getNewWordLevel(currentLevel));
      setNumQuizzed(0);
    } else {
      getRandomWord(list[currentLevel]).then((wordData) => {
        setWordInfo({
          source: wordData.source,
          targets: wordData.targets,
        });
      });
    }
  }, [list, currentLevel, numQuizzed]);

  return (
    <ScreenWrapper>
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Level {currentLevel}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {user ? (
            <>
              <FlashCard
                word={wordInfo}
                isRevealed={isRevealed}
                isExpanded={isExpanded}>
                <Button
                  small
                  transparent
                  bordered
                  title={isExpanded ? 'Hide Expressions' : 'Show Expressions'}
                  onPress={handleExpressionsButtonPress}>
                  <Text>
                    {isExpanded ? 'Hide Expressions' : 'Show Expressions'}
                  </Text>
                </Button>
                <Button
                  small
                  transparent
                  bordered
                  title={isRevealed ? 'Hide' : 'Reveal'}
                  onPress={handleRevealButtonPress}>
                  <Text>{isRevealed ? 'Hide' : 'Reveal'}</Text>
                </Button>
              </FlashCard>
            </>
          ) : (
            <Text>{NOT_LOGGED_IN}</Text>
          )}
        </Content>
        <Footer>
          <FooterTab>
            <Button
              success
              title="Got It"
              onPress={() => {
                handleCorrectOrIncorrectButtonPress(true);
              }}>
              <Text style={styles.button}>Got It</Text>
            </Button>
            <Button
              danger
              title="Missed It"
              onPress={() => {
                handleCorrectOrIncorrectButtonPress(false);
              }}>
              <Text style={styles.button}>Missed It</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </ScreenWrapper>
  );

  // return (
  //   <View>
  //     {!currentLevel ? (
  //       <Text>All Done!</Text>
  //     ) : (
  //       <>
  //         <Text>Level {currentLevel}</Text>
  //         <FlashCard
  //           word={wordInfo}
  //           isRevealed={isRevealed}
  //           isExpanded={isExpanded}>
  //           <Button
  //             title={isExpanded ? 'Hide Expressions' : 'Show Expressions'}
  //             onPress={handleExpressionsButtonPress}>
  //             <Text>
  //               {isExpanded ? 'Hide Expressions' : 'Show Expressions'}
  //             </Text>
  //           </Button>
  //           <Button
  //             title={isRevealed ? 'Hide' : 'Reveal'}
  //             onPress={handleRevealButtonPress}>
  //             <Text>{isRevealed ? 'Hide' : 'Reveal'}</Text>
  //           </Button>
  //           {isRevealed ? (
  //             <View>
  //               <Button
  //                 title="Got It"
  //                 onPress={() => {
  //                   handleCorrectOrIncorrectButtonPress(true);
  //                 }}>
  //                 <Text>Got It</Text>
  //               </Button>
  //               <Button
  //                 title="Missed It"
  //                 onPress={() => {
  //                   handleCorrectOrIncorrectButtonPress(false);
  //                 }}>
  //                 <Text>Missed It</Text>
  //               </Button>
  //             </View>
  //           ) : null}
  //         </FlashCard>
  //       </>
  //     )}
  //   </View>
  // );
};

export default FlashCardContainer;
