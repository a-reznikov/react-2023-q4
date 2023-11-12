import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItemList from '../../../components/item-list';
import { Context } from '../../../components/contexts';
import { context, contextEmptyData, dataWithTwoCharacter } from '../../mocks';

import { data } from '../../mocks';
import App from '../../../components/app';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the Card List component', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Verify that the component renders the specified number of cards', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const threeItems: HTMLElement[] = await screen.findAllByTestId('item-card');
    expect(threeItems.length).toBe(3);

    fetchMocker.mockResponse(JSON.stringify(dataWithTwoCharacter));
    const setLimitButton: HTMLElement = screen.getByTestId('set-limit');
    const setLimitInput: HTMLInputElement = screen.getByTestId('limit-input');
    await userEvent.type(setLimitInput, '2');
    await userEvent.click(setLimitButton);
    const twoItems: HTMLElement[] = await screen.findAllByTestId('item-card');
    expect(twoItems.length).toBe(2);
  });
});

describe('Tests for the Card List component', () => {
  test('Check that an appropriate message is displayed if no cards are present.', () => {
    render(
      <Context.Provider value={contextEmptyData}>
        <ItemList />
      </Context.Provider>
    );

    expect(
      screen.queryByText(/Oops. There is no such character in our database./i)
    ).toBeDefined();
  });

  test('Verify static number of cards', async () => {
    render(
      <Context.Provider value={context}>
        <ItemList />
      </Context.Provider>
    );
    const items: HTMLElement[] = await screen.findAllByTestId('item-card');
    expect(items.length).toBe(3);
  });
});
