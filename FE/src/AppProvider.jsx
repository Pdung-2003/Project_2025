import { AuthProvider } from '@/contexts/AuthContext';
import { TourProvider } from '@/contexts/TourContext';
import { UserProvider } from '@/contexts/UserContext';

const providers = [AuthProvider, UserProvider, TourProvider];

export function AppProvider({ children }) {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
}
