import { useEffect, useState } from 'react';
import { Character, ResponseApi, Query, AppContext } from '../types';
import { useSearchParams } from 'react-router-dom';

import Api from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setDetailsId } from '../../store/reducers/detailsSlice';
const api: Api = new Api();

const useCreateContext = (): AppContext => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const [term, setTerm] = useState<string>(
    searchParams.get('name') || localStorage.getItem('termForSearching') || ''
  );
  const [data, setData] = useState<Character[]>([]);
  const [itemData, setItemData] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingItem, setLoadingItem] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const [limit, setLimit] = useState<string>(searchParams.get('limit') || '10');
  const [page, setPage] = useState<string>(searchParams.get('page') || '1');
  const [lastPage, setLastPage] = useState<string>('');
  const [startId] = useState<string>(searchParams.get('id') || '');
  const idCard: string = useAppSelector((state) => state.details.value);
  const query: Query = {
    name: term,
    page: page,
    limit: limit,
    id: idCard,
  };

  useEffect((): void => {
    dispatch(setDetailsId(startId));
  }, [dispatch, startId]);

  useEffect((): void => {
    searchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  useEffect((): void => {
    getItemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCard]);

  async function searchData(): Promise<void> {
    if (loading) return;
    setSearchParams(query);
    setLoading(true);
    localStorage.setItem('termForSearching', term);
    try {
      const response: ResponseApi = await api.search(term, limit, page);
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
    term: term,
    data: data,
    itemData: itemData,
    limit: limit,
    page: `${page}`,
    lastPage: `${lastPage}`,
    loading: loading,
    loadingItem: loadingItem,
    messageError: messageError,
    setTerm: setTerm,
    setLimit: setLimit,
    setPage: setPage,
    searchData: searchData,
  };
};

export default useCreateContext;
