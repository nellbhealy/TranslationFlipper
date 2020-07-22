import AsyncStorage from '@react-native-community/async-storage';

import { DEFAULT_USER } from './constants';
import { getTargetLemma } from '../api/getters';

const DEFAULT_USER_ERROR = 'No user selected! Have you logged in?';

const getBlankUserWordList = () => ({
  one: {},
  two: {},
  three: {},
  four: {},
  five: {},
});

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('@user');
    if (user !== null) {
      return user;
    }
    return DEFAULT_USER;
  } catch (e) {
    return DEFAULT_USER;
  }
};

export const setUser = async (user) => {
  try {
    await AsyncStorage.setItem('@user', user);
    return true;
  } catch {
    return false;
  }
};

export const getUserData = async (userParam) => {
  let user;
  if (!userParam) {
    user = await getUser();
  } else {
    user = userParam;
  }
  try {
    if (user === DEFAULT_USER) {
      return DEFAULT_USER_ERROR;
    }
    let userData = await AsyncStorage.getItem(`@${user}`);
    userData = JSON.parse(userData);
    return userData;
  } catch (e) {
    return DEFAULT_USER_ERROR;
  }
};

const getWordList = async () => {
  try {
    const list = await AsyncStorage.getItem('@wordList');
    if (!list) return {};
    return JSON.parse(list);
  } catch {
    return false;
  }
};

const addToWordList = async (word) => {
  const wordList = await getWordList();
  if (!wordList) return false;
  try {
    const lemma = getTargetLemma(word);
    if (Object.keys(wordList).includes(lemma)) return false;
    wordList[lemma] = word;
    await AsyncStorage.setItem('@wordList', JSON.stringify(wordList));
    return true;
  } catch {
    return false;
  }
};

export const addWordToUserList = async (word) => {
  try {
    const user = await getUser();
    let userData = await getUserData(user);

    if (userData === DEFAULT_USER_ERROR) {
      return false;
    }

    if (!userData) {
      userData = {
        wordList: getBlankUserWordList(),
      };
    }
    userData.wordList.one[getTargetLemma(word)] = {
      otherInfo: { date: new Date() },
    };
    addToWordList(word);
    await AsyncStorage.setItem(`@${user}`, JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const clearWordList = async () => {
  const user = await getUser();
  if (user === DEFAULT_USER) return false;
  try {
    const userData = await getUserData(user);

    if (userData === DEFAULT_USER_ERROR || !userData || !userData.wordList) {
      return false;
    }

    userData.wordList = getBlankUserWordList();
    await AsyncStorage.setItem(`@${user}`, JSON.stringify(userData));
    return true;
  } catch (error) {
    return false;
  }
};

export const getWordData = async (lemma) => {
  const wordData = await getWordList();
  return wordData[lemma];
};

export const getUserWordList = async (user) =>
  getUserData(user).then((list) => list.wordList);

export const updateUserWordList = async (wordList) => {
  try {
    const user = await getUser();
    const data = await getUserData(user);
    data.wordList = wordList;
    await AsyncStorage.setItem(`@${user}`, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
};
