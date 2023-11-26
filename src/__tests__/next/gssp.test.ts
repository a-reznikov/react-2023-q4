import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { data, dataByID } from '../mocks';
import { getServerSideProps } from '@/pages';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';
import { ResponseApi } from '@/components/types';

interface mockPropsType {
  data: ResponseApi;
  dataDetails: ResponseApi;
  errorData: string;
  isErrorDetails: boolean;
}

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

async function getMockGSSP(id: string): Promise<mockPropsType> {
  fetchMocker.mockResponse(JSON.stringify(data));
  const context = {
    query: {
      page: '1',
      limit: '10',
      id: id,
    } as ParsedUrlQuery,
  };
  const mockProps: mockPropsType = {
    data: data,
    dataDetails: dataByID,
    errorData: '',
    isErrorDetails: false,
  };

  const value = await getServerSideProps(context as GetServerSidePropsContext);

  if ('props' in value) {
    const props = value.props as mockPropsType;
    const mockProps = {
      data: props.data,
      dataDetails: props.dataDetails,
      errorData: props.errorData,
      isErrorDetails: props.isErrorDetails,
    };
    return mockProps;
  }
  return mockProps;
}

describe('Tests for the getServerSideProps', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Validate that getServerSideProps return correct data', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));
    const props = await getMockGSSP('');
    expect(props.data.docs).toHaveLength(3);
    expect(props.dataDetails).toBeNull();
    expect(props.errorData).toEqual('');
    expect(props.isErrorDetails).toBeFalsy();
    const propsWithDetails = await getMockGSSP('5cd99d4bde30eff6ebccfea0');
    expect(propsWithDetails.dataDetails).not.toBeNull();
    expect(propsWithDetails.dataDetails).toBeDefined();
  });
});
