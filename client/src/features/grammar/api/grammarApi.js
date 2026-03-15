import { baseApi } from '../../../shared/api/baseApi';

export const grammarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGrammarRules: builder.query({
      query: (category) => {
        const params = category ? `?category=${category}` : '';
        return `/grammar${params}`;
      },
      providesTags: ['Grammar'],
    }),
    getGrammarById: builder.query({
      query: (id) => `/grammar/${id}`,
      providesTags: (result, error, id) => [{ type: 'Grammar', id }],
    }),
  }),
});

export const { useGetGrammarRulesQuery, useGetGrammarByIdQuery } = grammarApi;
