import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: () => '/quizzes'
        }),
        addQuiz: builder.mutation({
            query: (data) => ({
                url: '/quizzes',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => [
                            ...draft,
                            data
                        ])
                    )

                } catch (error) {
                    console.log(error);
                }
            }
        }),
        editQuiz: builder.mutation({
            query: ({ id, newQuizData }) => ({
                url: `/quizzes/${id}`,
                method: "PATCH",
                body: newQuizData
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: quizData } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getQuizzes", arg.id, (draft) => {
                            return quizData;
                        })
                    );
                    // also update getTasks cashe when task update
                    dispatch(
                        apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
                            return draft.map((item) => (item.id === quizData.id ? quizData : item));
                        })
                    );
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        deleteQuiz: builder.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: "DELETE"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic cache update start

                try {
                    const { data: quizData } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
                            return draft.filter((t) => t.id != arg);
                        })

                    );
                    return quizData;
                }

                // optimistic cache update end
                catch (err) {
                    console.log(err);
                }
            },
        })
    })
})





export const { useGetQuizzesQuery, useAddQuizMutation, useEditQuizMutation, useDeleteQuizMutation } = quizApi;