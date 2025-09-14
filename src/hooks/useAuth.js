import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { logout, loadUser } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const signOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const refreshUser = useCallback(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    signOut,
    refreshUser,
  };
};
