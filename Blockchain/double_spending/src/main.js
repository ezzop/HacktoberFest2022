const {CryptoBlockchain, CryptoBlock , Transaction}= require('./CryptoBlockchain');
const {NetworkObserver} = require('./NetworkObserver');
const EC= require('elliptic').ec;
const ec= new EC('secp256k1');

const myKey= ec.keyFromPrivate('7fe38a7cd191b531376ed5db174624ff3a474b736d824d174677e32aeb703c29');
const Key1= ec.keyFromPrivate('1c2e962350cbe889eeb39ab45728fa7e59624ad4d0b8af4f258a9dd439db3f8f');
const Key2= ec.keyFromPrivate('af68820d23d0857f56aefba0382a631f6e4d54056cbf2ad8d2f64fcc7d34441d');
const myWalletAddress = myKey.getPublic('hex');
const address1= Key1.getPublic('hex');
const address2= Key2.getPublic('hex');


function fetchAddress()
{
const key= ec.genKeyPair();
//generate a hexadecimal public key
const publicKey= key.getPublic('hex');
//generate a hexadecimal private key
const privateKey= key.getPrivate('hex');
const recvKey= ec.keyFromPrivate(privateKey);
const recvWalletAddress = recvKey.getPublic('hex');

return recvWalletAddress;
}

//console.log("\n\nInitial balance is: "+ 10);
const recv_address= fetchAddress();
new_address= fetchAddress();

global.smashingCoin = new CryptoBlockchain();

const sendAddr= [address2, myWalletAddress, myWalletAddress, address1];
const recvAddr= [fetchAddress(), recv_address, new_address, fetchAddress()];


const tx3 = new Transaction(address2,fetchAddress(),3);
tx3.signTransaction(Key2);
global.smashingCoin.addTransaction(tx3);


const tx1 = new Transaction(myWalletAddress,recv_address,10);
tx1.signTransaction(myKey);
global.smashingCoin.addTransaction(tx1);


const dsa_tx = new Transaction(myWalletAddress,new_address,10);
dsa_tx.signTransaction(myKey);
global.smashingCoin.addTransaction(dsa_tx);

const tx2 = new Transaction(address1,fetchAddress(),5);
tx2.signTransaction(Key1);
global.smashingCoin.addTransaction(tx2);


console.log("\nThe current blockchain is:");
console.log(global.smashingCoin);


console.log("\nStarting the miner...");

for(const addr of sendAddr)
{
global.smashingCoin.minePendingTransactions(addr);
}


const ne= new NetworkObserver(global.smashingCoin.pendingTransactions, global.smashingCoin);

ne.getRecords(sendAddr);
console.log("\nThe current blockchain is:");
console.log(global.smashingCoin);

for(var block in global.smashingCoin.blockchain)
{
	if(block.precedingHash== null)
	{
		global.smashingCoin.blockchain.splice(global.smashingCoin.blockchain.indexOf(block),1);
		let cb= new CryptoBlock(0,Date.now(),"0");
		global.smashingCoin.blockchain.push(cb);
	}
}

console.log("Current blockchain is:",global.smashingCoin);

console.log("\nPerforming Transactions:");
console.log("Current balance of address ",address2,"is: "+smashingCoin.getBalanceOfAddress(address2));
console.log("Current balance of address ",address1,"is: "+smashingCoin.getBalanceOfAddress(address1));

