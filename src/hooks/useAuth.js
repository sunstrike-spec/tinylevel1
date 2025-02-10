import { getCurrentUser, setToken } from "../axious";

const useAuth = async () => {
  setToken();
  const res = await getCurrentUser();
  return res.data.role;
};
export default useAuth;
