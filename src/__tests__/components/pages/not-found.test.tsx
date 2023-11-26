import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5';

import NotFound from '@/pages/404';

describe('Tests for the 404 Page component', (): void => {
  test('Ensure that the 404 page is displayed when navigating to an invalid route', async (): Promise<void> => {
    const wrongPathToPage: string = '/wrong-path-to-page';
    render(
      <MemoryRouterProvider url={wrongPathToPage}>
        <NotFound />
      </MemoryRouterProvider>
    );
    expect(screen.getByText('Page not found')).toBeDefined();
  });
});
