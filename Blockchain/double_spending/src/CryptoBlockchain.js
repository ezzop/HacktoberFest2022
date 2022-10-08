const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { NetworkObserver } = require('./NetworkObserver');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transaction for other wallets.');
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid() {
        if (this.fromAddress === null) {
            console.log("1");
            return true;
        }

        if (this.signature.length === 0) {
            throw new Error('No signature in this transaction.');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        console.log("\nNew Transaction");
        console.log("\nThe signature is: " + this.signature);
        return publicKey.verify(this.calculateHash(), this.signature);

    }
}

class CryptoBlock {
    constructor(timestamp, transactions, precedingHash = " ") {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
        this.nonce = 0;
        this.ne = null;
    }

    //Function to compute the current hash based on the preceding hash, timestamp, transactions and random nonce
    computeHash() {
        return SHA256(
            this.precedingHash +
            this.timestamp +
            JSON.stringify(this.transactions) +
            this.nonce
        ).toString();
    }

    //To increase difficulty level while mining blocks by appending extra zeros to the hash
    mineBlock(difficulty) {
        while (
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
        ) {
            this.nonce++;
            this.hash = this.computeHash();
        }
        console.log("Block Mined: " + this.hash);
        console.log("Timestamp: " + this.timestamp);
        //this.ne= new NetworkObserver(this.hash);
    }
}

class CryptoBlockchain {
    constructor() {
        this.currenthash = "0";
        this.blockchain = [this.startGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = ["0"];
        this.miningReward = 10;
    }

    //Function to create initial block in the crytocurrency blockchain
    startGenesisBlock() {
        let cb = new CryptoBlock(0, Date.now(), "0");
        this.currenthash = cb.hash;
        return cb;
    }

    //Function to receive the latest block in the cryptocurrency blockchain
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    //Function to add an additional block to the blockchain and create an empty transaction for this block
    minePendingTransactions(miningRewardAddress) {
        let block = new CryptoBlock(Date.now(), this.pendingTransactions, this.currenthash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.blockchain.push(block);
        //Pop the completed transaction
        //this.pendingTransactions.push(new Transaction(null, miningRewardAddress, this.miningReward));

        this.currenthash = block.hash;

    }

    //Add new transaction to log array
    addTransaction(transaction) {

        if (!transaction.fromAddress || !transaction.toAddress) {
            console.log(transaction.fromAddress);
            console.log(transaction.toAddress);
            throw new Error('Transaction must include from and to address');
        }

        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to blockchain');
        }

        this.pendingTransactions.push(transaction);
    }


    //Function to perform the transaction between the intended sender and recipient blocks given their addresses
    getBalanceOfAddress(address) {
        var balance = 10;
        console.log("\nInitial balance was: " + balance);

        for (const block of this.blockchain) {

            if (block.transactions.length > 0) {
                for (const trans of block.transactions) {
                    if (trans.fromAddress === address) {
                        balance -= trans.amount;
                        //this.pendingTransactions.splice(this.pendingTransactions.indexOf(trans),1);
                    }

                    if (trans.toAddress === address) {
                        balance += trans.amount;
                    }

                }
            }
        }

        return balance;
    }

    //Function to authenticate every pair of nodes/blocks in the cryptocurrency blockchain
    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }

            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }

            if (currentBlock.precedingHash !== precedingBlock.hash) return false;
        }
        return true;
    }
}

module.exports.CryptoBlockchain = CryptoBlockchain;
module.exports.CryptoBlock = CryptoBlock;
module.exports.Transaction = Transaction;