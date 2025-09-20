import type { Product } from '../../types';
import { useCart } from '../cart/cartStore';

export default function ProductCard({ p }: { readonly p: Product }) {
    const add = useCart((s) => s.add);
    const out = (p.stock ?? 1) <= 0;
    const price = p.salePrice ?? p.price;

    return (
        <button
            type="button"
            disabled={out}
            onClick={() => !out && add({ id: p.id, name: p.name, price, unit: p.unit })}
            className={`rounded border p-4 flex flex-col cursor-pointer hover:shadow ${out ? 'opacity-50' : ''
                }`}
            aria-label={`Add ${p.name} to order`}
        >
            <div className="relative">
                <img
                    src={p.image || '/placeholder.png'}
                    alt={p.name}
                    className="h-40 w-full object-contain rounded bg-gray-50"
                />
                {p.promotion === 'BOGOF' && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform rotate-12 animate-pulse hover:animate-bounce">
                        BUY 1 GET 1 FREE!
                    </div>
                )}
            </div>
            {p.category && (
                <span className="mt-2 inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full w-fit">
                    {p.category}
                </span>
            )}
            <h3 className="mt-2 font-semibold text-slate-800">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <div className="mt-1">
                {p.salePrice ? (
                    <div className="flex items-baseline gap-2">
                        <span className="line-through text-sm text-gray-500">£{p.price.toFixed(2)}</span>
                        <span className="text-lg font-semibold text-slate-800">£{price.toFixed(2)}</span>
                    </div>
                ) : (
                    <span className="text-lg font-semibold text-slate-800">£{price.toFixed(2)}</span>
                )}
            </div>
            {out && <span className="text-sm text-red-600 mt-1">Out of stock</span>}
            {out && <span className="text-sm text-red-600 mt-1">Out of stock</span>}
            <span className="mt-2 text-xs text-slate-800">Click to add</span>
        </button>
    );
}
