import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorButton from '../../../components/error-button';

describe('Tests for the ErrorButton', (): void => {
  test('Should show ErrorButton', (): void => {
    render(<ErrorButton />);

    expect(screen.getByText(/Throw Error/i)).toBeDefined();
  });
});
