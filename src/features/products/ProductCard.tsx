import type { Product } from '../../types';
import { useCart } from '../cart/cartStore';
import { useToast } from '../../lib/toast';

export default function ProductCard({ p }: { readonly p: Product }) {
    const add = useCart((s) => s.add);
    const { addToast } = useToast();
    const out = (p.stock ?? 1) <= 0;
    const price = p.salePrice ?? p.price;

    const handleAddToCart = () => {
        if (!out) {
            add({ id: p.id, name: p.name, price, unit: p.unit });
            addToast({
                message: `${p.name} added to basket`,
                type: 'success',
                duration: 2000
            });
        }
    };

    return (
        <button
            type="button"
            disabled={out}
            onClick={handleAddToCart}
            className={`group bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200 shadow-md hover:shadow-xl p-6 flex flex-col cursor-pointer transform hover:-translate-y-2 transition-all duration-300 ${out ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-300'
                }`}
            aria-label={`Add ${p.name} to order`}
        >
            <div className="relative h-48 w-full rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100 flex items-center justify-center overflow-hidden shadow-inner group">
                <img
                    src={p.image || '/placeholder.png'}
                    alt={p.name}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                            parent.innerHTML = `
                                <div class="text-center p-4">
                                    <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div class="text-sm text-gray-500 font-medium">${p.name}</div>
                                </div>
                            `;
                        }
                    }}
                    loading="lazy"
                />
            </div>
            {p.category && (
                <span className="mt-4 inline-block px-3 py-1.5 text-xs bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full w-fit font-medium shadow-sm border border-blue-200">
                    {p.category}
                </span>
            )}
            <h3 className="mt-3 font-bold text-lg text-slate-800 leading-tight">{p.name}</h3>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{p.description}</p>
            <div className="mt-3">
                {p.salePrice ? (
                    <div className="flex items-baseline gap-2">
                        <span className="line-through text-sm text-gray-400">£{p.price.toFixed(2)}</span>
                        <span className="text-xl font-bold text-slate-800">£{price.toFixed(2)}</span>
                        <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                            {p.promotion === 'BOGOF' ? 'Buy 1 Get 1 Free' : 'SALE'}
                        </span>
                    </div>
                ) : (
                    <span className="text-xl font-bold text-slate-800">£{price.toFixed(2)}</span>
                )}
            </div>
            {out && <span className="text-sm text-red-600 mt-2 font-medium">Out of stock</span>}
            {!out && (
                <div className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 text-center">
                    Click to add
                </div>
            )}
        </button>
    );
}
