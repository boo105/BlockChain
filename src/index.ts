import * as CryptoJS from "crypto-js";

// 객체 구조는 Static , 변수, 생성자,함수 식으로 나열하는게 좋당
class Block
{
    static calculateBlockHas = (index : number, previousHas : string, timestamp : number, data : string) : string =>
        CryptoJS.SHA256(index + previousHas + timestamp + data).toString();

    static validateStructure = (aBlock : Block) : boolean => 
       typeof aBlock.index === "number" &&  
       typeof aBlock.hash === "string" && 
       typeof aBlock.previousHash === "string" && 
       typeof aBlock.timestamp === "number" && 
       typeof aBlock.data === "string";

    public index : number;
    public hash : string;
    public previousHash : string;
    public data : string;
    public timestamp : number;

    constructor(index : number, hash : string, previousHash : string, data : string, timestamp : number)
    {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock : Block = new Block(0,"20202020202020", "", "Hello",123456);

let blockchain : Block[] = [genesisBlock];

const getBlockchain = () : Block[] => blockchain;
const getLatestBlock = () : Block => blockchain[blockchain.length - 1];
const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string) : Block => 
{
    const previousBlock : Block = getLatestBlock();
    const newIndex : number = previousBlock.index + 1;
    const newTimestamp : number = getNewTimeStamp();
    const nextHash : string = Block.calculateBlockHas(newIndex, previousBlock.hash, newTimestamp, data);

    const newBlock : Block = new Block(newIndex, nextHash, previousBlock.hash, data, newTimestamp);

    addBlock(newBlock);

    return newBlock;
};

const getHashforBlock = (aBlock : Block) : string => Block.calculateBlockHas(aBlock.index, aBlock.previousHash, aBlock.timestamp,aBlock.data);

// 블록체인은 타임스탬프 어택, proof of work, 롱체인, 쇼트체인 등등 엄청 많다
// 여기서는 구조가 유효한지만 판별을 하고 나머지는 찾아서 구현해랑!
const isBlockValid = (candidateBlock : Block, previousBlock : Block) : boolean =>
{
    if(!Block.validateStructure(candidateBlock))
        return false;
    else if(previousBlock.index + 1 !== candidateBlock.index)
        return false;
    else if(previousBlock.hash !== candidateBlock.previousHash)
        return false;
    else if(getHashforBlock(candidateBlock) !== candidateBlock.hash)
        return false;
    else
        return true;
};

const addBlock = (candidateBlock : Block) : void  =>
{
    if(isBlockValid(candidateBlock,getLatestBlock()))
        blockchain.push(candidateBlock);
}

createNewBlock("Second Block");
createNewBlock("Third Block");
createNewBlock("Fourth Block");

console.log(blockchain);

export {};