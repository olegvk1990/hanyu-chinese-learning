import { baseApi } from '../../../shared/api/baseApi';

export const cardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudyCards: builder.query({
      query: ({ categorySlug, difficulty }) => {
        const params = difficulty ? `?difficulty=${difficulty}` : '';
        return `/words/study/${categorySlug}${params}`;
      },
      providesTags: (result, error, { categorySlug }) => [
        { type: 'Words', id: categorySlug },
      ],
    }),
    getWordById: builder.query({
      query: (id) => `/words/${id}`,
      providesTags: (result, error, id) => [{ type: 'Words', id }],
    }),
  }),
});

export const { useGetStudyCardsQuery, useGetWordByIdQuery } = cardsApi;
