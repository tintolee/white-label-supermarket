import { useEffect, useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import type { Product } from '../types';
import { parseProductsFile } from '../lib/csv';
import ProductGrid from '../features/products/ProductGrid';
import CartPage from '../features/cart/CartPage';
import { useCart } from '../features/cart/cartStore';
import { ToastContainer } from '../lib/toast';
import { useDebounce } from '../hooks/useDebounce';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import sampleUrl from '../data/products.csv?url';
import logoUrl from '../assets/whitelabel_loyalty_logo.jpeg';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const itemCount = useCart((s) => s.itemCount());

    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        (async () => {
            const res = await fetch(sampleUrl);
            const file = new File([await res.blob()], 'storec.csv', { type: 'text/csv' });
            setProducts(await parseProductsFile(file));
        })().catch(console.error);
    }, []);

    const filtered = products.filter(p => {
        const matchesQuery = !debouncedQuery || p.name.toLowerCase().includes(debouncedQuery.toLowerCase());
        const matchesCategory = !selectedCategory || p.category === selectedCategory;
        return matchesQuery && matchesCategory;
    });

    const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

    return (
        <div className="min-h-dvh bg-gradient-to-br from-gray-50 to-white">
            <header className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-xl border-b border-slate-700">
                <div className="mx-auto max-w-7xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="p-2 bg-white rounded-xl shadow-lg">
                            <img src={logoUrl} alt="White Label Loyalty" className="h-12 w-12 md:h-16 md:w-16 object-contain" />
                        </div>
                        <div className="flex-1 md:flex-none">
                            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">White Label Loyalty</h1>
                            <p className="text-slate-300 text-xs md:text-sm">Your premium supermarket experience</p>
                        </div>
                        <div className="md:hidden relative">
                            <ShoppingBag className="h-8 w-8 text-white" />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto md:ml-auto">
                        <div className="flex-1 md:flex-none">
                            <Input
                                className="w-full md:w-80"
                                placeholder="Search products…"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                startIcon={<Search className="h-5 w-5 text-slate-400" />}
                                clearable
                                onClear={() => setQuery('')}
                                aria-label="Search products"
                            />
                        </div>
                        <a href="/admin" className="px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg text-sm md:text-base">
                            Admin
                        </a>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                <section className="lg:col-span-3 order-2 lg:order-1">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Our Products</h2>
                            {debouncedQuery && (
                                <div className="text-sm text-slate-600">
                                    {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{debouncedQuery}"
                                </div>
                            )}
                        </div>
                        <p className="text-slate-600 mb-4">Discover our premium selection of quality products</p>

                        {categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                <Button
                                    variant="pill"
                                    active={!selectedCategory}
                                    onClick={() => setSelectedCategory('')}
                                >
                                    All Categories
                                </Button>
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        variant="pill"
                                        active={selectedCategory === category}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                    <ProductGrid products={filtered} isSearch={Boolean(query || selectedCategory)} />
                </section>
                <section className="lg:col-span-1 order-1 lg:order-2">
                    <CartPage />
                </section>
            </main>

            <footer className="bg-slate-800 text-white mt-16">
                <div className="mx-auto max-w-7xl p-8">
                    <div className="grid grid-cols-5 gap-8 mb-8">
                        <div className="col-span-1">
                            <div className="flex items-center justify-center mb-4">
                                <img src={logoUrl} alt="White Label Loyalty" className="h-12 w-12 object-contain" />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Products</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><button className="hover:text-white">Vegetables</button></li>
                                <li><button className="hover:text-white">Pets</button></li>
                                <li><button className="hover:text-white">Pastries</button></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Here to help</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><button className="hover:text-white">My Account</button></li>
                                <li><button className="hover:text-white">Help & FAQs</button></li>
                                <li><button className="hover:text-white">White Label Magazine</button></li>

                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">About</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li><button className="hover:text-white">General terms & conditions</button></li>
                                <li><button className="hover:text-white">Ratings & reviews policy</button></li>
                                <li><button className="hover:text-white">Product terms & conditions</button></li>
                                <li><button className="hover:text-white">Cookie settings</button></li>
                                <li><button className="hover:text-white">Discount terms & conditions</button></li>

                            </ul>
                        </div>

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

                            <div className="flex gap-3 mt-4">
                                <button className="text-gray-300 hover:text-white">
                                    <span className="text-xl">📧</span>
                                </button>
                                <button className="text-gray-300 hover:text-white">
                                    <span className="text-xl">📘</span>
                                </button>
                                <button className="text-gray-300 hover:text-white">
                                    <span className="text-xl">🐦</span>
                                </button>
                                <button className="text-gray-300 hover:text-white">
                                    <span className="text-xl">📺</span>
                                </button>
                            </div>
                        </div>
                    </div>

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

                    <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
                        © {new Date().getFullYear()} Oluwatosin Adelaja
                    </div>
                </div>
            </footer>
            <ToastContainer />
        </div>
    );
}
