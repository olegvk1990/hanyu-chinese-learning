import { baseApi } from '../../../shared/api/baseApi';

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Categories'],
    }),
    getCategoryWords: builder.query({
      query: ({ slug, difficulty, page, limit }) => {
        const params = new URLSearchParams();
        if (difficulty) params.append('difficulty', difficulty);
        if (page != null) params.append('page', page);
        if (limit != null) params.append('limit', limit);
        const query = params.toString();
        return `/categories/${slug}/words${query ? `?${query}` : ''}`;
      },
      providesTags: (result, error, { slug }) => [{ type: 'Words', id: slug }],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryWordsQuery } = categoriesApi;
