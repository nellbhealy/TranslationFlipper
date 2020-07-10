import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';

import { getUserData, getWordData } from '../../../utils/storage';
import FlashCard from './FlashCard';

const FlashCardContainer = () => {
  const [list, setList] = useState([]);
  const [wordInfo, setWordInfo] = useState({});
  const [done, setDone] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [isRevealed, setRevealed] = useState(false);

  useEffect(() => {
    getUserData().then((userData) =>
      setList(userData.wordList ? userData.wordList : []),
    );
  }, []);

  useEffect(() => {
    if (list[0]) {
      getWordData(list[0].word).then((wordData) =>
        setWordInfo({
          source: wordData.source,
          target: wordData.targets,
        }),
      );
      setDone(false);
      setRevealed(false);
      setExpanded(false);
    } else {
      setDone(true);
    }
  }, [list]);

  const handleRemove = () => {
    setList(list.filter((item) => item.word !== list[0].word));
  };

  const handleMiss = () => {
    const missed = [list[0]];
    handleRemove();
    setList((list) => list.concat(missed));
  };

  const handleExpressionsButtonPress = () => {
    setExpanded((isExpanded) => !isExpanded);
  };

  const handleRevealButtonPress = () => {
    setRevealed((flipped) => !flipped);
  };
  return (
    <View>
      {done ? (
        <Text>All Done!</Text>
      ) : (
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
              <Button title="Got It" onPress={handleRemove} />
              <Button title="Missed It" onPress={handleMiss} />
            </View>
          ) : null}
        </FlashCard>
      )}
    </View>
  );
};

export default FlashCardContainer;
