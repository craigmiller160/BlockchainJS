import { format } from 'date-fns';
import { Block } from './Block';

const TIMESTAMP_FORMAT = 'yyyyMMddHHmmssSSS';

export class Blockchain {
    static #createGenesisBlock(): Block {
        return new Block(0, format(new Date(), TIMESTAMP_FORMAT), 'Genesis Block', '');
    }

    readonly chain: ReadonlyArray<Block>;
    constructor(existingChain?: ReadonlyArray<Block>) {
        this.chain = existingChain ?? [Blockchain.#createGenesisBlock()];
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    withNewBlock(newBlock: Block): Blockchain {
        const newBlockWithPreviousHash = newBlock.withPreviousHash(this.getLatestBlock().hash);
        const newChain: ReadonlyArray<Block> = [
            ...this.chain,
            newBlockWithPreviousHash
        ];
        return new Blockchain(newChain);
    }

}