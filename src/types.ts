import { QuestionDifficulty } from './enums.ts';

export interface ICategory<T extends string = string> {
  id: number;
  name: T;
}

export interface ICategories<T extends string = string> {
  trivia_categories: ICategory<T>[];
}

export interface IQuestion<T extends string = string> {
  category: T;
  correct_answer: string;
  difficulty: QuestionDifficulty;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface IQuestions {
  response_code: number;
  results: Array<IQuestion>;
}

export interface IScore<T extends string = string> {
  id: string;
  date: Date;
  category: T;
  questionCount: number;
  correctAnswers: number;
}

export interface IAnswer {
  [key: number]: boolean;
}
