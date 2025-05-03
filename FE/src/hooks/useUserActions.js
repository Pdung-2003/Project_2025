import { useUserDispatch } from "@/contexts/UserContext";
import { userService } from "@/services";

export function useUserActions() {
    const dispatch = useUserDispatch();

    const fetchUsers = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const res = await userService.getUsers();
            dispatch({ type: 'SET_USERS', payload: res.result });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const deleteUser = async (id) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await userService.deleteUser(id);
            dispatch({ type: 'DELETE_USER', payload: id });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const createUser = async (user) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await userService.createUser(user);
            fetchUsers();
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const updateUser = async (id, user) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await userService.updateUser(id, user);
            fetchUsers();
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const getUserById = async (id) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const res = await userService.getUserById(id);
            dispatch({ type: 'SET_USER', payload: res.result });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    return { fetchUsers, deleteUser, createUser, updateUser, getUserById };
}
