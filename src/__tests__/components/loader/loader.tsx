import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { data, dataByID } from '../../mocks';
import App from '../../../components/app';
import { MemoryRouter } from 'react-router-dom';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the Loader', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Check that a loading indicator is displayed while fetching data for ListItem', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('loader')).toBeDefined();
    await screen.findAllByTestId('item-card');
    expect(screen.queryByTestId('loader')).toBeNull();
  });

  test('Check that a loading indicator is displayed while fetching data for Detailed Card', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const items = await screen.findAllByTestId('item-card');
    fetchMocker.mockResponse(JSON.stringify(dataByID));
    expect(screen.queryByTestId('loader')).toBeNull();
    userEvent.click(items[1]);
    const loader: HTMLElement = await screen.findByTestId('loader');
    expect(loader).toBeDefined();
    await screen.findByTestId('item-details');
    expect(screen.queryByTestId('loader')).toBeNull();
  });
});
