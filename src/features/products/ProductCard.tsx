import type { Product } from '../../types';
import { useCart } from '../cart/cartStore';

export default function ProductCard({ p }: { p: Product }) {
    const add = useCart((s) => s.add);
    const out = (p.stock ?? 1) <= 0;
    const price = p.salePrice ?? p.price;

    return (
        <article
            role="article"
            aria-label={`Add ${p.name} to order`}
            onClick={() => !out && add({ id: p.id, name: p.name, price, unit: p.unit })}
            className={`rounded border p-4 flex flex-col cursor-pointer hover:shadow ${out ? 'opacity-50' : ''}`}
        >
            <img src={p.image || '/placeholder.png'} alt={p.name} className="h-40 object-contain" />
            <h3 className="mt-2 font-semibold">{p.name}</h3>
            <span className="text-sm text-gray-600">{p.unit}</span>
            <span className="mt-1 text-lg font-semibold">£{price.toFixed(2)}</span>
            {out && <span className="text-xs text-red-600 mt-1">Out of stock</span>}
            <span className="text-xs text-gray-500 mt-2">Click to add</span>
        </article>
    );
}
