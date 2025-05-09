import PropTypes from 'prop-types';
import { createContext, useReducer, useContext } from 'react';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Reducer function
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload);
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, isAuthenticated: false, user: null };
    case 'SET_USER':
      return { ...state, isAuthenticated: !!action.payload, user: action.payload };
    case 'AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
}

// Contexts
const AuthStateContext = createContext(undefined);
const AuthDispatchContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hooks
export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return context;
}
