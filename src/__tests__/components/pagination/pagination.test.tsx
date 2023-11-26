import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

import { dataFirstPage, mockProps } from '../../mocks';
import Home from '@/pages';
import mockRouter from 'next-router-mock';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the Pagination component', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Make sure the component updates URL query parameter when page changes', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(dataFirstPage));

    const mockData = { ...mockProps, data: dataFirstPage };

    render(
      <Provider store={store()}>
        <Home {...mockData} />
      </Provider>
    );

    const pageNextButton: HTMLElement = await screen.findByTestId('page-next');
    const pagePrevButton: HTMLElement = await screen.findByTestId('page-prev');
    await userEvent.click(pageNextButton);
    expect(mockRouter.query.page).toEqual('2');
    await userEvent.click(pageNextButton);
    expect(mockRouter.query.page).toEqual('3');
    await userEvent.click(pagePrevButton);
    expect(mockRouter.query.page).toEqual('2');
    await userEvent.click(pagePrevButton);
    expect(mockRouter.query.page).toEqual('1');
  });
});
