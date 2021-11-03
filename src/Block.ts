import SHA256 from 'crypto-js/sha256';
import { format } from 'date-fns';


const TIMESTAMP_FORMAT = 'yyyyMMddHHmmssSSS';

export class Block<D> {
    static fromData<D>(data?: D): Block<D> {
        return new Block(data);
    }

    static genesis<D>(): Block<D> {
        return new Block();
    }

    hash: string; // TODO make it readonly again
    readonly timestamp: string;
    nonce: number = 0; // TODO make it readonly

    private constructor(
        public readonly data?: D,
        public readonly index: number = 0,
        public readonly previousHash: string = '',
        timestamp?: string,
        private readonly miningDifficulty: number = 0
    ) {
        this.timestamp = timestamp ?? format(new Date(), TIMESTAMP_FORMAT);
        this.hash = this.calculateHash();
    }

    calculateHash() {
        let hash = '';
        while(hash.substring(0, this.miningDifficulty) !== Array(this.miningDifficulty + 1).join('0')) {
            hash = SHA256(this.nonce + this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
            this.nonce++;
        }
        return hash;
    }

    withBlockchainIntegration(miningDifficulty: number, index: number, previousHash: string): Block<D> {
        return new Block(this.data, index, previousHash, this.timestamp, miningDifficulty);
    }

}