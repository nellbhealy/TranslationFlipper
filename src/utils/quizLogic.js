import { getWordData, updateUserWordList } from './storage';
import { getTargetLemma } from '../api/getters';

export const LEVELS = ['one', 'two', 'three', 'four', 'five'];
export const LIMITS = [8, 6, 4, 2, 1];

export const getNewLevel = (list, currentLevel, numQuizzed) => {
  const currentIndex = LEVELS.indexOf(currentLevel);

  const allLevelsDone =
    currentLevel === 'five' &&
    (numQuizzed >= LIMITS[currentIndex] ||
      !list[currentLevel] ||
      !Object.keys(list[currentLevel]).length);

  if (allLevelsDone) {
    return null;
  }

  const needNewLevel =
    numQuizzed >= LIMITS[currentIndex] ||
    !list[currentLevel] ||
    !Object.keys(list[currentLevel]).length;

  if (needNewLevel) {
    return getNewLevel(list, LEVELS[currentIndex + 1], 0);
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
  const lemma = getTargetLemma(word);
  const newLevel = isCorrect ? getNewWordLevel(currentLevel) : LEVELS[0];

  const newList = Object.keys(list).reduce((listObj, level) => {
    let levelObj;
    if (level === currentLevel) {
      const keepers = Object.keys(list[level]).filter((key) => key !== lemma);
      levelObj = keepers.reduce(
        (obj, key) => ({
          ...obj,
          [key]: list[level][key],
        }),
        {},
      );
    } else if (level === newLevel) {
      levelObj = { ...list[level], [lemma]: word };
    } else {
      levelObj = list[level];
    }
    return { ...listObj, [level]: levelObj };
  }, {});

  updateUserWordList(newList);

  return newList;
};

export const getRandomWord = async (wordList) => {
  const words = Object.keys(wordList);
  const ind = Math.floor(Math.random() * words.length);
  const word = words[ind];
  const wordData = await getWordData(word);
  return wordData;
};
