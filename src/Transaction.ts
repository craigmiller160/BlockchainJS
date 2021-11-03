// TODO make this an interface
export class Transaction {
    constructor(
        public amount: number,
        public toAddress: string,
        public fromAddress?: string
    ) {}
}