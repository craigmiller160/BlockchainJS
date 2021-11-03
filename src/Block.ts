import SHA256 from 'crypto-js/sha256';
import { format } from 'date-fns';


const TIMESTAMP_FORMAT = 'yyyyMMddHHmmssSSS';

export class Block<D> {
    readonly hash: string;
    readonly timestamp: string;

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
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    withIndexAndPreviousHash(index: number, previousHash: string): Block<D> {
        return new Block(this.data, index, previousHash, this.timestamp);
    }

}