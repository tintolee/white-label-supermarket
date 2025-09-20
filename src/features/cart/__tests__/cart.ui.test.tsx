import { render, screen } from '@testing-library/react';
import CartPage from '../CartPage';
import { useCart } from '../cartStore';

describe('CartPage UI totals', () => {
    it('renders totals reflecting discounts', () => {
        const s = useCart.getState();
        s.clear();
        s.add({ id: 'G95', name: 'Asparagus', price: 4 }, 2); // BOGOF -> £4
        s.add({ id: 'X', name: 'Other', price: 7 }, 1);       // +£7 => subtotal=11 => 20% off
        render(<CartPage />);
        expect(screen.getByText(/Subtotal:\s*£11\.00/i)).toBeInTheDocument();
        expect(screen.getByText(/Discount:\s*-£2\.20/i)).toBeInTheDocument();
        expect(screen.getByText(/Total:\s*£8\.80/i)).toBeInTheDocument();
    });
});
