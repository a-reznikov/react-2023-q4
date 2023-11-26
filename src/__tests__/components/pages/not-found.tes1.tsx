import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';

import App from '../../../components/app';
import { MemoryRouter } from 'react-router-dom';

describe('Tests for the 404 Page component', (): void => {
  test('Ensure that the 404 page is displayed when navigating to an invalid route', async (): Promise<void> => {
    const wrongPathToPage: string = '/wrong-path-to-page';
    render(
      <MemoryRouter initialEntries={[wrongPathToPage]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText('Page not found')).toBeDefined();
  });
});
