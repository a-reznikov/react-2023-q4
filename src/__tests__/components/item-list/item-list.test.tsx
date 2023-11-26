import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { dataEmpty, dataWithTwoCharacter, mockProps } from '../../mocks';
import mockRouter from 'next-router-mock';

import { data } from '../../mocks';
import userEvent from '@testing-library/user-event';
import Home from '@/pages';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the Card List component', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Verify that the component renders the specified number of cards', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));

    render(
      <Provider store={store()}>
        <Home {...mockProps} />
      </Provider>
    );
    const threeItems: HTMLElement[] = await screen.findAllByTestId('item-card');
    expect(threeItems.length).toBe(3);

    fetchMocker.mockResponse(JSON.stringify(dataWithTwoCharacter));
    const setLimitButton: HTMLElement = screen.getByTestId('set-limit');
    const setLimitInput: HTMLInputElement = screen.getByTestId('limit-input');
    await userEvent.clear(setLimitInput);
    await userEvent.type(setLimitInput, '2');
    await userEvent.click(setLimitButton);
    expect(mockRouter.query.limit).toBe('2');
  });
});

describe('Tests for the Card List component', (): void => {
  test('Check that an appropriate message is displayed if no cards are present.', (): void => {
    fetchMocker.mockResponse(JSON.stringify(dataEmpty));
    const emptyProps = { ...mockProps, data: dataEmpty };
    render(
      <Provider store={store()}>
        <Home {...emptyProps} />
      </Provider>
    );

    expect(
      screen.queryByText(/Oops. There is no such character in our database./i)
    ).toBeDefined();
  });

  test('Verify static number of cards', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(data));
    render(
      <Provider store={store()}>
        <Home {...mockProps} />
      </Provider>
    );
    const items: HTMLElement[] = await screen.findAllByTestId('item-card');
    expect(items.length).toBe(3);
  });
});
