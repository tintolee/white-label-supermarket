import type { Product } from '../../types';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
    if (!products?.length) {
        return <div className="p-6 text-center text-gray-500">No products available.</div>;
    }
    return (
        <div className="grid grid-cols-3 gap-6">
            {products.map((p) => (
                <ProductCard key={p.id} p={p} />
            ))}
        </div>
    );
}
