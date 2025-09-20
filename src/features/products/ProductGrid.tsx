import type { Product } from '../../types';
import ProductCard from './ProductCard';
import { Search, Package } from 'lucide-react';

function ProductSkeleton() {
    return (
        <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200 shadow-md p-6 animate-pulse">
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
    );
}

function EmptyState({ isSearch = false }: { readonly isSearch?: boolean }) {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                {isSearch ? (
                    <Search className="w-12 h-12 text-gray-400" />
                ) : (
                    <Package className="w-12 h-12 text-gray-400" />
                )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isSearch ? 'No products found' : 'No products available'}
            </h3>
            <p className="text-gray-500 text-center max-w-md">
                {isSearch
                    ? 'Try adjusting your search terms or browse our categories to find what you\'re looking for.'
                    : 'We\'re working on adding products to our inventory. Please check back soon!'
                }
            </p>
        </div>
    );
}

export default function ProductGrid({ products, isSearch = false }: { readonly products: Product[]; readonly isSearch?: boolean }) {
    if (products === undefined || (products.length === 0 && !isSearch)) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {Array.from({ length: 6 }, (_, i) => (
                    <ProductSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return <EmptyState isSearch={isSearch} />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((p) => (
                <ProductCard key={p.id} p={p} />
            ))}
        </div>
    );
}