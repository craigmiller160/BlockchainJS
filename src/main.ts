import { Blockchain } from './Blockchain';
import { Block } from './Block';

const myCoinBlockChain = new Blockchain();
myCoinBlockChain.addBlock(new Block(1, 'abc', { amount: 4 }));
myCoinBlockChain.addBlock(new Block(2, 'def', { amount: 10 }));

console.log(JSON.stringify(myCoinBlockChain, null, 2));