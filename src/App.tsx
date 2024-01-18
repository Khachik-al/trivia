import { FC, ReactNode } from 'react';

import PickCategory from './pages/PickCategory.tsx';
import Questions from './pages/Questions.tsx';
import Score from './pages/Score.tsx';
import { getNumberOfCorrectAnswers } from './utils.ts';
import { ScoreHistory } from './pages/ScoreHistory';
import useAppState from './hooks/appStateHook.tsx';
import { Step } from './enums.ts';
import { Alert, Container } from '@mui/material';

const App: FC = () => {
  const {
    categories,
    activeQuestion,
    answers,
    step,
    categoryLoading,
    questionsLoading,
    indexOfActiveQuestion,
    errorMessage,
    startQuizHandler,
    scoreHistoryHandler,
    chooseAnswerHandler,
    backToHomeHandler,
    onCloseAlert,
  } = useAppState();

  const content: FC<void> = (): ReactNode => {
    switch (step) {
      case Step.PICK_CATEGORY:
        return (
          <PickCategory
            categories={categories}
            categoryLoading={categoryLoading}
            startQuizHandler={startQuizHandler}
            questionsLoading={questionsLoading}
            scoreHistoryHandler={scoreHistoryHandler}
          />
        );
      case Step.ANSWER_QUESTIONS:
        return (
          activeQuestion && (
            <Questions
              numberOfQuestion={`${indexOfActiveQuestion + 1}`.padStart(2, '0')}
              activeQuestion={activeQuestion}
              answerSubmittedHandler={chooseAnswerHandler}
            />
          )
        );
      case Step.SCORE:
        return (
          <Score
            backToHomeHandler={backToHomeHandler}
            questionCount={answers.length}
            correctAnswers={getNumberOfCorrectAnswers(answers)}
          />
        );
      case Step.SCORE_HISTORY:
        return <ScoreHistory backToHomeHandler={backToHomeHandler} />;
    }
  };

  return (
    <>
      {errorMessage && (
        <Alert severity='error' onClose={onCloseAlert}>
          {errorMessage}
        </Alert>
      )}
      <Container>{content()}</Container>
    </>
  );
};

export default App;
