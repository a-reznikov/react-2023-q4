import { useEffect, useState } from 'react';
import { Character, ResponseApi, Query, AppContext } from '../types';
import { useSearchParams } from 'react-router-dom';

import Api from '../../services/api';
const api: Api = new Api();

const useCreateContext = (): AppContext => {
  const [searchParams, setSearchParams] = useSearchParams();
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
  const [id, setId] = useState<string>(searchParams.get('id') || '');
  const query: Query = { name: term, page: page, limit: limit, id: id };

  useEffect((): void => {
    searchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  useEffect((): void => {
    getItemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function searchData(): Promise<void> {
    if (loading) return;
    setId('');
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
    if (!id) {
      setItemData([]);
      setLoadingItem(false);
    } else {
      try {
        const response: ResponseApi = await api.getItemByID(id);
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
    id: id,
    limit: limit,
    page: `${page}`,
    lastPage: `${lastPage}`,
    loading: loading,
    loadingItem: loadingItem,
    messageError: messageError,
    setTerm: setTerm,
    setLimit: setLimit,
    setPage: setPage,
    setId: setId,
    searchData: searchData,
  };
};

export default useCreateContext;
