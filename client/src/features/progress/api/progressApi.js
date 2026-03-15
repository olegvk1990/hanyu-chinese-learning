import { baseApi } from '../../../shared/api/baseApi';

export const progressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => '/progress/stats',
      providesTags: ['Progress'],
    }),
    updateProgress: builder.mutation({
      query: ({ wordId, status, correct }) => ({
        url: `/progress/${wordId}`,
        method: 'POST',
        body: status != null || correct != null ? { status, correct } : undefined,
      }),
      invalidatesTags: ['Progress'],
    }),
    getReviewCards: builder.query({
      query: () => '/progress/review',
      providesTags: ['Progress'],
    }),
    getLearnedWords: builder.query({
      query: () => '/progress/learned',
      providesTags: ['Progress'],
    }),
  }),
});

export const {
  useGetStatsQuery,
  useUpdateProgressMutation,
  useGetReviewCardsQuery,
  useGetLearnedWordsQuery,
} = progressApi;
