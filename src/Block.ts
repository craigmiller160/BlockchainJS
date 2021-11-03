import SHA256 from 'crypto-js/sha256';
import { format } from 'date-fns';
import {Transaction} from './Transaction';

const TIMESTAMP_FORMAT = 'yyyyMMddHHmmssSSS';

export class Block {
    static fromTransactions(transactions?: ReadonlyArray<Transaction>): Block {
        return new Block(transactions);
    }

    static genesis(): Block {
        return new Block();
    }

    readonly hash: string;
    readonly timestamp: string;
    readonly nonce: number;

    private constructor(
        public readonly transactions?: ReadonlyArray<Transaction>,
        public readonly previousHash: string = '',
        public readonly miningDifficulty: number = 0,
        timestamp?: string
    ) {
        this.timestamp = timestamp ?? format(new Date(), TIMESTAMP_FORMAT);
        const [hash,nonce] = this.calculateHashAndNonce();
        this.hash = hash;
        this.nonce = nonce;
    }

    calculateHashAndNonce(): [string,number] {
        let hash = '';
        let nonce = 0;
        while(hash.substring(0, this.miningDifficulty) !== Array(this.miningDifficulty + 1).join('0')) {
            hash = SHA256(nonce + this.previousHash + this.timestamp + JSON.stringify(this.transactions)).toString();
            nonce++;
        }
        return [hash,nonce];
    }

    withBlockchainIntegration(miningDifficulty: number, previousHash: string): Block {
        return new Block(this.transactions, previousHash, miningDifficulty, this.timestamp);
    }

}