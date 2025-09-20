import { useCart } from './cartStore';

export default function CartPage() {
    const { lines, setQty, remove, clear, totals } = useCart();
    const t = totals();
    const rows = Object.values(lines);

    return (
        <aside className="max-w-md w-full border p-6 bg-gray-50 rounded">
            <h2 className="text-xl font-bold mb-4">Your Order</h2>

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
                    <div className="mt-6 space-y-1 text-right">
                        <div>Subtotal: <b>£{t.subtotal.toFixed(2)}</b></div>
                        {t.discount > 0 && <div className="text-green-600">Discount: -£{t.discount.toFixed(2)}</div>}
                        <div className="text-lg">Total: <b>£{t.total.toFixed(2)}</b></div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="btn bg-gray-200" onClick={clear}>Clear</button>
                    </div>
                </>
            )}
        </aside>
    );
}
