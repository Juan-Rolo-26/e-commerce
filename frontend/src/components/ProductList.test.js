import { render, screen } from '@testing-library/react';

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
    render(<ProductList />);
    expect(await screen.findByText('Test Product')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
