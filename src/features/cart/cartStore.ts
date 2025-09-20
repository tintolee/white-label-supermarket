import { create } from 'zustand';
import { BOGOF_ID, DISCOUNT_RATE, DISCOUNT_THRESHOLD } from '../../app/config';

type Line = { id: string; name: string; price: number; unit?: string; qty: number };

type State = {
    lines: Record<string, Line>;
    add: (l: Omit<Line, 'qty'>, qty?: number) => void;
    setQty: (id: string, qty: number) => void;
    remove: (id: string) => void;
    clear: () => void;
    totals: () => { subtotal: number; discount: number; total: number };
    itemCount: () => number;
};

export const useCart = create<State>()((set, get) => ({
    lines: {},
    add: (l, qty = 1) =>
        set((s) => ({ lines: { ...s.lines, [l.id]: { ...l, qty: (s.lines[l.id]?.qty ?? 0) + qty } } })),
    setQty: (id, qty) =>
        set((s) => ({ lines: { ...s.lines, [id]: { ...s.lines[id], qty: Math.max(1, qty) } } })),
    remove: (id) =>
        set((s) => {
            const { [id]: _, ...rest } = s.lines;
            return { lines: rest };
        }),
    clear: () => set({ lines: {} }),
    totals: () => {
        let subtotal = 0;
        Object.values(get().lines).forEach((line) => {
            if (line.id === BOGOF_ID) {
                const chargeable = Math.ceil(line.qty / 2);
                subtotal += line.price * chargeable;
            } else {
                subtotal += line.price * line.qty;
            }
        });
        const discount = subtotal > DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
        const total = subtotal - discount;
        return {
            subtotal: +subtotal.toFixed(2),
            discount: +discount.toFixed(2),
            total: +total.toFixed(2),
        };
    },
    itemCount: () => {
        return Object.values(get().lines).reduce((total, line) => total + line.qty, 0);
    },
}));
