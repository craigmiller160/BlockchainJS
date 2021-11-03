import SHA256 from 'crypto-js/sha256';

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

}