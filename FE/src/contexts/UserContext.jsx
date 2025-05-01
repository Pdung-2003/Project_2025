import PropTypes from 'prop-types';
import { createContext, useReducer, useContext } from 'react';

const initialState = {
  isLoading: false,
  users: [],
  user: null,
  error: null,
};

// Reducer function
function userReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'DELETE_USER':
      return { ...state, users: state.users.filter((user) => user.id !== action.payload) };
    default:
      return state;
  }
}

// Contexts
const UserStateContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hooks
export function useUserState() {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within an UserProvider');
  }
  return context;
}

export function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within an UserProvider');
  }
  return context;
}
