import createFetchMock from 'vitest-fetch-mock';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { characterTransform, dataByID } from '../../mocks';
import ItemDetails from '@/components/item-details';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const { birth, death, gender, hair, height, name, race, realm, spouse } =
  characterTransform;

describe('Tests for the Detailed Card component', (): void => {
  test('Make sure the detailed card component correctly displays the detailed card data', async (): Promise<void> => {
    render(<ItemDetails dataDetails={dataByID.docs} />);
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
