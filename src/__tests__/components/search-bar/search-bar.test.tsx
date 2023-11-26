import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

import { data, mockProps } from '../../mocks';
import Home from '@/pages';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the Search component', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Verify that clicking the Search button saves the entered value to the local storage', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));
    render(
      <Provider store={store()}>
        <Home {...mockProps} />
      </Provider>
    );

    const searchButton: HTMLElement = screen.getByTestId('search-button');
    const searchInput: HTMLInputElement = screen.getByTestId('search-input');
    await userEvent.type(searchInput, 'Frodo');
    await userEvent.click(searchButton);
    expect(localStorage.getItem('termForSearching')).toEqual('Frodo');
  });
});
