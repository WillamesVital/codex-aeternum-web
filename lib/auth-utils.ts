import { useAuth } from "@/contexts/AuthContext";
import { User } from "@supabase/supabase-js";

/**
 * Hook to check if the current user is a Master.
 * Wraps useAuth for convenience.
 * Currently, any logged-in user is considered a Master.
 */
export const useIsMaster = () => {
  const { user, isLoading } = useAuth();

  // Temporary: Any logged in user is a master
  const isMasterUser = !!user;

  return {
    isMaster: isMasterUser,
    isLoaded: !isLoading,
    isSignedIn: !!user
  };
};

export const isMaster = (user: User | null): boolean => {
  return !!user;
}
