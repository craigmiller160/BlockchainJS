import { Blockchain } from './Blockchain';
import { Block } from './Block';

const myCoinBlockChain = new Blockchain();
// myCoinBlockChain.addBlock(Block.fromTransactions<MyCoin>([{ amount: 4 }]));
// myCoinBlockChain.addBlock(Block.fromTransactions<MyCoin>([{ amount: 10 }]));

console.log(JSON.stringify(myCoinBlockChain.getChain(), null, 2));
console.log(`Is Chain Valid: ${myCoinBlockChain.isChainValid()}`);