import { useTourDispatch } from '@/contexts/TourContext';
import { tourService } from '@/services';

export function useTourActions() {
  const dispatch = useTourDispatch();

  const fetchTours = async (body) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await tourService.getTours(body);

      dispatch({
        type: 'SET_TOURS',
        payload: {
          tours: response?.result,
          totalElements: response?.pagination?.totalElements,
          totalPages: response?.pagination?.totalPages,
        },
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const fetchTourById = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await tourService.getTourById(id);
      dispatch({ type: 'SET_TOUR', payload: response?.result });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return { fetchTours, fetchTourById };
}
