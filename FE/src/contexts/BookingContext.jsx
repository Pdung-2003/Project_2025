import { DEFAULT_PAGINATION } from '@/constants/app.constant';
import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';

const initialState = {
  booking: [],
  pagination: DEFAULT_PAGINATION,
  filter: {
    fromDate: null,
    toDate: null,
    status: '',
  },
  totalElements: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'SET_BOOKING':
      return {
        ...state,
        booking: action.payload.bookings,
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages,
      };
    case 'SET_PAGINATION':
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
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

const BookingStateContext = createContext(undefined);
const BookingDispatchContext = createContext(undefined);

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingStateContext.Provider value={state}>
      <BookingDispatchContext.Provider value={dispatch}>{children}</BookingDispatchContext.Provider>
    </BookingStateContext.Provider>
  );
}

BookingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useBookingState() {
  const context = useContext(BookingStateContext);
  if (context === undefined) {
    throw new Error('useBookingState must be used within a BookingProvider');
  }
  return context;
}

export function useBookingDispatch() {
  const context = useContext(BookingDispatchContext);
  if (context === undefined) {
    throw new Error('useBookingDispatch must be used within a BookingProvider');
  }
  return context;
}
