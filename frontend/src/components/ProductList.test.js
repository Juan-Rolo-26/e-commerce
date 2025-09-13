import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('ProductList', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, name: 'Test Product' }]),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders products fetched from API', async () => {
    const ProductList = require('./ProductList').default;
    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );
    expect(await screen.findByText('Test Product')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
