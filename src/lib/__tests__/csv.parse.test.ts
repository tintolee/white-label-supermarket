import { expect, it, describe } from 'vitest';
import { parseProductsFile } from '../csv';

function makeFile(name: string, content: string, type = 'text/csv') {
    return new File([content], name, { type });
}

describe('CSV/XLSX product parser', () => {
    it('parses CSV and limits to 3 products, normalizing fields', async () => {
        const csv = `id,name,price,unit,stock,image
G95,Asparagus,0.83,each,30,https://picsum.photos/seed/asparagus/300/200
A21,Kitty Litter,18.99,each,24,https://picsum.photos/seed/rice/300/200
CA6,Cake,4.50,1 kg,18,https://picsum.photos/seed/beans/300/200
X99,Extra,1.00,each,5,https://picsum.photos/seed/x/300/200
`;
        const file = makeFile('storec.csv', csv);
        const items = await parseProductsFile(file);
        expect(items.length).toBe(3);
        expect(items[0]).toMatchObject({ id: 'G95', name: 'Asparagus', price: 0.83 });
    });
});
