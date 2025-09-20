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

            <footer className="bg-slate-800 text-white mt-16">
                <div className="mx-auto max-w-7xl p-8">
                    <div className="grid grid-cols-5 gap-8 mb-8">
                        {/* Logo and Company Info */}
                        <div className="col-span-1">
                            <div className="flex items-center justify-center mb-4">
                                <img src={logoUrl} alt="White Label Loyalty" className="h-25 w-25 object-contain" />
                            </div>
                        </div>

                        {/* Products */}
                        <div>
                            <h3 className="font-semibold mb-4">Products</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-white">Vegetables</a></li>
                                <li><a href="#" className="hover:text-white">Pets</a></li>
                                <li><a href="#" className="hover:text-white">Pastries</a></li>
                            </ul>
                        </div>

                        {/* Solutions */}
                        <div>
                            <h3 className="font-semibold mb-4">Here to help</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-white">My Account</a></li>
                                <li><a href="#" className="hover:text-white">Help & FAQs</a></li>
                                <li><a href="#" className="hover:text-white">White Label Magazine</a></li>

                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="font-semibold mb-4">About</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><a href="#" className="hover:text-white">General terms & conditions</a></li>
                                <li><a href="#" className="hover:text-white">Ratings & reviews policy</a></li>
                                <li><a href="#" className="hover:text-white">Product terms & conditions</a></li>
                                <li><a href="#" className="hover:text-white">Cookie settings</a></li>
                                <li><a href="#" className="hover:text-white">Discount terms & conditions</a></li>

                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="font-semibold mb-4">Contact Us</h3>
                            <div className="space-y-3 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <span>📧</span>
                                    <a href="mailto:info@whitelabel-loyalty.com" className="hover:text-white">
                                        info@whitelabel-loyalty.com
                                    </a>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span>📍</span>
                                    <div>
                                        <div>Park House, Park Square West,</div>
                                        <div>Leeds, England, LS1 2PW</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>📞</span>
                                    <a href="tel:+441138241591" className="hover:text-white">
                                        +44 (0)113 824 1591
                                    </a>
                                </div>
                            </div>

                            {/* Social Media Icons */}
                            <div className="flex gap-3 mt-4">
                                <a href="#" className="text-gray-300 hover:text-white">
                                    <span className="text-xl">📧</span>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    <span className="text-xl">📘</span>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    <span className="text-xl">🐦</span>
                                </a>
                                <a href="#" className="text-gray-300 hover:text-white">
                                    <span className="text-xl">📺</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Awards/Certifications Section */}
                    <div className="border-t border-gray-700 pt-6 mb-6">
                        <div className="flex items-center justify-center gap-8 opacity-60">
                            <div className="text-xs text-center">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-1">
                                    <span className="text-white font-bold text-xs">TECH</span>
                                </div>
                            </div>
                            <div className="text-xs text-center">
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-1">
                                    <span className="text-white font-bold text-xs">★★★</span>
                                </div>
                            </div>
                            <div className="text-xs text-center">
                                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-1">
                                    <span className="text-white font-bold text-xs">TOP</span>
                                </div>
                            </div>
                            <div className="text-xs text-center">
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-1">
                                    <span className="text-white font-bold text-xs">MAR</span>
                                </div>
                            </div>
                            <div className="text-xs text-center">
                                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mb-1">
                                    <span className="text-white font-bold text-xs">10</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
                        © {new Date().getFullYear()} Oluwatosin Adelaja
                    </div>
                </div>
            </footer>
        </div>
    );
}
