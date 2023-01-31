import {
    getSpareWeights
} from './getSpareWeights';

describe('getSpareWeights', () => {
    it('non-zero weights with 1 element', () => {
        const spareWeights = getSpareWeights([{ vaultId: 'A' }], [{ distribution: 100 }]);
        expect(spareWeights).toEqual([['A', 100]]);
    });

    it('non-zero weights with more elements', () => {
        const spareWeights = getSpareWeights([{ vaultId: 'A' }, { vaultId: 'C' }], [{ distribution: 50 }, { distribution: 50 }]);
        expect(spareWeights).toEqual([['A', 50], ['C', 50]]);
    });

    it('some zero weights with more elements', () => {
        const spareWeights = getSpareWeights([{ vaultId: 'A' }, { vaultId: 'C' }, { vaultId: 'D' }, { vaultId: 'E' }], [{ distribution: 50 }, { distribution: 30 }, { distribution: 0 }, { distribution: 20 }]);
        expect(spareWeights).toEqual([['A', 50], ['C', 30], ['E', 20]]);
    });

    it('length of vaults greater than length of weights', () => {
        const spareWeights = getSpareWeights([{ vaultId: 'A' }, { vaultId: 'C' }], [{ distribution: 50 }]);
        expect(spareWeights).toEqual([]);
    });

    it('length of vaults smaller than length of weights', () => {
        const spareWeights = getSpareWeights([{ vaultId: 'A' }], [{ distribution: 50 }, { distribution: 50 }]);
        expect(spareWeights).toEqual([]);
    });
});
