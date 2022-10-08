# Double_spending
This repository contains code for my project on the topic- Preventing double-spending attacks in cryptocurrency blockchains using network observers and peer-alert systems. 

## Objective  
In this project, to overcome the issues in the existing system, network observers are used that can track anomalous transactions performed without authorization. 
Additionally, to notify the sender and receiver about the unauthorized transaction, a peer alert system is designed such that the message is passed from the fraudulent node to the sender and receiver nodes. 

## Proposed System  

**Network observers**: 
* The network observers are placed between each pair of nodes. 
* A sender node, that contains the transaction amount, transaction ID and sender details will transfer this information to the neighbouring node. 
* The neighbouring node will then transfer this to the corresponding forward node, after performing the transaction step. This continues till the receiver node, receives the amount. 
* The observers within each pair of nodes, will keep a record of the user ids, the number of transactions and amounts issued by them. 
* With this record, an observer will check the frequency of node communications in its node pair based on the number of transactions issued by the user. 
* If the frequency is higher than what is required, the anomaly will be logged, and the transaction will be aborted with an acknowledgement sent back to the sender node. 

**Peer Alert Systems**
* When a network observer observes an anomaly at one of the transaction steps between a node-pair, the surrounding nodes are alerted about the fraudulent transaction. 
* This will help the neighbouring nodes terminate their connections with the fraudulent node pair, such that their transactions can be performed along other safe routes. 

## Blockchain Architecture  

