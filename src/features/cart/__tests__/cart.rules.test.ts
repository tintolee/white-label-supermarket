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

    it('applies BOGOF to asparagus (G95): uses sale price when available', () => {
        const s = useCart.getState();
        s.add({ id: 'G95', name: 'Asparagus', price: 0.42, unit: 'each' }, 2);
        const t = s.totals();
        expect(t.subtotal).toBeCloseTo(0.84, 2);
    });

    it('applies 20% discount when subtotal > £10', () => {
        const s = useCart.getState();
        s.add({ id: 'A', name: 'A', price: 6 }, 2);
        const t = s.totals();
        expect(t.discount).toBeCloseTo(12 * 0.2, 2);
        expect(t.total).toBeCloseTo(12 - 2.4, 2);
    });

    it('order total reflects discounts (sale price + threshold)', () => {
        const s = useCart.getState();
        s.add({ id: 'G95', name: 'Asparagus', price: 0.42 }, 10);
        s.add({ id: 'X', name: 'Other', price: 3 }, 2);
        const t = s.totals();
        expect(t.subtotal).toBe(10.2);
        expect(t.discount).toBeCloseTo(10.2 * 0.2, 2);
        expect(t.total).toBeCloseTo(8.16, 2);
    });
});
