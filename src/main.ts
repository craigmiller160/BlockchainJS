import { Blockchain } from './Blockchain';
import { Block } from './Block';
import { MyCoin } from './MyCoin';

const myCoinBlockChain = new Blockchain<MyCoin>();
myCoinBlockChain.addBlock(new Block<MyCoin>({ amount: 4 }));
myCoinBlockChain.addBlock(new Block<MyCoin>({ amount: 10 }));

console.log(JSON.stringify(myCoinBlockChain.getChain(), null, 2));
console.log(`Is Chain Valid: ${myCoinBlockChain.isChainValid()}`);