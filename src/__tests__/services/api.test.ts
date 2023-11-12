import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Api from '../../services/api';
import { data, dataTransform } from '../mocks';

const api = new Api();

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Tests for the API', () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
  });

  test('The data must be transformed to the correct form.', async () => {
    fetchMocker.mockResponseOnce(JSON.stringify(data));
    const response = await api.search('', '', '');

    expect(JSON.stringify(response)).toBe(JSON.stringify(dataTransform));
  });
});
