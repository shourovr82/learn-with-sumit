import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAssignment: builder.query({
            query: () => ({
                url: '/assignments'
            })
        }),
        getSingleAssignment: builder.query({
            query: (id) => ({
                url: `/assignments/${id}`
            }),

        }),
        getAssignmentMark: builder.query({
            query: () => ({
                url: '/assignmentMark'
            })
        }),
        addAssignment: builder.mutation({
            query: (data) => ({
                url: '/assignments',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData("getAssignment", undefined, (draft) => [
                            ...draft,
                            data,
                        ])
                    );
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        editAssignment: builder.mutation({
            query: ({ id, submitAssignment }) => ({
                url: `/assignments/${id}`,
                method: "PATCH",
                body: submitAssignment
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: assignment } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getSingleAssignment", arg.id, (draft) => {
                            return assignment;
                        })
                    );
                    // also update getTasks cashe when task update
                    dispatch(
                        apiSlice.util.updateQueryData("getAssignment", undefined, (draft) => {
                            return draft.map((item) => (item.id === assignment.id ? assignment : item));
                        })
                    );
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        deleteAssignment: builder.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: "DELETE"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic cache update start

                try {
                    const { data: assignment } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData("getAssignment", undefined, (draft) => {
                            return draft.filter((t) => t.id != arg);
                        })

                    );
                    return assignment;
                }

                // optimistic cache update end
                catch (err) {
                    console.log(err);
                }
            },
        }),

    })
})


export const { useGetAssignmentQuery, useGetAssignmentMarkQuery, useAddAssignmentMutation, useEditAssignmentMutation, useDeleteAssignmentMutation, useGetSingleAssignmentQuery } = assignmentApi;