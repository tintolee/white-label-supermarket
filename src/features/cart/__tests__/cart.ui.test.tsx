import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartPage from '../CartPage';
import { useCart } from '../cartStore';

describe('CartPage UI totals', () => {
    it('renders totals reflecting discounts', () => {
        const s = useCart.getState();
        s.clear();
        s.add({ id: 'G95', name: 'Asparagus', price: 0.42 }, 2);
        s.add({ id: 'X', name: 'Other', price: 7 }, 1);
        render(<CartPage />);

        expect(screen.getByText((_, element) => {
            return element?.textContent === 'Subtotal:' || false;
        })).toBeInTheDocument();

        expect(screen.getAllByText((_, element) => {
            return element?.textContent === '£7.84' || false;
        })).toHaveLength(2);

        expect(screen.getByText((_, element) => {
            return element?.textContent === 'Total:' || false;
        })).toBeInTheDocument();
    });

    it('applies 20% discount when over £10', () => {
        const s = useCart.getState();
        s.clear();
        s.add({ id: 'G95', name: 'Asparagus', price: 0.42 }, 2);
        s.add({ id: 'X', name: 'Other', price: 10 }, 1);
        render(<CartPage />);

        expect(screen.getByText((_, element) => {
            return element?.textContent === 'Subtotal:' || false;
        })).toBeInTheDocument();

        expect(screen.getByText((_, element) => {
            return element?.textContent === '£10.84' || false;
        })).toBeInTheDocument();

        expect(screen.getByText((_, element) => {
            return element?.textContent === 'Discount (20%):' || false;
        })).toBeInTheDocument();

        expect(screen.getByText((_, element) => {
            return element?.textContent === '-£2.17' || false;
        })).toBeInTheDocument();

        expect(screen.getByText((_, element) => {
            return element?.textContent === 'Total:' || false;
        })).toBeInTheDocument();

        expect(screen.getByText((_, element) => {
            return element?.textContent === '£8.67' || false;
        })).toBeInTheDocument();
    });

    it('displays BOGOF pricing correctly for asparagus', () => {
        const s = useCart.getState();
        s.clear();
        s.add({ id: 'G95', name: 'Asparagus', price: 0.42 }, 2);
        render(<CartPage />);

        expect(screen.getByText(/£0\.42 each/)).toBeInTheDocument();
        expect(screen.getAllByText(/£0\.84/)).toHaveLength(3);
    });
});