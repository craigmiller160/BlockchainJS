import { Block } from './Block';

export class Blockchain<D> {
    #chain: ReadonlyArray<Block<D>>;
    #difficulty: number = 0;
    readonly #difficultyDivisor: number;
    constructor(difficultyDivisor: number = 5) {
        this.#chain = [Block.genesis<D>()];
        this.#difficultyDivisor = difficultyDivisor;
    }

    getLatestBlock(): Block<D> {
        return this.#chain[this.#chain.length - 1];
    }

    getChain(): ReadonlyArray<Block<D>> {
        return this.#chain;
    }

    addBlock(newBlock: Block<D>) {
        const index = this.#chain.length;
        const integratedNewBlock = newBlock.withBlockchainIntegration(this.#difficulty, index, this.getLatestBlock().hash);
        this.#chain = [
            ...this.#chain,
            integratedNewBlock
        ];
        this.#difficulty = Math.round(this.#chain.length / this.#difficultyDivisor);
    }

    isChainValid(): boolean {
        return this.#chain.slice(1)
            .reduce((status: boolean, block, index, currentChain) => {
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