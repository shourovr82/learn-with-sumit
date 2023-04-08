import { useSelector } from "react-redux";

export const useAdminAuth = () => {
  const adminAuth = useSelector((state) => state.authAdmin);

  if (
    adminAuth?.accessToken &&
    adminAuth?.user &&
    adminAuth?.user.role === "admin"
  ) {
    return true;
  } else {
    return false;
  }
};
export default useAdminAuth;