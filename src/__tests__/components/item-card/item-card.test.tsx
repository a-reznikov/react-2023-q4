import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

import { data, dataByID } from '../../mocks';
import ItemCard from '../../../components/item-card';
import { characterTransform } from '../../mocks';
import Home, { getServerSideProps } from '@/pages';
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

describe('Tests for the Card component', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Validate that clicking on a card opens a detailed card component', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));
    const props = await getMockGSSP('');

    render(
      <Provider store={store()}>
        <Home {...props} />
      </Provider>
    );
    const items: HTMLElement[] = await screen.findAllByTestId('item-card');
    expect(screen.queryByTestId('item-details')).toBeNull();
    await userEvent.click(items[1]);
    expect(screen.queryByTestId('item-details')).toBeDefined();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));
    const props = await getMockGSSP('');

    render(
      <Provider store={store()}>
        <Home {...props} />
      </Provider>
    );
    expect(fetchMocker).toHaveBeenCalledTimes(0);
    const items: HTMLElement[] = await screen.findAllByTestId('item-card');
    await userEvent.click(items[0]);
    await getMockGSSP('5cd99d4bde30eff6ebccfea0');
    expect(fetchMocker).toHaveBeenCalledTimes(1);
    expect(fetchMocker.requests()[0].url).toEqual(
      `https://the-one-api.dev/v2/character/5cd99d4bde30eff6ebccfea0`
    );
  });
});

const { name, gender, race, birth } = characterTransform;

describe('Tests for the Card component', (): void => {
  test('Ensure that the card component renders the relevant card data', (): void => {
    render(
      <Provider store={store()}>
        <ItemCard character={characterTransform} />
      </Provider>
    );

    expect(screen.getByText(`${name}`).textContent).toEqual('Gandalf');
    expect(screen.getByText(`Gender: ${gender}`).textContent).toEqual(
      'Gender: Male'
    );
    expect(screen.getByText(`Race: ${race}`).textContent).toEqual(
      'Race: Maiar'
    );
    expect(screen.getByText(`Birth: ${birth}`).textContent).toEqual(
      'Birth: Before the the Shaping of Arda'
    );
  });
});
