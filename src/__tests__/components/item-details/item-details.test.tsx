import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

import { characterTransform, data, dataEmpty } from '../../mocks';
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
        <Provider store={store}>
          <App />
        </Provider>
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
  characterTransform;

describe('Tests for the Detailed Card component', (): void => {
  test('Make sure the detailed card component correctly displays the detailed card data', async (): Promise<void> => {
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
    expect(screen.getAllByText(`${name}`)).toBeDefined();
    expect(screen.getAllByText(`Gender: ${gender}`)).toBeDefined();
    expect(screen.getAllByText(`Race: ${race}`)).toBeDefined();
    expect(screen.getAllByText(`Birth: ${birth}`)).toBeDefined();
    expect(screen.getByText(`Death: ${death}`)).toBeDefined();
    expect(screen.getByText(`Hair: ${hair}`)).toBeDefined();
    expect(screen.getByText(`Height: ${height}`)).toBeDefined();
    expect(screen.getByText(`Realm: ${realm}`)).toBeDefined();
    expect(screen.getByText(`Spouse: ${spouse}`)).toBeDefined();
    expect(screen.getByText(`More info`)).toBeDefined();
  });
});
