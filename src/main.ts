import { Blockchain } from './Blockchain';
import {Transaction} from './Transaction';

const myCoinBlockChain = new Blockchain();

// TODO how to do initial transaction when no one has any coins?
// TODO how to validate that wallet has enough to send money?
myCoinBlockChain.addTransaction(new Transaction(100, 'address2', 'address1'));
myCoinBlockChain.addTransaction(new Transaction(50, 'address1', 'address2'));
myCoinBlockChain.minePendingTransactions('address3');

console.log(JSON.stringify(myCoinBlockChain.getChain(), null, 2));
console.log(`Is Chain Valid: ${myCoinBlockChain.isChainValid()}`);