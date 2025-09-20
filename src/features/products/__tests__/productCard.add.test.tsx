import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { useCart } from '../../cart/cartStore';
import type { Product } from '../../../types';

function resetCart() { useCart.getState().clear(); }

const asparagus: Product = {
    id: 'G95', name: 'Asparagus', price: 0.83, unit: 'each', stock: 10, image: ''
};

describe('ProductCard click behavior', () => {
    beforeEach(resetCart);

    it('clicking card adds one to cart; second click increments', () => {
        render(<ProductCard p={asparagus} />);
        const card = screen.getByRole('article', { name: /add asparagus to order/i });
        fireEvent.click(card);
        fireEvent.click(card);
        expect(useCart.getState().lines['G95'].qty).toBe(2);
    });

    it('disabled when out of stock', () => {
        const out: Product = { ...asparagus, stock: 0 };
        render(<ProductCard p={out} />);
        const card = screen.getByRole('article', { name: /add asparagus to order/i });
        fireEvent.click(card);
        expect(useCart.getState().lines['G95']).toBeUndefined();
    });
});
