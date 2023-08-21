import React, {
  createContext, useReducer, useEffect, useMemo
} from 'react';
import Reducer from './Reducer';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false
};

export const Context = createContext(initialState);

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  const userValue = useMemo(() => ({
    user: state.user,
    isFetching: state.isFetching,
    error: state.error,
    dispatch
  }), []);
  return (
    <Context.Provider
      value={userValue}
    >
      {children}
    </Context.Provider>
  );
}
