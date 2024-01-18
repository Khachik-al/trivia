import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import theme from './theme.tsx';
import App from './App';
import { ErrorProvider } from './context/ErrorMessageContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ErrorProvider>,
);
