import { apiSlice } from "../api/apiSlice";



export const marksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMark: builder.query({
      query: () => ({
        url: '/assignmentMark'
      })
    }),
    getSingleAssignmentMark: builder.query({
      query: (id) => ({
        url: `/assignmentMark/${id}`
      }),

    }),
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: '/assignmentMark',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getAssignmentMark", undefined, (draft) => [
              ...draft,
              data,
            ])
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, submitAssignmentLink }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: submitAssignmentLink
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: assignmentLink } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getSingleAssignmentMark", arg.id, (draft) => {
              return assignmentLink;
            })
          );
          // also update getTasks cashe when task update
          dispatch(
            apiSlice.util.updateQueryData("getAssignmentMark", undefined, (draft) => {
              return draft.map((item) => (item.id === assignmentLink.id ? assignmentLink : item));
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    deleteAssignmentMark: builder.mutation({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
        method: "DELETE"
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start

        try {
          const { data: assignmentLink } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getAssignmentMark", undefined, (draft) => {
              return draft.filter((t) => t.id != arg);
            })

          );
          return assignmentLink;
        }

        // optimistic cache update end
        catch (err) {
          console.log(err);
        }
      },
    })
  })
})



export const { useGetAssignmentMarkQuery, useGetSingleAssignmentMarkQuery, useAddAssignmentMarkMutation, useDeleteAssignmentMarkMutation, useEditAssignmentMarkMutation } = marksApi;