import { FC } from 'react';

import { Button, Stack, Typography, useMediaQuery } from '@mui/material';

interface ScoreProps {
  questionCount: number;
  correctAnswers: number;
  backToHomeHandler: () => void;
}

const Score: FC<ScoreProps> = ({ questionCount, correctAnswers, backToHomeHandler }) => {
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <Stack direction='column' alignItems='center'>
      <Typography variant='h1'>Thank you</Typography>
      <Typography variant='h2' mt={matches ? '146px' : '90px'} mb='72px'>
        Your Score: {correctAnswers} / {questionCount}
      </Typography>
      <Button onClick={backToHomeHandler}>Back to home</Button>
    </Stack>
  );
};

export default Score;
