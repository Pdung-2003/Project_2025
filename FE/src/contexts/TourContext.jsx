import { DEFAULT_PAGINATION } from '@/constants/app.constant';
import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';

const initialState = {
  tours: [],
  pagination: DEFAULT_PAGINATION,
  totalElements: 0,
  totalPages: 0,
  tour: null,
  filter: null,
  loading: false,
  error: null,
};

// Reducer function
function tourReducer(state, action) {
  switch (action.type) {
    case 'SET_TOURS':
      return {
        ...state,
        tours: action.payload.tours,
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages,
      };
    case 'SET_TOUR':
      return { ...state, tour: action.payload };
    case 'SET_PAGINATION':
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET_INITIAL_STATE':
      return initialState;
    default:
      return state;
  }
}

// Contexts
const TourStateContext = createContext(undefined);
const TourDispatchContext = createContext(undefined);

export function TourProvider({ children }) {
  const [state, dispatch] = useReducer(tourReducer, initialState);

  return (
    <TourStateContext.Provider value={state}>
      <TourDispatchContext.Provider value={dispatch}>{children}</TourDispatchContext.Provider>
    </TourStateContext.Provider>
  );
}

TourProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hooks
export function useTourState() {
  const context = useContext(TourStateContext);
  if (context === undefined) {
    throw new Error('useTourState must be used within a TourProvider');
  }
  return context;
}

export function useTourDispatch() {
  const context = useContext(TourDispatchContext);
  if (context === undefined) {
    throw new Error('useTourDispatch must be used within a TourProvider');
  }
  return context;
}
