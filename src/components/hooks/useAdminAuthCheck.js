import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../redux/features/authentication/authAdminSlice";

export default function useAdminAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const localAuth = localStorage?.getItem('authAdmin');
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          adminLogin({
            accessToken: auth.accessToken,
            user: auth.user
          })
        )
      }
    }
    setAuthChecked(true);

  }, [dispatch, setAuthChecked])
  return authChecked;
}