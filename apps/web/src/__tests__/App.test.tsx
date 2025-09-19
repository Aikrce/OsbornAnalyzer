import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../routes';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/奥斯本创新九问/i)).toHaveLength(6);
  });
});
