import { useSelector } from "react-redux";

export function useAuthentication() {
  const isAuthenticated = useSelector((store) => store.authentication?.authenticated);
  return {
    isAuthenticated,
  };
}
