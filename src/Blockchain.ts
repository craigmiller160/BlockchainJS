import { Block } from './Block';

export class Blockchain {
    #chain: ReadonlyArray<Block>;
    #difficulty: number = 0;
    readonly #difficultyDivisor: number;
    constructor(difficultyDivisor: number = 5) {
        this.#chain = [Block.genesis()];
        this.#difficultyDivisor = difficultyDivisor;
    }

    getLatestBlock(): Block {
        return this.#chain[this.#chain.length - 1];
    }

    getChain(): ReadonlyArray<Block> {
        return this.#chain;
    }

    addBlock(newBlock: Block) {
        const integratedNewBlock = newBlock.withBlockchainIntegration(this.#difficulty, this.getLatestBlock().hash);
        this.#chain = [
            ...this.#chain,
            integratedNewBlock
        ];
        this.#difficulty = Math.round(this.#chain.length / this.#difficultyDivisor);
    }

    isChainValid(): boolean {
        return this.#chain.slice(1)
            .reduce((status: boolean, block, index) => {
                if (!status) {
                    return status;
                }
                // 'index' in reduce after slice is actually 'index - 1' on the base chain
                const prevBlock = this.#chain[index];
                const [calcHash,calcNonce] = block.calculateHashAndNonce();

                return block.hash === calcHash &&
                    block.nonce === calcNonce &&
                    block.previousHash === prevBlock.hash;
            }, true);
    }

}