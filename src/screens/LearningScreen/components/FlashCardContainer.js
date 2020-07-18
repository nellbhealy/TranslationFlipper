import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';

import { getUserData } from '../../../utils/storage';
import {
  getRandomWord,
  handleCorrectOrIncorrect,
  getNewLevel,
} from '../../../utils/spacing';
import FlashCard from './FlashCard';

const handleRevealButtonPress = (setRevealed) => {
  setRevealed((flipped) => !flipped);
};

const handleExpressionsButtonPress = (setExpanded) => {
  setExpanded((isExpanded) => !isExpanded);
};

const FlashCardContainer = () => {
  const [list, setList] = useState({});
  const [wordInfo, setWordInfo] = useState({});
  const [done, setDone] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [isRevealed, setRevealed] = useState(false);
  const [currentLevel, setCurrentLevel] = useState('one');
  const [numQuizzed, setNumQuizzed] = useState(0);

  const handleCorrectOrIncorrectButtonPress = (isCorrect) => {
    const temp = handleCorrectOrIncorrect(
      isCorrect,
      wordInfo,
      list,
      currentLevel,
    );
    setList(temp);
    // TODO: Why is this neccesary? Why isn't the useEffect on line 84 calling this??
    handleNewWord();
  };

  useEffect(() => {
    let mounted = true;
    getUserData().then((userData) => {
      let newList;
      if (userData.wordList) {
        newList = userData.wordList;
      } else {
        newList = {};
        newList[currentLevel] = null;
      }
      mounted ? setList(newList) : null;
    });

    return () => (mounted = false);
  }, []);

  const handleNewWord = () => {
    if (!list || !list[currentLevel]) {
      return;
    }

    setDone(false);
    setRevealed(false);
    setExpanded(false);

    const oldLevel = currentLevel;
    const newLevel = getNewLevel(list, currentLevel, numQuizzed);
    if (oldLevel !== newLevel) {
      setCurrentLevel(newLevel);
      setNumQuizzed(0);
    }

    if (newLevel) {
      getRandomWord(list[newLevel]).then((wordData) => {
        setWordInfo({
          source: wordData.source,
          targets: wordData.targets,
        });
      });

      setNumQuizzed(numQuizzed + 1);
    } else {
      setDone(true);
    }
  };

  useEffect(() => {
    handleNewWord();
  }, [list]);

  return (
    <View>
      {done ? (
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
              onPress={() => handleExpressionsButtonPress(setExpanded)}
            />
            <Button
              title={isRevealed ? 'Hide' : 'Reveal'}
              onPress={() => handleRevealButtonPress(setRevealed)}
            />
            {isRevealed ? (
              <View>
                <Button
                  title="Got It"
                  onPress={() => handleCorrectOrIncorrectButtonPress(true)}
                />
                <Button
                  title="Missed It"
                  onPress={() => handleCorrectOrIncorrectButtonPress(false)}
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
