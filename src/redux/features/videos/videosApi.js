import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => ({
                url: '/videos'
            })
        }),
        getSingleVideo: builder.query({
            query: (id) => ({
                url: `/videos/${id}`
            }),

        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData("getVideos", undefined, (draft) => [
                            ...draft,
                            data,
                        ])
                    );
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        editVideo: builder.mutation({
            query: ({ videoId, submitVideo }) => ({
                url: `/videos/${videoId}`,
                method: "PATCH",
                body: submitVideo
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data: video } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData("getSingleVideo", arg.id, (draft) => {
                            return video;
                        })
                    );
                    // also update getTasks cashe when task update
                    dispatch(
                        apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                            return draft.map((item) => (item.id === video.id ? video : item));
                        })
                    );
                } catch (err) {
                    console.log(err);
                }
            },


        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: "DELETE"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // optimistic cache update start

                try {
                    const { data: video } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                            return draft.filter((t) => t.id != arg);
                        })

                    );
                    return video;
                }

                // optimistic cache update end
                catch (err) {
                    console.log(err);
                }
            },
        })
    })
})


export const { useGetVideosQuery, useGetSingleVideoQuery, useAddVideoMutation, useEditVideoMutation, useDeleteVideoMutation } = videosApi;