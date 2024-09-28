import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  if (error)
    throw new error("there is some issue in the useUser checked it out");
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
