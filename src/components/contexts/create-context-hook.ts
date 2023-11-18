import { useEffect, useState } from 'react';
import { Character, ResponseApi, Query, AppContext } from '../types';
import { useSearchParams } from 'react-router-dom';

import Api from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectDetails,
  setDetailsId,
} from '../../store/reducers/details-slice';
import {
  selectSearch,
  setSearch,
  initSearchStateValue,
} from '../../store/reducers/search-slice';
const api: Api = new Api();

const useCreateContext = (): AppContext => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const initId: string = searchParams.get('id') || '';
  const initTerm: string =
    searchParams.get('name') || localStorage.getItem('termForSearching') || '';
  const [data, setData] = useState<Character[]>([]);
  const [itemData, setItemData] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingItem, setLoadingItem] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const [limit, setLimit] = useState<string>(searchParams.get('limit') || '10');
  const [page, setPage] = useState<string>(searchParams.get('page') || '1');
  const [lastPage, setLastPage] = useState<string>('');

  const idCard: string = useAppSelector(selectDetails);
  const searchTerm: string = useAppSelector(selectSearch);
  const query: Query = {
    name: searchTerm,
    page: page,
    limit: limit,
    id: idCard,
  };

  useEffect((): void => {
    dispatch(setSearch(initTerm));
    dispatch(setDetailsId(initId));
  }, [dispatch, initId, initTerm]);

  useEffect((): void => {
    getItemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCard]);

  useEffect((): void => {
    if (initSearchStateValue !== searchTerm) searchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchTerm]);

  async function searchData(): Promise<void> {
    if (loading) return;
    setSearchParams(query);
    setLoading(true);
    try {
      const response: ResponseApi = await api.search(searchTerm, limit, page);
      setData(response.docs);
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
    data: data,
    itemData: itemData,
    limit: limit,
    page: `${page}`,
    lastPage: `${lastPage}`,
    loading: loading,
    loadingItem: loadingItem,
    messageError: messageError,
    setLimit: setLimit,
    setPage: setPage,
    searchData: searchData,
  };
};

export default useCreateContext;
