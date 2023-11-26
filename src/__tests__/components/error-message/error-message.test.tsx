import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../../../components/error-message';

describe('Tests for the ErrorMessage', (): void => {
  test('Should show ErrorMessage', (): void => {
    render(<ErrorMessage message={'Test error-message'} />);

    expect(screen.getByText(/Test error-message/i)).toBeDefined();
  });
});
