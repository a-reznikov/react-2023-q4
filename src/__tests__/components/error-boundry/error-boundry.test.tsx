import createFetchMock from 'vitest-fetch-mock';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { data, dataByID } from '../../mocks';
import Home from '@/pages';
import { store } from '@/store/store';

const mockProps = {
  data: data,
  dataDetails: dataByID,
  errorData: '',
  isErrorDetails: false,
};

import '@/styles/globals.css';
import { Provider } from 'react-redux';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the ErrorBoundry', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Verify that caching throw Error', async (): Promise<void> => {
    afterEach((): void => {
      vi.restoreAllMocks();
    });
    fetchMocker.mockResponse(JSON.stringify(data));
    vi.spyOn(console, 'error').mockImplementation(() => null);

    render(
      <Provider store={store()}>
        <Home {...mockProps} />
      </Provider>
    );
    const errorButton: HTMLElement = screen.getByText(/Throw Error/i);
    await userEvent.click(errorButton);
    expect(screen.getByText(/Oops! Something bad happened!/i)).toBeDefined();
  });
});
