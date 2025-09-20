import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { parseProductsFile } from '../lib/csv';
import ProductGrid from '../features/products/ProductGrid';
import CartPage from '../features/cart/CartPage';
import sampleUrl from '../data/products.csv?url';
import logoUrl from '../assets/whitelabel_loyalty_logo.jpeg';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        (async () => {
            const res = await fetch(sampleUrl);
            const file = new File([await res.blob()], 'storec.csv', { type: 'text/csv' });
            setProducts(await parseProductsFile(file));
        })().catch(console.error);
    }, []);

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0]; if (!f) return;
        setProducts(await parseProductsFile(f));
    }

    const filtered = query
        ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        : products;

    return (
        <div className="min-h-dvh">
            <header className="border-b">
                <div className="mx-auto max-w-7xl p-4 flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <img src={logoUrl} alt="White Label Loyalty" className="h-20 w-20 object-contain" />
                        <h1 className="text-xl font-bold">White Label Loyalty</h1>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                        <input className="input w-64" placeholder="Search products…" value={query}
                            onChange={e => setQuery(e.target.value)} aria-label="Search products" />
                        <label className="text-sm">
                            <span className="mr-2">Upload CSV/XLSX</span>
                            <input type="file" accept=".csv,.xlsx" onChange={handleUpload} className="hidden" />
                            <span className="btn cursor-pointer">Choose file</span>
                        </label>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl p-4 grid grid-cols-4 gap-6">
                <section className="col-span-3"><ProductGrid products={filtered} /></section>
                <section className="col-span-1"><CartPage /></section>
            </main>
        </div>
    );
}
