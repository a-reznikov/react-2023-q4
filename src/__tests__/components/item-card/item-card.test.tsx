import createFetchMock from 'vitest-fetch-mock';
import {
  SpyInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { data } from '../../mocks';
import App from '../../../components/app';
import { MemoryRouter } from 'react-router-dom';
import ItemCard from '../../../components/item-card';
import { Context } from '../../../components/contexts';
import { characterTransform, context } from '../../mocks';

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
        <App />
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
        <App />
      </MemoryRouter>
    );

    expect(fetchMocker).toHaveBeenCalledTimes(1);
    const items: HTMLElement[] = await screen.findAllByTestId('item-card');
    await userEvent.click(items[0]);
    expect(fetchMocker).toHaveBeenCalledTimes(2);
    expect(fetchMocker.requests()[1].url).toEqual(
      `https://the-one-api.dev/v2/character/5cd99d4bde30eff6ebccfea0`
    );
  });
});

const { name, gender, race, birth } = characterTransform;

describe('Tests for the Card component', () => {
  test('Ensure that the card component renders the relevant card data', () => {
    render(
      <Context.Provider value={context}>
        <ItemCard character={characterTransform} />
      </Context.Provider>
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
    const spy: SpyInstance<[value: React.SetStateAction<string>], void> =
      vi.spyOn(context, 'setId');
    render(
      <Context.Provider value={context}>
        <ItemCard character={characterTransform} />
      </Context.Provider>
    );

    await userEvent.click(screen.getByTestId('item-card'));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(characterTransform._id);
  });
});
