import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

function roleReducer(state, action) {
  switch (action.type) {
    case 'SET_ROLES':
      return { ...state, roles: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

// Contexts
const RoleStateContext = createContext(undefined);
const RoleDispatchContext = createContext(undefined);

export function RoleProvider({ children }) {
  const [state, dispatch] = useReducer(roleReducer, initialState);

  return (
    <RoleStateContext.Provider value={state}>
      <RoleDispatchContext.Provider value={dispatch}>{children}</RoleDispatchContext.Provider>
    </RoleStateContext.Provider>
  );
}

RoleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hooks
export function useRoleState() {
  const context = useContext(RoleStateContext);
  if (!context) throw new Error('useRoleState must be used within a RoleProvider');
  return context;
}

export function useRoleDispatch() {
  const context = useContext(RoleDispatchContext);
  if (!context) throw new Error('useRoleDispatch must be used within a RoleProvider');
  return context;
}
