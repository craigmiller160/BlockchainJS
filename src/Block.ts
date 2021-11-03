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

    readonly hash: string;
    readonly timestamp: string;
    readonly nonce: number;

    private constructor(
        public readonly data?: D,
        public readonly index: number = 0,
        public readonly previousHash: string = '',
        timestamp?: string,
        public readonly miningDifficulty: number = 0
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
            hash = SHA256(nonce + this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
            nonce++;
        }
        return [hash,nonce];
    }

    withBlockchainIntegration(miningDifficulty: number, index: number, previousHash: string): Block<D> {
        return new Block(this.data, index, previousHash, this.timestamp, miningDifficulty);
    }

}