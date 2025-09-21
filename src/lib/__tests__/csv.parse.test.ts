import { expect, it, describe, beforeAll } from 'vitest';
import { parseProductsFile } from '../csv';

beforeAll(() => {
    if (!File.prototype.text) {
        File.prototype.text = function () {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsText(this);
            });
        };
    }
});

function makeFile(name: string, content: string, type = 'text/csv') {
    return new File([content], name, { type });
}

describe('CSV/XLSX product parser', () => {
    it('parses CSV and limits to 3 products, normalizing fields', async () => {
        const csv = `id,name,price,unit,stock,image
G95,Asparagus,0.83,each,30,https://images.pexels.com/photos/4397814/pexels-photo-4397814.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop
A21,Kitty Litter,18.99,each,24,https://images.pexels.com/photos/4397814/pexels-photo-4397814.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop
CA6,Cake,2.00,each,18,https://images.pexels.com/photos/4397814/pexels-photo-4397814.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop
X99,Extra,1.00,each,5,https://images.pexels.com/photos/4397814/pexels-photo-4397814.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop
`;
        const file = makeFile('storec.csv', csv);
        const items = await parseProductsFile(file);
        expect(items.length).toBe(3);
        expect(items[0]).toMatchObject({ id: 'G95', name: 'Asparagus', price: 0.83 });
    });
});
