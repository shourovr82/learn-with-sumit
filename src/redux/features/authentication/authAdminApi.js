import { apiSlice } from "../api/apiSlice";
import { adminLogin } from "./authAdminSlice";

export const authAdminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login
    adminLoggedIn: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "authAdmin",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          dispatch(
            adminLogin({
              accessToken: result?.data?.accessToken,
              user: result?.data?.user,
            })
          );
        } catch (err) {
        }
      },
    }),

  })
})


export const { useAdminLoggedInMutation } = authAdminApi;