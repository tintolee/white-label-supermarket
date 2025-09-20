import { useState } from 'react';
import { parseProductsFile } from '../lib/csv';
import type { Product } from '../types';
import logoUrl from '../assets/whitelabel_loyalty_logo.jpeg';

export default function Admin() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation - in a real app, this would be more secure
        if (username.trim() && password.trim()) {
            setIsSignedIn(true);
        } else {
            alert('Please enter both username and password');
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        try {
            const parsedProducts = await parseProductsFile(file);
            setProducts(parsedProducts);
            alert(`Successfully uploaded ${parsedProducts.length} products!`);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please check the format and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignOut = () => {
        setIsSignedIn(false);
        setUsername('');
        setPassword('');
        setProducts([]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b">
                <div className="mx-auto max-w-7xl p-4 flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <img src={logoUrl} alt="White Label Loyalty" className="h-12 w-12 object-contain" />
                        <h1 className="text-xl font-bold text-slate-800">White Label Loyalty</h1>
                    </div>
                    <div className="ml-auto">
                        <a href="/" className="text-slate-800 hover:text-slate-600">
                            ← Back to Store
                        </a>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-2xl p-8">
                {!isSignedIn ? (
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Admin Sign In</h2>

                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-800">Product Management</h2>
                            <button
                                onClick={handleSignOut}
                                className="px-4 py-2 bg-gray-200 text-slate-800 rounded-full hover:bg-gray-300"
                            >
                                Sign Out
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Upload Products</h3>
                                <label className="block">
                                    <span className="text-sm text-gray-700 mb-2 block">
                                        Upload CSV/XLSX file to update product catalog
                                    </span>
                                    <input
                                        type="file"
                                        accept=".csv,.xlsx"
                                        onChange={handleUpload}
                                        disabled={isLoading}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 disabled:opacity-50"
                                    />
                                </label>
                                {isLoading && (
                                    <p className="text-sm text-gray-600 mt-2">Processing file...</p>
                                )}
                            </div>

                            {products.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                                        Uploaded Products ({products.length})
                                    </h3>
                                    <div className="max-h-64 overflow-y-auto border rounded p-4">
                                        {products.map((product) => (
                                            <div key={product.id} className="flex justify-between py-2 border-b last:border-b-0">
                                                <span className="font-medium">{product.name}</span>
                                                <span className="text-gray-600">£{product.price.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}