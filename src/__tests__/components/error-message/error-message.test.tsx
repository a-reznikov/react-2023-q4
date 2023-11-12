import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../../../components/error-message';

describe('Tests for the ErrorMessage', () => {
  test('Should show ErrorMessage', () => {
    render(<ErrorMessage message={'Test error-message'} />);

    expect(screen.getByText(/Test error-message/i)).toBeDefined();
  });
});
