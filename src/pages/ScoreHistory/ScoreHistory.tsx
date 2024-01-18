import { FC } from 'react';

import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material';

import ScoreTable from './ScoreTable.tsx';
import { getLocalStorageArray } from '../../utils.ts';
import type { IScore } from '../../types.ts';

interface ScoreHistoryProps {
  backToHomeHandler: () => void;
}

const ScoreHistory: FC<ScoreHistoryProps> = ({ backToHomeHandler }) => {
  const matches = useMediaQuery('(min-width:600px)');
  const scores: IScore[] = getLocalStorageArray('scoreHistory');

  return (
    <Stack direction='column' alignItems='center'>
      <Typography variant='h1'>Score History</Typography>
      <Box maxWidth={1200} my={matches ? '50px' : '35px'}>
        <ScoreTable data={scores} />
      </Box>
      <Button onClick={backToHomeHandler}>Back to home</Button>
    </Stack>
  );
};

export default ScoreHistory;
