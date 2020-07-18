const LEVELS = ['one', 'two', 'three', 'four', 'five'];
const LIMITS = [16, 8, 4, 2, 1];

const getNewLevel = (currentLevel, numQuizzed) => {
  const current = LEVELS.indexOf(currentLevel);
  if (current >= LEVELS.length - 1 && numQuizzed >= LIMITS[current]) {
    return null;
  } else if (numQuizzed >= LIMITS[current]) {
    return LEVELS[current + 1];
  } else {
    return currentLevel;
  }
};

const getNewWordLevel = (currentLevel) => {
  const current = LEVELS.indexOf(currentLevel);
  if (current >= LEVELS.length - 1) {
    return null;
  } else {
    return LEVELS[current + 1];
  }
};

const newLevel = getNewWordLevel('one');
console.log(newLevel);
