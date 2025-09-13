import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('ProductDetail', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 1, name: 'Product 1', description: 'Desc' }),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders product details from API', async () => {
    const ProductDetail = require('./ProductDetail').default;
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText('Product 1')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
