import { Block } from './Block';
import {Transaction} from './Transaction';

export class Blockchain {
    #chain: ReadonlyArray<Block>;
    #difficulty: number = 0;
    readonly #difficultyDivisor: number;
    #pendingTransactions: ReadonlyArray<Transaction> = [];
    #miningReward: number = 100;

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

    getBalanceOfAddress(address: string): number {
        return this.#chain.reduce((balance, block) => {
            return balance + block.transactions.reduce((blockBalance, transaction) => {
                if (transaction.fromAddress === address) {
                    return blockBalance - transaction.amount;
                }

                if (transaction.toAddress === address) {
                    return blockBalance + transaction.amount;
                }
                return blockBalance;
            }, 0);
        }, 0);
    }

    addTransaction(transaction: Transaction) {
        this.#pendingTransactions = [
            ...this.#pendingTransactions,
            transaction
        ];
    }

    minePendingTransactions(miningRewardAddress: string) {
        const block = Block.fromTransactions(this.#pendingTransactions);
        const integratedBlock = block.withBlockchainIntegration(this.#difficulty, this.getLatestBlock().hash);
        this.#chain = [
            ...this.#chain,
            integratedBlock
        ];
        this.#difficulty = Math.round(this.#chain.length / this.#difficultyDivisor);
        this.#pendingTransactions = [
            new Transaction(this.#miningReward, miningRewardAddress)
        ];
    }

    isChainValid(): boolean {
        return this.#chain.slice(1)
            .reduce((status: boolean, block, index) => {
                if (!status) {
                    return status;
                }
                // 'index' in reduce after slice is actually 'index - 1' on the base chain
                const prevBlock = this.#chain[index];
                const calcHash = block.calculateHash();

                return block.hash === calcHash &&
                    block.previousHash === prevBlock.hash;
            }, true);
    }

}