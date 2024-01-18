import { FC, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grow,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { ICategories, ICategory } from '../types.ts';

interface PickCategoryProps<T extends string = string> {
  categories: ICategories<T> | null;
  questionsLoading: boolean;
  categoryLoading: boolean;
  scoreHistoryHandler: () => void;
  startQuizHandler: (categoryId: string) => void;
}

const PickCategory: FC<PickCategoryProps> = ({
  categories,
  startQuizHandler,
  scoreHistoryHandler,
  questionsLoading,
  categoryLoading,
}) => {
  const matches = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const onSelectCategory = (e: SelectChangeEvent) => setSelectedCategory(e.target.value);

  const onStart = () => selectedCategory && startQuizHandler(selectedCategory);

  const renderCategories = () => {
    return !categories ? (
      <Typography textAlign='center' mt={2}>
        No available categories.
      </Typography>
    ) : (
      categories.trivia_categories.map((category: ICategory) => (
        <MenuItem value={category.id} key={category.id}>
          {category.name}
        </MenuItem>
      ))
    );
  };

  return (
    <Stack direction='column' alignItems='center'>
      <Typography variant='h1'>Trivia App</Typography>
      <Typography
        variant='h2'
        mt={matches ? '146px' : '90px'}
        mb={matches ? '36px' : '26px'}
      >
        Pick a Category
      </Typography>
      <Grow in autoFocus>
        <Select displayEmpty value={selectedCategory} onChange={onSelectCategory}>
          <MenuItem value=''>Category</MenuItem>
          {categoryLoading ? (
            <Box textAlign='center' mt={2}>
              <CircularProgress />
            </Box>
          ) : (
            renderCategories()
          )}
        </Select>
      </Grow>
      <Stack direction='row' mt='99px' spacing={2}>
        <Box sx={{ position: 'relative' }}>
          <Button disabled={!selectedCategory || questionsLoading} onClick={onStart}>
            Start
          </Button>
          {questionsLoading && (
            <CircularProgress
              size={24}
              sx={{
                color: theme.palette.primary.main,
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
        <Button onClick={scoreHistoryHandler}>Score history</Button>
      </Stack>
    </Stack>
  );
};

export default PickCategory;
