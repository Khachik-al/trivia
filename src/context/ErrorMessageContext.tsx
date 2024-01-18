import { createContext, ReactNode, Dispatch, SetStateAction, useState } from 'react';

interface ErrorContextProps {
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  clearErrorMessage: () => void;
}

const ErrorMessageContext = createContext<ErrorContextProps>({
  errorMessage: null,
  setErrorMessage: () => {},
  clearErrorMessage: () => {},
});

interface ErrorProviderProps {
  children: ReactNode;
}

function ErrorProvider({ children }: ErrorProviderProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  return (
    <ErrorMessageContext.Provider
      value={{ errorMessage, setErrorMessage, clearErrorMessage }}
    >
      {children}
    </ErrorMessageContext.Provider>
  );
}

export { ErrorProvider, ErrorMessageContext };
