import { FC } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import type { IScore } from '../../types.ts';

export interface ScoreTableProps {
  data: IScore[];
}

const ScoreTable: FC<ScoreTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
      <Table sx={{ width: '90vw', maxWidth: 650 }} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {new Date(row.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>
                  {row.correctAnswers} / {row.questionCount}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align='center'>
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScoreTable;
