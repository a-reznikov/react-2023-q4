import createFetchMock from 'vitest-fetch-mock';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { data, dataByID } from '../../mocks';
import Home from '@/pages';
import { store } from '@/store/store';

const mockProps = {
  data: data,
  dataDetails: dataByID,
  errorData: 'Test error message',
  isErrorDetails: false,
};

import { Provider } from 'react-redux';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the ErrorBoundary', (): void => {
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
    expect(screen.getByText(/Error test/i)).toBeDefined();
  });
});
