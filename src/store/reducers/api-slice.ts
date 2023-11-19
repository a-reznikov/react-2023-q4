import { ApiKeys, ResponseApi } from '../../components/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type SearchQuery = {
  term: string;
  limit: string;
  page: string;
};

function setInfoForField(field: string) {
  return !field || field === 'NaN' ? `no info` : field;
}

function transformData(data: ResponseApi): ResponseApi {
  return {
    ...data,
    docs: data.docs.map(
      ({
        _id,
        birth,
        death,
        gender,
        hair,
        height,
        name,
        race,
        realm,
        spouse,
        wikiUrl,
      }) => {
        return {
          _id: _id,
          birth: setInfoForField(birth),
          death: setInfoForField(death),
          gender: setInfoForField(gender),
          hair: setInfoForField(hair),
          height: setInfoForField(height),
          name: setInfoForField(name),
          race: setInfoForField(race),
          realm: setInfoForField(realm),
          spouse: setInfoForField(spouse),
          wikiUrl: setInfoForField(wikiUrl),
        };
      }
    ),
  };
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://the-one-api.dev/v2',
    prepareHeaders: (headers) => {
      headers.set('accept', 'application/json');
      headers.set('authorization', `Bearer ${ApiKeys.main}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getData: builder.query<ResponseApi, SearchQuery>({
      query: ({ term, limit, page }) =>
        `/character?name=/${term}/i&page=${page || '1'}&limit=${limit || '10'}`,
      transformResponse: (response: ResponseApi) => transformData(response),
    }),
    getDataById: builder.query<ResponseApi, string>({
      query: (id) => `/character/${id}`,
      transformResponse: (response: ResponseApi) => transformData(response),
    }),
  }),
});

export const { useGetDataQuery, useGetDataByIdQuery } = apiSlice;
