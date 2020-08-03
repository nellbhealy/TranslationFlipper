import AsyncStorage from '@react-native-community/async-storage';

import { getTargetLemma } from '../api/getters';

const getBlankUserWordList = () => ({
  one: {},
  two: {},
  three: {},
  four: {},
  five: {},
});

/**
 * Gets object containing all users
 *
 * @return {Object<string, Object<string, Object<string, String[]>>>} All users
 */
export const getAllUsers = async () => {
  try {
    const usersJson = AsyncStorage.getItem('@users').then(JSON.parse);
    const users = usersJson || {};
    return users;
  } catch {
    return {};
  }
};

/**
 * Gets current user's name
 *
 * @return {string} User's name
 */
export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('@user');
    return user;
  } catch (e) {
    return null;
  }
};

/**
 * Writes new user to storage
 *
 * @see getAllUsers
 * @see getBlankUserWordList
 *
 * @return {boolean} Successful?
 */
export const addUser = async (user) => {
  try {
    const users = await getAllUsers();
    users[user] = { wordList: getBlankUserWordList() };
    await AsyncStorage.setItem('@users', JSON.stringify(users));
    return true;
  } catch {
    return false;
  }
};

/**
 * Sets current user in storage
 *
 * @see getAllUsers
 * @see addUser
 *
 * @param {string} userName
 *
 * @return {boolean} Successful?
 */
export const setUser = async (userName) => {
  try {
    await AsyncStorage.setItem('@user', userName);
    const users = await getAllUsers();
    if (!users[userName]) {
      addUser(userName);
    }
    return true;
  } catch {
    return false;
  }
};

/**
 * Gets user object
 *
 * @see getUser
 * @see getAllUsers
 * @see getBlankUserWordList
 *
 * @param {string} userParam (optional)
 *
 * @return {Object<string, Object<string, String[]>>} User object
 */
export const getUserData = async (userParam) => {
  const userName = userParam || (await getUser());
  try {
    if (!userName) {
      return null;
    }
    const users = await getAllUsers();
    const userData = users[userName] || {};

    if (!userData.wordList || !Object.keys(userData.wordList).length) {
      userData.wordList = getBlankUserWordList();
    }

    return userData;
  } catch (e) {
    return null;
  }
};

/**
 * Gets all cached word objects
 *
 * @return {Object<string, object>}
 */
const getWordList = async () => {
  try {
    const list = await AsyncStorage.getItem('@wordList');
    if (!list) return {};
    return JSON.parse(list);
  } catch {
    return false;
  }
};

/**
 * Writes item into wordList in storage
 *
 * @see getWordList
 * @see getTargetLemma
 *
 * @param {string} word
 *
 * @returns {boolean} Successful?
 */
const addToWordList = async (word) => {
  const wordList = await getWordList();

  if (!wordList) {
    return false;
  }

  try {
    const lemma = getTargetLemma(word);

    if (Object.keys(wordList).includes(lemma)) {
      return false;
    }

    wordList[lemma] = word;
    await AsyncStorage.setItem('@wordList', JSON.stringify(wordList));
    return true;
  } catch {
    return false;
  }
};

/**
 * Adds word to user's list of words and writes to storage
 *
 * @see addToWordList
 *
 * @param {object} word Word object
 *
 * @return {boolean} Successful?
 */
export const addWordToUserList = async (word) => {
  try {
    const userName = await getUser();
    if (!userName) {
      return false;
    }
    const userData = await getUserData(userName);

    userData.wordList.one[getTargetLemma(word)] = {
      otherInfo: { date: new Date() },
    };

    addToWordList(word);
    const users = await getAllUsers();
    users[userName] = userData;

    await AsyncStorage.setItem('@users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * Clears user's list of words in storage
 *
 * @returns {boolean} Successful?
 */
export const clearWordList = async () => {
  const user = await getUser();

  if (!user) {
    return false;
  }

  try {
    const userData = await getUserData(user);

    if (!userData || !userData.wordList) {
      return false;
    }

    userData.wordList = getBlankUserWordList();
    const users = await getAllUsers();
    users[user] = userData;
    await AsyncStorage.setItem('@users', JSON.stringify(users));
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Gets word object from target language lemma
 *
 * @param {string} lemma
 *
 * @return {object} Word object
 */
export const getWordData = async (lemma) => {
  const wordData = await getWordList();
  return wordData[lemma];
};

/**
 * Returns object with user's saved words
 *
 * @param {string} userName
 *
 * @returns {Object<string, String[]>} wordList object
 */
export const getUserWordList = async (userName) =>
  getUserData(userName).then((list) => list.wordList);

/**
 * Takes a user wordList object and replaces the one in storage
 *
 * @param {Object<string, String[]} wordList
 *
 * @returns {boolean} Successful?
 */
export const updateUserWordList = async (wordList) => {
  try {
    const user = await getUser();
    const data = await getUserData(user);
    const users = await getAllUsers();
    data.wordList = wordList;
    users[user] = data;
    await AsyncStorage.setItem('@users', JSON.stringify(users));
    return true;
  } catch {
    return false;
  }
};
