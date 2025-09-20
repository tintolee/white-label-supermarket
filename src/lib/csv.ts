import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import type { Product } from '../types';

export async function parseProductsFile(file: File): Promise<Product[]> {
    const ext = file.name.split('.').pop()?.toLowerCase();
    const rows = ext === 'csv' ? await parseCSV(file) : await parseXLSX(file);
    return normalize(rows).slice(0, 3);
}

async function parseCSV(file: File) {
    const text = await file.text();
    return Papa.parse<Record<string, unknown>>(text, { header: true, skipEmptyLines: true }).data;
}

async function parseXLSX(file: File) {
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf);
    const ws = wb.Sheets[wb.SheetNames[0]];
    return XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: '' });
}

function normalize(rows: Record<string, unknown>[]): Product[] {
    return rows.map((r, i) => {
        const getStringValue = (value: unknown): string => {
            if (value === null || value === undefined) return '';
            if (typeof value === 'string') return value;
            if (typeof value === 'number' || typeof value === 'boolean') return String(value);
            return '';
        };

        const getNumericValue = (value: unknown): number => {
            if (value === null || value === undefined) return 0;
            if (typeof value === 'number') return value;
            if (typeof value === 'string') {
                const str = value.replace(/[^\d.-]/g, '');
                return Number(str) || 0;
            }
            return 0;
        };

        const price = getNumericValue(r.price ?? r.Price);
        const stockValue = r.stock ?? r.Stock ?? '1';
        const stockStr = getStringValue(stockValue).toLowerCase();
        const stock = stockStr === 'false' || stockStr === 'no' || stockStr === '0' ? 0 : getNumericValue(stockValue);

        return {
            id: getStringValue(r.id ?? r.ID) || String(i),
            name: getStringValue(r.name ?? r.Name).trim(),
            price,
            salePrice: r.salePrice ? getNumericValue(r.salePrice) : undefined,
            unit: getStringValue(r.unit ?? r.Unit) || 'each',
            stock,
            image: getStringValue(r.image ?? r.Image),
            category: getStringValue(r.category ?? r.Category).trim() || undefined,
            promotion: getStringValue(r.promotion ?? r.Promotion).trim() || undefined,
            description: getStringValue(r.description ?? r.Description).trim() || undefined,
        };
    }).filter(p => p.name);
}
