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
    return Papa.parse<any>(text, { header: true, skipEmptyLines: true }).data;
}

async function parseXLSX(file: File) {
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf);
    const ws = wb.Sheets[wb.SheetNames[0]];
    return XLSX.utils.sheet_to_json<any>(ws, { defval: '' });
}

function normalize(rows: any[]): Product[] {
    return rows.map((r, i) => {
        const price = Number(String(r.price ?? r.Price ?? '').replace(/[^\d.-]/g, '')) || 0;
        const stockStr = String(r.stock ?? r.Stock ?? '1').toLowerCase();
        const stock = stockStr === 'false' || stockStr === 'no' || stockStr === '0' ? 0 : Number(stockStr) || 1;
        return {
            id: String(r.id ?? r.ID ?? i),
            name: String(r.name ?? r.Name ?? '').trim(),
            price,
            salePrice: r.salePrice ? Number(r.salePrice) : undefined,
            unit: String(r.unit ?? r.Unit ?? 'each'),
            stock,
            image: String(r.image ?? r.Image ?? ''),
            category: String(r.category ?? r.Category ?? '').trim() || undefined,
            promotion: String(r.promotion ?? r.Promotion ?? '').trim() || undefined,
        };
    }).filter(p => p.name);
}
