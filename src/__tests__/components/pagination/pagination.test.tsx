import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { dataFirstPage } from '../../mocks';
import App from '../../../components/app';
import { BrowserRouter } from 'react-router-dom';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the Pagination component', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Make sure the component updates URL query parameter when page changes', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(dataFirstPage));

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const pageNextButton: HTMLElement = await screen.findByTestId('page-next');
    const pagePrevButton: HTMLElement = await screen.findByTestId('page-prev');
    expect(screen.queryByTestId('item-details')).toBeNull();
    expect(location.search.includes('page=1')).toBeTruthy();
    await userEvent.click(pageNextButton);
    expect(location.search.includes('page=1')).toBeFalsy();
    expect(location.search.includes('page=2')).toBeTruthy();
    await userEvent.click(pageNextButton);
    expect(location.search.includes('page=3')).toBeTruthy();
    await userEvent.click(pagePrevButton);
    expect(location.search.includes('page=2')).toBeTruthy();
    await userEvent.click(pagePrevButton);
    expect(location.search.includes('page=1')).toBeTruthy();
    expect(location.search.includes('page=2')).toBeFalsy();
    expect(location.search.includes('page=3')).toBeFalsy();
    expect(location.search.includes('page=0')).toBeFalsy();
  });
});
