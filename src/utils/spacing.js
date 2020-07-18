import { getWordData, updateUserWordList } from './storage';
import { getTargetLemma } from '../api/getters';

const LEVELS = ['one', 'two', 'three', 'four', 'five'];
const LIMITS = [8, 6, 4, 2, 1];

export const getNewLevel = (list, currentLevel, numQuizzed) => {
  const current = LEVELS.indexOf(currentLevel);
  if (
    current >= LEVELS.length - 1 &&
    (numQuizzed >= LIMITS[current] ||
      !list[currentLevel] ||
      Object.keys(list[currentLevel]))
  ) {
    return null;
  } else if (
    numQuizzed >= LIMITS[current] ||
    !list[currentLevel] ||
    !Object.keys(list[currentLevel]).length
  ) {
    return getNewLevel(list, LEVELS[current + 1], 0);
  } else {
    return currentLevel;
  }
};

export const getNewWordLevel = (currentLevel) => {
  const current = LEVELS.indexOf(currentLevel);
  if (current >= LEVELS.length - 1) {
    return null;
  } else {
    return LEVELS[current + 1];
  }
};

export const handleCorrect = (word, list, currentLevel) => {
  const tempList = list;
  const lemma = getTargetLemma(word);
  delete tempList[currentLevel][lemma];
  const newLevel = getNewWordLevel(currentLevel);
  if (newLevel) {
    tempList[newLevel][lemma] = word;
  }
  updateUserWordList(tempList);
  return tempList;
};

export const handleIncorrect = (word, list, currentLevel) => {
  const tempList = list;
  const lemma = getTargetLemma(word);
  delete tempList[currentLevel][lemma];
  tempList[LEVELS[0]][lemma] = word;
  updateUserWordList(tempList);
  return tempList;
};

export const getRandomWord = async (wordList) => {
  const words = Object.keys(wordList);
  const ind = Math.floor(Math.random() * words.length);
  const word = words[ind];
  const wordData = await getWordData(word);
  return wordData;
};
