import { useEffect, useState } from 'react';
import { Character, ResponseApi, Query, AppContext } from '../types';
import { useSearchParams } from 'react-router-dom';

import Api from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { DetailsId } from '../../store/reducers/details-slice';
import { Search } from '../../store/reducers/search-slice';
import { Limit } from '../../store/reducers/limit-slice';
import { Data } from '../../store/reducers/data-slice';
const api: Api = new Api();

const useCreateContext = (): AppContext => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const initId: string = searchParams.get('id') || '';
  const initTerm: string =
    searchParams.get('name') || localStorage.getItem('termForSearching') || '';
  const initLimit: string = searchParams.get('limit') || '10';

  const [itemData, setItemData] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingItem, setLoadingItem] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const [page, setPage] = useState<string>(searchParams.get('page') || '1');
  const [lastPage, setLastPage] = useState<string>('');

  const idCard: string = useAppSelector(DetailsId.select);
  const searchTerm: string = useAppSelector(Search.select);
  const limit: string = useAppSelector(Limit.select);

  const query: Query = {
    name: searchTerm,
    page: page,
    limit: limit,
    id: idCard,
  };

  useEffect((): void => {
    dispatch(DetailsId.set(initId));
  }, [dispatch, initId]);

  useEffect((): void => {
    dispatch(Search.set(initTerm));
  }, [dispatch, initTerm]);

  useEffect((): void => {
    dispatch(Limit.set(initLimit));
  }, [dispatch, initLimit]);

  useEffect((): void => {
    getItemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCard]);

  useEffect((): void => {
    if (Search.init !== searchTerm && Limit.init !== limit) searchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchTerm]);

  async function searchData(): Promise<void> {
    if (loading) return;
    setSearchParams(query);
    setLoading(true);
    try {
      const response: ResponseApi = await api.search(searchTerm, limit, page);
      dispatch(Data.set(response.docs));
      setLastPage(`${response.pages}`);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) setMessageError(error.message);
    }
  }

  async function getItemData(): Promise<void> {
    if (loadingItem) return;
    setSearchParams(query);
    setLoadingItem(true);
    if (!idCard) {
      setItemData([]);
      setLoadingItem(false);
    } else {
      try {
        const response: ResponseApi = await api.getItemByID(idCard);
        setItemData(response.docs);
        setLoadingItem(false);
      } catch (error) {
        if (error instanceof Error) setMessageError(error.message);
      }
    }
  }

  return {
    itemData: itemData,
    page: `${page}`,
    lastPage: `${lastPage}`,
    loading: loading,
    loadingItem: loadingItem,
    messageError: messageError,
    setPage: setPage,
    searchData: searchData,
  };
};

export default useCreateContext;
