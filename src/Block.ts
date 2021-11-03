import SHA256 from 'crypto-js/sha256';

// TODO need to handle adding index when added to Blockchain and auto-generating timestamp
export class Block {
    readonly hash: string;

    constructor(
        public readonly index: number,
        public readonly timestamp: string,
        public readonly data: any,
        public readonly previousHash: string = ''
    ) {
        this.hash = this.#calculateHash();
    }

    #calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    withPreviousHash(previousHash: string): Block {
        return new Block(this.index, this.timestamp, this.data, previousHash);
    }

}