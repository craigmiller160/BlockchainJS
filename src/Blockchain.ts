import { Block } from './Block';

export class Blockchain<D> {
    #chain: ReadonlyArray<Block<D>>;
    #difficulty: number = 2;
    constructor(existingChain?: ReadonlyArray<Block<D>>) {
        this.#chain = existingChain ?? [new Block()];
    }

    getLatestBlock(): Block<D> {
        return this.#chain[this.#chain.length - 1];
    }

    getChain(): ReadonlyArray<Block<D>> {
        return this.#chain;
    }

    addBlock(newBlock: Block<D>) {
        const index = this.#chain.length;
        const newBlockWithPreviousHash = newBlock.withIndexAndPreviousHash(index, this.getLatestBlock().hash);
        newBlockWithPreviousHash.mineBlock(this.#difficulty); // TODO incorporate it into the block creation
        this.#chain = [
            ...this.#chain,
            newBlockWithPreviousHash
        ];
    }

    isChainValid(): boolean {
        return this.#chain.slice(1)
            .reduce((status: boolean, block, index, currentChain) => {
                if (!status) {
                    return status;
                }
                // 'index' in reduce after slice is actually 'index - 1' on the base chain
                const prevBlock = this.#chain[index];

                return block.hash === block.calculateHash() &&
                    block.previousHash === prevBlock.hash;
            }, true);
    }

}