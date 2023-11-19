import { useEffect } from 'react';
import { Query } from '../types';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Message } from '../../store/reducers/message-slice';
import { Details } from '../../store/reducers/details-slice';
import { Search } from '../../store/reducers/search-slice';
import { Limit } from '../../store/reducers/limit-slice';
import { Pages } from '../../store/reducers/pages-slice';
import { Data } from '../../store/reducers/data-slice';
import {
  useGetDataByIdQuery,
  useGetDataQuery,
} from '../../store/reducers/api-slice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const useInitStore = (): void => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const initId: string = searchParams.get('id') || '';
  const initTerm: string =
    searchParams.get('name') || localStorage.getItem('termForSearching') || '';
  const initLimit: string = searchParams.get('limit') || '10';
  const initPage: string = searchParams.get('page') || '1';

  const id: string = useAppSelector(Details.id.select);
  const term: string = useAppSelector(Search.select);
  const limit: string = useAppSelector(Limit.select);
  const page: string = useAppSelector(Pages.page.select);

  const query: Query = { name: term, page: page, limit: limit, id: id };

  const {
    data: dataList,
    error: errorList,
    isLoading: isLoadingList,
    isFetching: isFetchingList,
  } = useGetDataQuery({ term, limit, page }, { skip: !limit });

  const {
    data: dataDetails,
    error: errorDetails,
    isLoading: isLoadingDetails,
    isFetching: isFetchingDetails,
  } = useGetDataByIdQuery(id, { skip: !id });

  useEffect((): void => {
    dispatch(Details.id.set(initId));
  }, [dispatch, initId]);

  useEffect((): void => {
    dispatch(Search.set(initTerm));
  }, [dispatch, initTerm]);

  useEffect((): void => {
    dispatch(Limit.set(initLimit));
  }, [dispatch, initLimit]);

  useEffect((): void => {
    dispatch(Pages.page.set(initPage));
  }, [dispatch, initPage]);

  useEffect((): void => {
    const error: FetchBaseQueryError | SerializedError | undefined =
      errorDetails || errorList;
    if (
      error &&
      'data' in error &&
      typeof error.data === 'object' &&
      error.data &&
      'message' in error.data &&
      typeof error.data.message === 'string'
    ) {
      dispatch(Message.set(error.data.message));
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'error' in error
    ) {
      dispatch(Message.set(error.error));
    }
  }, [dispatch, errorDetails, errorList]);

  useEffect((): void => {
    setSearchParams(query);
    dispatch(Details.loader.set(isLoadingDetails || isFetchingDetails));
    if (!id) {
      dispatch(Details.data.set([]));
      dispatch(Details.loader.set(false));
    } else {
      if (!isFetchingDetails && dataDetails && id)
        dispatch(Details.data.set(dataDetails.docs));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isFetchingDetails, isLoadingDetails, dataDetails]);

  useEffect((): void => {
    setSearchParams(query);
    dispatch(Data.loader.set(isLoadingList || isFetchingList));
    if (!isFetchingList && dataList) {
      dispatch(Data.data.set(dataList.docs));
      dispatch(Pages.lastPage.set(`${dataList.pages}`));
      dispatch(Data.loader.set(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, term, isLoadingList, isFetchingList, dataList]);
};

export default useInitStore;
