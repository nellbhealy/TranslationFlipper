import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';

import { getUserData } from '../../../utils/storage';
import {
  getRandomWord,
  handleCorrectOrIncorrect,
  getNewWordLevel,
  LIMITS,
  LEVELS,
} from '../../../utils/quizLogic';
import FlashCard from './FlashCard';

const FlashCardContainer = () => {
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
    <View>
      {!currentLevel ? (
        <Text>All Done!</Text>
      ) : (
        <>
          <Text>Level {currentLevel}</Text>
          <FlashCard
            word={wordInfo}
            isRevealed={isRevealed}
            isExpanded={isExpanded}>
            <Button
              title={isExpanded ? 'Hide Expressions' : 'Show Expressions'}
              onPress={handleExpressionsButtonPress}
            />
            <Button
              title={isRevealed ? 'Hide' : 'Reveal'}
              onPress={handleRevealButtonPress}
            />
            {isRevealed ? (
              <View>
                <Button
                  title="Got It"
                  onPress={() => {
                    handleCorrectOrIncorrectButtonPress(true);
                  }}
                />
                <Button
                  title="Missed It"
                  onPress={() => {
                    handleCorrectOrIncorrectButtonPress(false);
                  }}
                />
              </View>
            ) : null}
          </FlashCard>
        </>
      )}
    </View>
  );
};

export default FlashCardContainer;
