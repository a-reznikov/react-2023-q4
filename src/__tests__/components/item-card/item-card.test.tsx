import createFetchMock from 'vitest-fetch-mock';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

import { data } from '../../mocks';
import App from '../../../components/app';
import { MemoryRouter } from 'react-router-dom';
import ItemCard from '../../../components/item-card';
import { characterTransform } from '../../mocks';
import { Details } from '../../../store/reducers/details-slice';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the Card component', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Validate that clicking on a card opens a detailed card component', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    const items: HTMLElement[] = await screen.findAllByTestId('item-card');
    expect(screen.queryByTestId('item-details')).toBeNull();
    await userEvent.click(items[0]);
    expect(screen.queryByTestId('item-details')).toBeDefined();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(fetchMocker).toHaveBeenCalledTimes(0);
    const items: HTMLElement[] = await screen.findAllByTestId('item-card');
    await userEvent.click(items[1]);
    expect(fetchMocker).toHaveBeenCalledTimes(1);
    expect(fetchMocker.requests()[0].url).toEqual(
      `https://the-one-api.dev/v2/character/5cd99d4bde30eff6ebccfd8a`
    );
  });
});

const { name, gender, race, birth } = characterTransform;

describe('Tests for the Card component', () => {
  test('Ensure that the card component renders the relevant card data', () => {
    render(
      <Provider store={store}>
        <ItemCard character={characterTransform} />
      </Provider>
    );
    expect(screen.getByText(`${name}`)).toBeDefined();
    expect(screen.getByText(`Gender: ${gender}`)).toBeDefined();
    expect(screen.getByText(`Race: ${race}`)).toBeDefined();
    expect(screen.getByText(`Birth: ${birth}`)).toBeDefined();
  });

  test('Check that clicking triggers setId with current id card', async () => {
    afterEach((): void => {
      vi.restoreAllMocks();
    });
    const spy = vi.spyOn(Details.id, 'set');
    render(
      <Provider store={store}>
        <ItemCard character={characterTransform} />
      </Provider>
    );

    await userEvent.click(screen.getByTestId('item-card'));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(characterTransform._id);
  });
});