![image](https://user-images.githubusercontent.com/63350417/165631842-0db1cae6-1e60-458d-8b57-35f26e33ceab.png)

## Model Overview 
![image](https://user-images.githubusercontent.com/63350417/165631931-65fbafa5-d672-4e60-84d1-e14ddf4635e1.png)

## Implementation
To start the initial blockchain, run the following command after entering the directory from the command line or terminal:  

```node CryptoBlockchain.js```
```node main.js```

You will see the created nodes as follows:  
  ![image](https://user-images.githubusercontent.com/63350417/165632172-e26bec27-879a-4c14-8aa6-f5504e2e0f5e.png)


**Additional Security**

To increase security, a random nonce generator is used, that will be used in the hash creation. Moreover, to increase the time taken to mine individual blocks, a difficulty index is used to append additional zeros to the generated hash, which increases the mining time complexity. Also to validate the cryptocurrency blockchain, for every pair consisting of the current block and its preceding block, a two-fold validation methodology is utilized.   

1. The hash of the current block is recomputed with the same nonce, and the original and recomputed hash values are compared.  
2. The preceding hash of the current block and the hash of the preceding block are compared.  

If a mismatch is found in either of these two steps, the validation function returns an error.  

The resulting cryptocurrency blockchain after integrating these additional functionalities is as follows:  

  ![image](https://user-images.githubusercontent.com/63350417/165632270-5530ae0b-3bb2-49f9-8a31-9804a8c71014.png)
 

Here, the red highlights denote the appended zeros based on the difficulty index and the green highlights are the random nonces generated to compute the hash for every new block is added.

When we observe and log the output of the check chain validity function, before tampering with any one of the blocks, it returns the value true, implying that the blockchain is valid.

```console.log("Is the blockchain valid?"+ smashingCoin.checkChainValidity());```


  ![image](https://user-images.githubusercontent.com/63350417/165632366-9ce27587-6562-45d0-afe8-ae3a3a2960b9.png)



If instead we try to change the transfer quantity of block 1 from 50 to 200 in the chain, the function returns a value of false, implying an authentication error. 

```smashingCoin.blockchain[1].data = {amount: 200};```

![image](https://user-images.githubusercontent.com/63350417/165632438-bed1c954-aa3b-4d94-bad2-3a19a8d21b47.png)

 

**Performing Transactions**  

To perform transactions between the intended sender and recipient blocks or nodes, their addresses are mined, such that the transaction amount can be deducted from the sender node and added to the receiver node. An array contains the records of pending transactions for every block starting with a null amount transaction for the genesis block, and subsequently stores every new transaction. 

An example for demonstration is as follows, the first block sends 100 cryptocurrency units to the second block. The second block in turn returns 50 cryptocurrency units back to the first block. Hence the transaction array will contain the details of the transactions with amounts null, 100 and 50 respectively. After every successfull transaction for a particular genesis block, a mining reward of 100 points is added to its balance.  

```let smashingCoin = new CryptoBlockchain();
smashingCoin.createTransaction( new Transaction("addr1","addr2",100));
smashingCoin.createTransaction( new Transaction("addr2","addr1",50));

console.log("Starting the miner...");
smashingCoin.minePendingTransactions("myAddress");
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress('myAddress'));

console.log("Starting the miner again...");
smashingCoin.minePendingTransactions("myAddress");
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress('myAddress'));
```


  ![image](https://user-images.githubusercontent.com/63350417/165633899-717c3784-ce61-4288-b480-5f4d383e624b.png)

  
**Signature**  

To ensure that every transaction is unique, it is signed with a signature which is generated using the private and public key and calculated hash for a block, using the elliptic library (based on elliptic curve cryptography). This is also used as a security measure to authenticate every transaction. The following image describes a transaction of 10 cryptocurrency units from the genesis block, and a reception of 100 cryptocurrency units by the genesis block.  

```let smashingCoin = new CryptoBlockchain();

const tx1 = new Transaction(myWalletAddress,'public_key',10);
tx1.signTransaction(myKey);
smashingCoin.addTransaction(tx1);

console.log("Starting the miner...");
smashingCoin.minePendingTransactions(myWalletAddress);
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress(myWalletAddress));

console.log("Starting the miner again...");
smashingCoin.minePendingTransactions(myWalletAddress);
console.log("Your balance is: "+smashingCoin.getBalanceOfAddress(myWalletAddress));
```
![image](https://user-images.githubusercontent.com/63350417/165635247-37011220-8381-421c-823a-f096d7800c89.png)



**Double Spending Attack**  

When a sender tries to perform the same transaction (with the same amount) twice, but with two different receivers, even though his initial balance is not sufficient to satisfy both the transactions, a double spending attack occurs. This can be illustrated in the below example. Considering a sender to have 10 cryptocurrency units, who plans to give these 10 units to 2 different receivers, concurrently, across separate blocks. For both these transactions to occur, a total of 20 units should be available with the sender, whereas he has just 10, implying that he plans to reuse the same money of the first transaction, in the second transaction, such that the 10 units is deducted at the same time (so only 10 units is deducted from his balance finally).

```global.smashingCoin = new CryptoBlockchain();

const recv_address= fetchAddress();

const tx1 = new Transaction(myWalletAddress,recv_address,10);
tx1.signTransaction(myKey);
global.smashingCoin.addTransaction(tx1);

console.log(global.smashingCoin.pendingTransactions)

new_address= fetchAddress();

const dsa_tx = new Transaction(myWalletAddress,new_address,10);
dsa_tx.signTransaction(myKey);
global.smashingCoin.addTransaction(dsa_tx);

console.log(global.smashingCoin.pendingTransactions)
```  

![image](https://user-images.githubusercontent.com/63350417/165635334-c467242f-f588-4fb1-8e5d-8d3960720964.png)

As seen above, the same sender hash address (highlighted in yellow) is involved in two transactions of 10 cryptocurrency units each (underlined in blue), but with different receiver hash addresses. Thus, if these 2 transactions are performed simultaneously (i.e. at the same timestamp), only 10 units will be deducted from his balance at the same time, whereas his actual deduction amount should be 20. The sender can thus exploit this issue to his advantage, and perform many such transactions, but by paying only half the actual amount.  

**Network Observers**  

A network observer will check the number of pending transactions from a particular sender address in a blockchain. If the payment amount of two pending transactions from that address is the same, and the total amount is greater than the initial balance of the sender, a transaction aborted error will be displayed, and the user will be prompted to either cancel the last transaction with the same amount, or to try performing the transaction later.  

```
if(total>balance && num>1)
{
console.log("\nYour transaction has been aborted due to a suspected double-spending attack.");
console.log("\nPlease cancel your last transaction or try again later.");
}
```  

![image](https://user-images.githubusercontent.com/63350417/165635383-52939733-eb0c-4304-bc6b-34241a60864d.png)

**Peer Alert Systems**  

In order to disconnect from the block where the fraudulent transaction or double spending attack has taken place, the neighbouring blocks are alerted. Any subsequent transactions that are scheduled for this block are redirected to other routes, and these neighbouring blocks terminate their connections with it. The sender (who wanted to conduct the double spending attack), has to either withdraw any one of the transactions within a given timeout period, or will be blocked temporarily before being able to perform any new transactions again.  

Creating four new transactions in the blockchain:  


  ![image](https://user-images.githubusercontent.com/63350417/165635422-aaace530-9f9d-4b71-90b6-c52d6f330576.png)


Displaying the current blockchain with the genesis block:  

![image](https://user-images.githubusercontent.com/63350417/165635444-7653d71b-ffb0-418a-b329-127518130d96.png)

Mining blocks to perform the transactions:  

![image](https://user-images.githubusercontent.com/63350417/165635470-277ecd23-8c97-426f-91aa-78dec647f204.png)

A double spending attack occurs in the blockchain. The network observer throws an error, asking the user to delete the last transaction, or be temporarily suspended. After this, the peer alert system will terminate connections of the other blocks to the fraudulent blocks (alerting neighbouring blocks) as shown below:  

![image](https://user-images.githubusercontent.com/63350417/165635553-8a1debca-136f-4923-a4ef-4c6a9e5e6dff.png)
Therefore, due to the double spending attack, the number of transactions reduces from four to two (the ones involved in the attack are aborted). The peer alert system will nullify the preceding hash of blocks that had fraudulent blocks preceding them, due to the fact that the preceding hash is used as one of the parameters to calculate the current hash of any block.  

![image](https://user-images.githubusercontent.com/63350417/165635593-40909d4c-8fd8-4915-aca4-17b75c7ac518.png)

To overcome this issue of having a null preceding hash, this block is replaced with a new genesis block, with a preceding hash of '0'. This will also lead to a new current hash being generated, that can be used to perform the same transaction as before (Change of transaction route).  

![image](https://user-images.githubusercontent.com/63350417/165635620-df834b48-9986-49e3-9c6e-1ad9422a5e9a.png)

Finally, after only genuine transactions are contained in the blockchain, they are processed, and the balances of each of the addresses are updated accordingly.  

![image](https://user-images.githubusercontent.com/63350417/165635657-8c78b462-ce99-4ce9-8171-9ec3600629fb.png)
