import SHA256 from 'crypto-js/sha256';
import { format } from 'date-fns';


const TIMESTAMP_FORMAT = 'yyyyMMddHHmmssSSS';

export class Block<D> {
    hash: string; // TODO make it readonly again
    readonly timestamp: string;
    nonce: number = 0; // TODO make it readonly

    constructor(
        public readonly data?: D,
        public readonly index: number = 0,
        public readonly previousHash: string = '',
        timestamp?: string
    ) {
        this.timestamp = timestamp ?? format(new Date(), TIMESTAMP_FORMAT);
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.nonce + this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    withIndexAndPreviousHash(index: number, previousHash: string): Block<D> {
        return new Block(this.data, index, previousHash, this.timestamp);
    }

    mineBlock(difficulty: number) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.hash = this.calculateHash();
            this.nonce++;
        }
        console.log(`Block mined: ${this.hash}`);
    }

}