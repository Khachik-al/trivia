import { FC, ReactNode } from 'react';

import { Chip, Grow, Stack, Typography, useMediaQuery } from '@mui/material';
import { ChipOwnProps } from '@mui/material/Chip/Chip';

import { insertAtRandomIndex, upperCaseFirstLetter } from '../utils.ts';
import { QuestionDifficulty } from '../enums.ts';
import type { IQuestion } from '../types.ts';

export interface QuestionsProps {
  numberOfQuestion: string;
  activeQuestion: IQuestion;
  answerSubmittedHandler: (answer: string) => void;
}

const Questions: FC<QuestionsProps> = ({
  numberOfQuestion,
  activeQuestion,
  answerSubmittedHandler,
}) => {
  const matches = useMediaQuery('(min-width:600px)');

  const getDifficultyColor = (difficulty: QuestionDifficulty): ChipOwnProps['color'] => {
    switch (difficulty) {
      case QuestionDifficulty.EASY:
        return 'success';
      case QuestionDifficulty.MEDIUM:
        return 'warning';
      case QuestionDifficulty.HARD:
        return 'error';
    }
  };

  const onAnswer = (el: string): void => {
    answerSubmittedHandler(el);
  };

  const options = insertAtRandomIndex(
    activeQuestion.incorrect_answers,
    activeQuestion.correct_answer,
  );

  const renderOptions = (): ReactNode[] => {
    return options.map((el) => (
      <Grow in timeout={300} key={el}>
        <Chip onClick={() => onAnswer(el)} variant='answer' clickable label={el} />
      </Grow>
    ));
  };

  return (
    <Stack direction='column' alignItems='center'>
      <Typography variant='h1' mb={matches ? '22px' : '12px'}>
        Question {numberOfQuestion}
      </Typography>
      <Chip
        variant='difficulty'
        label={upperCaseFirstLetter(activeQuestion.difficulty)}
        color={getDifficultyColor(activeQuestion.difficulty)}
      />
      <Typography
        variant='h2'
        mt={matches ? '87px' : '60px'}
        mb='36px'
        maxWidth={1200}
        textAlign='center'
      >
        {activeQuestion.question}
      </Typography>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}
        flexWrap='wrap'
        useFlexGap
      >
        {renderOptions()}
      </Stack>
    </Stack>
  );
};

export default Questions;
