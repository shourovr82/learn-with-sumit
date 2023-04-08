import { useSelector } from "react-redux";

export const useStudentAuth = () => {
  const studentAuth = useSelector((state) => state?.auth);
  ;
  if (
    studentAuth?.accessToken &&
    studentAuth?.user &&
    studentAuth?.user.role === "student"
  ) {
    return true;
  } else {
    return false;
  }
};
export default useStudentAuth;