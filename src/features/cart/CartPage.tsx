import { useCart } from './cartStore';
import { ShoppingCart, Tag, Gift } from 'lucide-react';
import { DISCOUNT_THRESHOLD } from '../../app/config';

export default function CartPage() {
    const { lines, setQty, remove, clear, totals } = useCart();
    const t = totals();
    const rows = Object.values(lines);

    const handleCheckout = () => {
        // For now, just show an alert. In a real app, this would redirect to checkout
        alert(`Proceeding to checkout with ${rows.length} item(s). Total: £${t.total.toFixed(2)}`);
    };

    return (
        <aside className="sticky top-8 max-w-md w-full bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-xl rounded-2xl p-6 pb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-r from-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-lg">
                    <ShoppingCart className="text-white w-6 h-6" />
                </div>
                <span className="bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                    Basket
                </span>
            </h2>

            {/* Discount Promotion Banner */}
            <div className={`mb-6 p-4 rounded-xl border-2 flex items-center gap-3 text-sm shadow-md ${t.subtotal > DISCOUNT_THRESHOLD
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800'
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-800'
                }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${t.subtotal > DISCOUNT_THRESHOLD ? 'bg-gradient-to-r from-green-200 to-emerald-200' : 'bg-gradient-to-r from-blue-200 to-indigo-200'
                    }`}>
                    {t.subtotal > DISCOUNT_THRESHOLD ? (
                        <Gift className="w-5 h-5" />
                    ) : (
                        <Tag className="w-5 h-5" />
                    )}
                </div>
                <div className="flex-1">
                    {t.subtotal > DISCOUNT_THRESHOLD ? (
                        <div className="font-bold text-base">🎉 20% discount applied!</div>
                    ) : (
                        <div>
                            <div className="font-bold">Spend over £{DISCOUNT_THRESHOLD} for 20% off</div>
                            {t.subtotal > 0 && (
                                <div className="text-xs opacity-75 mt-1">
                                    {t.subtotal <= DISCOUNT_THRESHOLD
                                        ? `Only £${(DISCOUNT_THRESHOLD - t.subtotal + 0.01).toFixed(2)} more to save!`
                                        : 'Discount applied!'
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>            {rows.length === 0 && (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No items yet</p>
                    <p className="text-gray-400 text-sm">Click a product to add it</p>
                </div>
            )}

            <ul className="space-y-4">
                {rows.map((item) => (
                    <li key={item.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-slate-800 truncate">{item.name}</div>
                                <div className="text-sm text-gray-500">£{item.price.toFixed(2)} each</div>
                            </div>
                            <button
                                onClick={() => remove(item.id)}
                                className="ml-3 px-3 py-1 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium transition-colors duration-200 flex-shrink-0"
                            >
                                Remove
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    min={1}
                                    value={item.qty}
                                    onChange={(e) => setQty(item.id, Math.max(1, Number(e.target.value)))}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <span className="text-sm text-gray-600">×</span>
                                <span className="font-semibold text-slate-800">£{(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {rows.length > 0 && (
                <>
                    <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                        <div className="space-y-2">
                            <div className="flex justify-between text-slate-700">
                                <span>Subtotal:</span>
                                <span className="font-semibold">£{t.subtotal.toFixed(2)}</span>
                            </div>
                            {t.discount > 0 && (
                                <div className="flex justify-between text-green-700">
                                    <span>Discount (20%):</span>
                                    <span className="font-semibold">-£{t.discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="border-t border-gray-300 pt-2 flex justify-between text-xl font-bold text-slate-800">
                                <span>Total:</span>
                                <span>£{t.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                        <button
                            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors duration-200"
                            onClick={clear}
                        >
                            Clear Basket
                        </button>
                        <button
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl font-medium hover:from-slate-900 hover:to-black transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                            onClick={handleCheckout}
                            disabled={rows.length === 0}
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </aside>
    );
}
