import { useRoleDispatch } from '@/contexts/RoleContext';
import { getRoles } from '@/services/role.service';

export function useRoleActions() {
  const dispatch = useRoleDispatch();

  const fetchRoles = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await getRoles();
      dispatch({ type: 'SET_ROLES', payload: response.result });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return {
    fetchRoles,
  };
}
