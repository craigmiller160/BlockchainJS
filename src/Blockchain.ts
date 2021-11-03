import { format } from 'date-fns';
import { Block } from './Block';

const TIMESTAMP_FORMAT = 'yyyyMMddHHmmssSSS';

export class Blockchain {
    static #createGenesisBlock(): Block {
        return new Block(0, format(new Date(), TIMESTAMP_FORMAT), 'Genesis Block', '');
    }

    readonly chain: Block[];
    constructor() {
        this.chain = [Blockchain.#createGenesisBlock()];
    }

}