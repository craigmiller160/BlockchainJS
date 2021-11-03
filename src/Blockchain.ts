import { Block } from './Block';

export class Blockchain {
    static #createGenesisBlock(): Block {
        return new Block('Genesis Block');
    }

    private chain: ReadonlyArray<Block>;
    constructor(existingChain?: ReadonlyArray<Block>) {
        this.chain = existingChain ?? [Blockchain.#createGenesisBlock()];
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    getChain(): ReadonlyArray<Block> {
        return this.chain;
    }

    withNewBlock(newBlock: Block): Blockchain {
        const index = this.chain.length;
        const newBlockWithPreviousHash = newBlock.withIndexAndPreviousHash(index, this.getLatestBlock().hash);
        const newChain: ReadonlyArray<Block> = [
            ...this.chain,
            newBlockWithPreviousHash
        ];
        return new Blockchain(newChain);
    }

    addBlock(newBlock: Block) {
        const index = this.chain.length;
        const newBlockWithPreviousHash = newBlock.withIndexAndPreviousHash(index, this.getLatestBlock().hash);
        this.chain = [
            ...this.chain,
            newBlockWithPreviousHash
        ];
    }

}