import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: role,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/users/role/${user.email}`);
        return data.role;
      } catch (err) {
        console.error("Error fetching role:", err); // 🔍 See full error
        throw err; // rethrow so React Query handles it properly
      }
    },
  });

  return { role, isLoading, error };
};

export default useRole;
