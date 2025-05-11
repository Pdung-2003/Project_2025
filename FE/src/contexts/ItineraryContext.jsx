import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';

const initialState = {
  itineraries: [],
  itinerary: null,
  loading: false,
  error: null,
};

function itineraryReducer(state, action) {
  switch (action.type) {
    case 'SET_ITINERARIES':
      return { ...state, itineraries: action.payload };
    case 'SET_ITINERARY':
      return { ...state, itinerary: action.payload };
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
const ItineraryStateContext = createContext(undefined);
const ItineraryDispatchContext = createContext(undefined);

export function ItineraryProvider({ children }) {
  const [state, dispatch] = useReducer(itineraryReducer, initialState);

  return (
    <ItineraryStateContext.Provider value={state}>
      <ItineraryDispatchContext.Provider value={dispatch}>
        {children}
      </ItineraryDispatchContext.Provider>
    </ItineraryStateContext.Provider>
  );
}

ItineraryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hooks
export function useItineraryState() {
  const context = useContext(ItineraryStateContext);
  if (context === undefined) {
    throw new Error('useItineraryState must be used within an ItineraryProvider');
  }
  return context;
}

export function useItineraryDispatch() {
  const context = useContext(ItineraryDispatchContext);
  if (context === undefined) {
    throw new Error('useItineraryDispatch must be used within an ItineraryProvider');
  }
  return context;
}
