import { useBookingDispatch } from "@/contexts/BookingContext";
import { bookingService } from "@/services";

export function useBookingActions() {
    const dispatch = useBookingDispatch();

    const fetchMyBookings = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await bookingService.getMyBookings();
            dispatch({ type: 'SET_BOOKING', payload: response.result });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }
    return { fetchMyBookings };
}

