import { describe, it, expect, beforeEach } from 'vitest';
import { useCart } from '../cartStore';

describe('order discount rules', () => {
    beforeEach(() => useCart.getState().clear());

    it('clicking same product increments quantity', () => {
        const s = useCart.getState();
        s.add({ id: 'X1', name: 'Item', price: 2, unit: 'each' });
        s.add({ id: 'X1', name: 'Item', price: 2, unit: 'each' });
        expect(useCart.getState().lines['X1'].qty).toBe(2);
    });

    it('applies BOGOF to asparagus (G95): 2 items charged as 1', () => {
        const s = useCart.getState();
        s.add({ id: 'G95', name: 'Asparagus', price: 3.5, unit: 'each' }, 2);
        const t = s.totals();
        expect(t.subtotal).toBeCloseTo(3.5, 2);
    });

    it('applies 20% discount when subtotal > £10', () => {
        const s = useCart.getState();
        s.add({ id: 'A', name: 'A', price: 6 }, 2);
        const t = s.totals();
        expect(t.discount).toBeCloseTo(12 * 0.2, 2);
        expect(t.total).toBeCloseTo(12 - 2.4, 2);
    });

    it('order total reflects discounts (BOGOF + threshold)', () => {
        const s = useCart.getState();
        s.add({ id: 'G95', name: 'Asparagus', price: 4 }, 3);
        s.add({ id: 'X', name: 'Other', price: 3 }, 1);
        const t = s.totals();
        expect(t.subtotal).toBe(11);
        expect(t.discount).toBeCloseTo(11 * 0.2, 2);
        expect(t.total).toBeCloseTo(8.8, 2);
    });
});
