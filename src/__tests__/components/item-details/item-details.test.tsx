import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ItemDetails from '../../../components/item-details';
import { Context } from '../../../components/contexts';
import { context } from '../../mocks';

import { data, dataEmpty } from '../../mocks';
import App from '../../../components/app';
import { MemoryRouter } from 'react-router-dom';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the Detailed Card component', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Ensure that clicking the close button hides the component', async (): Promise<void> => {
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
    fetchMocker.mockResponse(JSON.stringify(dataEmpty));
    const closeButton: HTMLElement = await screen.findByTestId('btn-close');
    await userEvent.click(closeButton);
    expect(screen.queryByTestId('item-details')).toBeNull();
  });
});

const { birth, death, gender, hair, height, name, race, realm, spouse } =
  context.itemData[0];

describe('Tests for the Detailed Card component', () => {
  test('Make sure the detailed card component correctly displays the detailed card data', () => {
    render(
      <Context.Provider value={context}>
        <ItemDetails />
      </Context.Provider>
    );
    expect(screen.getByText(`${name}`)).toBeDefined();
    expect(screen.getByText(`Gender: ${gender}`)).toBeDefined();
    expect(screen.getByText(`Race: ${race}`)).toBeDefined();
    expect(screen.getByText(`Birth: ${birth}`)).toBeDefined();
    expect(screen.getByText(`Death: ${death}`)).toBeDefined();
    expect(screen.getByText(`Hair: ${hair}`)).toBeDefined();
    expect(screen.getByText(`Height: ${height}`)).toBeDefined();
    expect(screen.getByText(`Realm: ${realm}`)).toBeDefined();
    expect(screen.getByText(`Spouse: ${spouse}`)).toBeDefined();
    expect(screen.getByText(`More info`)).toBeDefined();
  });
});
