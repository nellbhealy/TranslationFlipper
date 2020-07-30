import AsyncStorage from '@react-native-community/async-storage';

import { getTargetLemma } from '../api/getters';

const getBlankUserWordList = () => ({
  one: {},
  two: {},
  three: {},
  four: {},
  five: {},
});

export const getAllUsers = async () => {
  try {
    const usersJson = AsyncStorage.getItem('@users').then(JSON.parse);
    const users = usersJson || {};
    return users;
  } catch {
    return {};
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('@user');
    return user;
  } catch (e) {
    return null;
  }
};

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

export const setUser = async (user) => {
  try {
    await AsyncStorage.setItem('@user', user);
    const users = await getAllUsers();
    if (!users[user]) {
      addUser(user);
    }
    return true;
  } catch {
    return false;
  }
};

export const getUserData = async (userParam) => {
  const user = userParam || (await getUser());
  try {
    if (!user) {
      return null;
    }
    const users = await getAllUsers();
    const userData = users[user] || {};

    if (!userData.wordList || !Object.keys(userData.wordList).length) {
      userData.wordList = getBlankUserWordList();
    }

    return userData;
  } catch (e) {
    return null;
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

export const addWordToUserList = async (word) => {
  try {
    const user = await getUser();
    if (!user) {
      return false;
    }
    const userData = await getUserData(user);

    userData.wordList.one[getTargetLemma(word)] = {
      otherInfo: { date: new Date() },
    };

    addToWordList(word);
    const users = await getAllUsers();
    users[user] = userData;

    await AsyncStorage.setItem('@users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

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
    const users = getAllUsers();
    users[user] = userData;
    await AsyncStorage.setItem('@users', JSON.stringify(users));
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
    const users = await getAllUsers();
    data.wordList = wordList;
    users[user] = data;
    await AsyncStorage.setItem('@users', JSON.stringify(users));
    return true;
  } catch {
    return false;
  }
};
