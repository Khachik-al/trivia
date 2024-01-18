import { useState, useEffect, useContext } from 'react';

import { getCategories, getQuestions } from '../services.ts';
import {
  addScoreRecordToHistory,
  createAnswers,
  createScoreRecord,
  updateAnswers,
} from '../utils.ts';
import { Step } from '../enums';
import type { IQuestion, IAnswer, ICategories } from '../types.ts';
import { ErrorMessageContext } from '../context/ErrorMessageContext.tsx';

export interface AppStateFacade<T extends string = string> {
  categories: ICategories<T> | null;
  questions: IQuestion[];
  activeQuestion: IQuestion | null;
  answers: IAnswer[];
  step: Step;
  categoryLoading: boolean;
  questionsLoading: boolean;
  indexOfActiveQuestion: number;
  errorMessage: string | null;
  startQuizHandler: (categoryId: string) => void;
  scoreHistoryHandler: () => void;
  chooseAnswerHandler: (answer: string) => void;
  backToHomeHandler: () => void;
  onCloseAlert: () => void;
}

export default function useAppState(): AppStateFacade {
  const [questionsLoading, setQuestionsLoading] = useState<boolean>(false);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategories | null>(null);
  const [questions, setQuestions] = useState<Array<IQuestion>>([]);
  const [activeQuestion, setActiveQuestion] = useState<IQuestion | null>(null);
  const [answers, setAnswers] = useState<Array<IAnswer>>([]);
  const [step, setStep] = useState<Step>(Step.PICK_CATEGORY);
  const indexOfActiveQuestion = activeQuestion ? questions.indexOf(activeQuestion) : 0;
  const { errorMessage, setErrorMessage, clearErrorMessage } =
    useContext(ErrorMessageContext);

  const loadCategories = async () => {
    setCategoryLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    void loadCategories();
  }, []);

  const startQuizHandler: AppStateFacade['startQuizHandler'] = async (
    categoryId: string,
  ) => {
    setQuestionsLoading(true);
    try {
      const data = await getQuestions({ categoryId });
      setQuestions(data.results);
      setActiveQuestion(data.results[0]);
      setAnswers(createAnswers(data.results));
      setStep(Step.ANSWER_QUESTIONS);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred');
      }
    } finally {
      setQuestionsLoading(false);
    }
  };

  const chooseAnswerHandler: AppStateFacade['chooseAnswerHandler'] = (
    answer: string,
  ): void => {
    setAnswers((prev) =>
      updateAnswers(
        prev,
        indexOfActiveQuestion,
        answer === activeQuestion?.correct_answer,
      ),
    );

    if (indexOfActiveQuestion !== questions.length - 1) {
      setActiveQuestion(questions[indexOfActiveQuestion + 1]);
    } else {
      const score = createScoreRecord(activeQuestion!.category, answers);
      addScoreRecordToHistory(score);
      setStep(Step.SCORE);
    }
  };

  const backToHomeHandler: AppStateFacade['backToHomeHandler'] = (): void => {
    setStep(Step.PICK_CATEGORY);
  };

  const scoreHistoryHandler: AppStateFacade['scoreHistoryHandler'] = (): void => {
    setStep(Step.SCORE_HISTORY);
  };

  return {
    errorMessage,
    categories,
    questions,
    activeQuestion,
    answers,
    step,
    categoryLoading,
    questionsLoading,
    indexOfActiveQuestion,
    startQuizHandler,
    scoreHistoryHandler,
    chooseAnswerHandler,
    backToHomeHandler,
    onCloseAlert: clearErrorMessage,
  };
}
