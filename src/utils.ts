import { createId } from '@paralleldrive/cuid2';

import type { IAnswer, IQuestion, IScore } from './types.ts';

// Pure function
export const upperCaseFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Pure function
export const insertAtRandomIndex = <T>(array: T[], element: T): T[] => {
  const index = Math.floor(Math.random() * (array.length + 1));
  const new_array = [...array];
  new_array.splice(index, 0, element);
  return new_array;
};

// Pure function
export const getNumberOfCorrectAnswers = (answers: IAnswer[]): number => {
  return answers.reduce((count, answer, i) => {
    if (answer[i]) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);
};

// Pure function
export const createScoreRecord = <T extends string = string>(
  category: T,
  answers: IAnswer[],
): IScore => {
  return {
    id: createId(),
    date: new Date(),
    category,
    questionCount: answers.length,
    correctAnswers: getNumberOfCorrectAnswers(answers),
  };
};

// Pure Function
export const createAnswers = (questions: IQuestion[]): IAnswer[] => {
  return questions.map((_el, i) => ({ [i]: false }));
};

// Pure Function
export const updateAnswers = (
  answers: IAnswer[],
  questionIndex: number,
  isCorrectAnswer: boolean,
) => {
  return answers.map((el, i) =>
    i === questionIndex ? { ...el, [i]: isCorrectAnswer } : el,
  );
};

// Pure Function
export const getErrorMessageByResponseCode = (response_code: number): string => {
  switch (response_code) {
    case 1:
      return "No Results: Could not return results. The API doesn't have enough questions for your query.";
    case 2:
      return 'Invalid Parameter: Contains an invalid parameter.';
    case 3:
      return 'Token Not Found: Session Token does not exist.';
    case 4:
      return 'Token Empty: Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.';
    case 5:
      return 'Rate Limit: Too many requests have occurred. Each IP can only access the API once every 5 seconds.';
    default:
      return 'Unknown error';
  }
};

// Impure function
export const getLocalStorageArray = (key: string): IScore[] => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  } catch (error) {
    console.error(`Failed to get ${key} from localStorage:`, error);
    return [];
  }
};

// Impure function
export const setLocalStorageArray = (key: string, array: IScore[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(array));
  } catch (error) {
    console.error(`Failed to set ${key} to localStorage:`, error);
  }
};

// Impure function
export const addScoreRecordToHistory = (score: IScore): void => {
  const scoreHistory = getLocalStorageArray('scoreHistory');
  scoreHistory.unshift(score);
  setLocalStorageArray('scoreHistory', scoreHistory);
};
