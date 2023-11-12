import createFetchMock from 'vitest-fetch-mock';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { data } from '../../mocks';
import App from '../../../components/app';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundry from '../../../components/error-boundry';

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
      <ErrorBoundry>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ErrorBoundry>
    );
    const errorButton: HTMLElement = screen.getByText(/Throw Error/i);
    await userEvent.click(errorButton);
    expect(screen.getByText(/Oops! Something bad happened!/i)).toBeDefined();
  });
});
