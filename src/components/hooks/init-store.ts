import { useEffect } from 'react';
import { ResponseApi, Query } from '../types';
import { useSearchParams } from 'react-router-dom';

import Api from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Message } from '../../store/reducers/message-slice';
import { Details } from '../../store/reducers/details-slice';
import { Search } from '../../store/reducers/search-slice';
import { Limit } from '../../store/reducers/limit-slice';
import { Pages } from '../../store/reducers/pages-slice';
import { Data } from '../../store/reducers/data-slice';
import { useGetDataByIdQuery } from '../../store/reducers/api-slice';
const api: Api = new Api();

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
  const loading: boolean = useAppSelector(Data.loader.select);
  const {
    data: dataDetails,
    isLoading: isLoadingDetails,
    isFetching: isFetchingDetails,
  } = useGetDataByIdQuery(id);

  const query: Query = { name: term, page: page, limit: limit, id: id };

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
    if (isLoadingDetails) return;
    setSearchParams(query);
    dispatch(Details.loader.set(isFetchingDetails));
    if (!id) {
      dispatch(Details.data.set([]));
      dispatch(Details.loader.set(false));
    } else {
      if (!isFetchingDetails && dataDetails && id)
        dispatch(Details.data.set(dataDetails.docs));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDetails, id, isFetchingDetails, isLoadingDetails]);

  useEffect((): void => {
    if (
      Search.init !== term &&
      Limit.init !== limit &&
      Pages.page.init !== page
    )
      searchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, term]);

  async function searchData(): Promise<void> {
    if (loading) return;
    setSearchParams(query);
    dispatch(Data.loader.set(true));
    try {
      const response: ResponseApi = await api.search(term, limit, page);
      dispatch(Data.data.set(response.docs));
      dispatch(Pages.lastPage.set(`${response.pages}`));
      dispatch(Data.loader.set(false));
    } catch (error) {
      if (error instanceof Error) dispatch(Message.set(error.message));
    }
  }
};

export default useInitStore;
