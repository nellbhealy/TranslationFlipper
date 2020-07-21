import { getWordData, updateUserWordList } from './storage';
import { getTargetLemma } from '../api/getters';

const LEVELS = ['one', 'two', 'three', 'four', 'five'];
const LIMITS = [8, 6, 4, 2, 1];

export const getNewLevel = (list, currentLevel, numQuizzed) => {
  const current = LEVELS.indexOf(currentLevel);
  const allLevelsDone =
    current >= LEVELS.length &&
    (numQuizzed >= LIMITS[current] ||
      !list[currentLevel] ||
      Object.keys(list[currentLevel]));

  if (allLevelsDone) {
    return null;
  }

  const needNewLevel =
    numQuizzed >= LIMITS[current] ||
    !list[currentLevel] ||
    !Object.keys(list[currentLevel]).length;

  if (needNewLevel) {
    return getNewLevel(list, LEVELS[current + 1], 0);
  }

  return currentLevel;
};

export const getNewWordLevel = (currentLevel) => {
  const current = LEVELS.indexOf(currentLevel);
  if (current >= LEVELS.length - 1) {
    return null;
  }
  return LEVELS[current + 1];
};

export const handleCorrectOrIncorrect = (
  isCorrect,
  word,
  list,
  currentLevel,
) => {
  const tempList = { ...list };
  const lemma = getTargetLemma(word);
  delete tempList[currentLevel][lemma];

  const newLevel = isCorrect ? getNewWordLevel(currentLevel) : LEVELS[0];
  if (newLevel) {
    tempList[newLevel][lemma] = word;
  }
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
