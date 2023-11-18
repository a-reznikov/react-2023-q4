import { useEffect, useState } from 'react';
import { ResponseApi, Query, AppContext } from '../types';
import { useSearchParams } from 'react-router-dom';

import Api from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Details } from '../../store/reducers/details-slice';
import { Search } from '../../store/reducers/search-slice';
import { Limit } from '../../store/reducers/limit-slice';
import { Data } from '../../store/reducers/data-slice';
import { Pages } from '../../store/reducers/pages-slice';
const api: Api = new Api();

const useCreateContext = (): AppContext => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const initId: string = searchParams.get('id') || '';
  const initTerm: string =
    searchParams.get('name') || localStorage.getItem('termForSearching') || '';
  const initLimit: string = searchParams.get('limit') || '10';
  const initPage: string = searchParams.get('page') || '1';

  const [messageError, setMessageError] = useState<string>('');

  const idCard: string = useAppSelector(Details.id.select);
  const searchTerm: string = useAppSelector(Search.select);
  const limit: string = useAppSelector(Limit.select);
  const page: string = useAppSelector(Pages.page.select);
  const loading: boolean = useAppSelector(Data.loader.select);
  const loadingDetails: boolean = useAppSelector(Details.loader.select);

  const query: Query = {
    name: searchTerm,
    page: page,
    limit: limit,
    id: idCard,
  };

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
    getItemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCard]);

  useEffect((): void => {
    if (
      Search.init !== searchTerm &&
      Limit.init !== limit &&
      Pages.page.init !== page
    )
      searchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchTerm]);

  async function searchData(): Promise<void> {
    if (loading) return;
    setSearchParams(query);
    dispatch(Data.loader.set(true));
    try {
      const response: ResponseApi = await api.search(searchTerm, limit, page);
      dispatch(Data.data.set(response.docs));
      dispatch(Pages.lastPage.set(`${response.pages}`));
      dispatch(Data.loader.set(false));
    } catch (error) {
      if (error instanceof Error) setMessageError(error.message);
    }
  }

  async function getItemData(): Promise<void> {
    if (loadingDetails) return;
    setSearchParams(query);
    dispatch(Details.loader.set(true));
    if (!idCard) {
      dispatch(Details.data.set([]));
      dispatch(Details.loader.set(false));
    } else {
      try {
        const response: ResponseApi = await api.getItemByID(idCard);
        dispatch(Details.data.set(response.docs));
        dispatch(Details.loader.set(false));
      } catch (error) {
        if (error instanceof Error) setMessageError(error.message);
      }
    }
  }

  return {
    messageError: messageError,
  };
};

export default useCreateContext;
