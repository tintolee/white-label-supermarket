import { useCart } from './cartStore';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
    const { lines, setQty, remove, clear, totals } = useCart();
    const t = totals();
    const rows = Object.values(lines);

    const handleCheckout = () => {
        // For now, just show an alert. In a real app, this would redirect to checkout
        alert(`Proceeding to checkout with ${rows.length} item(s). Total: £${t.total.toFixed(2)}`);
    };

    return (
        <aside className="max-w-md w-full border p-1 pb-6 bg-gray-50 rounded">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 pb-4 border-b border-gray-300">
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                    <ShoppingCart className="text-white w-5 h-5" />
                </div>
                Basket
            </h2>

            {rows.length === 0 && <p className="text-gray-500">No items yet. Click a product to add it.</p>}

            <ul className="divide-y">
                {rows.map((item) => (
                    <li key={item.id} className="py-3 flex items-center justify-between">
                        <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500">Qty: {item.qty} × £{item.price.toFixed(2)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                min={1}
                                value={item.qty}
                                onChange={(e) => setQty(item.id, Math.max(1, Number(e.target.value)))}
                                className="w-16 input"
                            />
                            <button onClick={() => remove(item.id)} className="text-red-600 text-sm">Remove</button>
                        </div>
                    </li>
                ))}
            </ul>

            {rows.length > 0 && (
                <>
                    <div className="mt-6 pt-4 border-t border-gray-300 space-y-1 text-right">
                        <div>Subtotal: <b>£{t.subtotal.toFixed(2)}</b></div>
                        {t.discount > 0 && <div className="text-green-600">Discount: -£{t.discount.toFixed(2)}</div>}
                        <div className="text-lg">Total: <b>£{t.total.toFixed(2)}</b></div>
                    </div>
                    <div className="mt-6 flex gap-3 justify-center">
                        <button className="px-6 py-2 bg-gray-200 rounded-full hover:opacity-90 disabled:opacity-50" onClick={clear}>Clear Basket</button>
                        <button
                            className="px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 disabled:bg-gray-300 disabled:text-gray-500"
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
