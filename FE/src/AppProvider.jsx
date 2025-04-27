import { AuthProvider } from '@/contexts/AuthContext';

const providers = [AuthProvider];

export function AppProvider({ children }) {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
}
