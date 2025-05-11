import { AuthProvider } from '@/contexts/AuthContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { ItineraryProvider } from '@/contexts/ItineraryContext';
import { TourProvider } from '@/contexts/TourContext';
import { UserProvider } from '@/contexts/UserContext';

const providers = [AuthProvider, UserProvider, TourProvider, ItineraryProvider, BookingProvider];

export function AppProvider({ children }) {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
}
