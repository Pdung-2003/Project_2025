import { useItineraryDispatch } from '@/contexts/ItineraryContext';
import { itineraryService } from '@/services';

export function useItineraryActions() {
  const dispatch = useItineraryDispatch();

  const fetchItineraries = async (tourId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await itineraryService.getItinerariesByTourId(tourId);
      dispatch({ type: 'SET_ITINERARIES', payload: response.result });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchItinerary = async (itineraryId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await itineraryService.getItineraryById(itineraryId);
      dispatch({ type: 'SET_ITINERARY', payload: response.result });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return { fetchItineraries, fetchItinerary };
}
