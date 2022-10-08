const {PeerAlert}= require('./PeerAlert');

class NetworkObserver
{
    constructor(pending_transactions,cbc)
    {
        this.pending_transactions= pending_transactions;
        this.cbc= cbc; 
    }

    //Function to get transaction records of all sender addresses in a blockchain
    getRecords(sendAddr)
    {
    	for(const address of sendAddr)
    	{
	    	var initial_balance= global.smashingCoin.getBalanceOfAddress(address);
	    	//Number of Transactions for the blockchain
	    	var num=0;
	    	//Total amount to pay based on number of transactions
	    	var total_payment_amt= 0;
	    	//Array to store transaction amounts from this address
	    	var amts= new Array();

	    	for(const trans of this.pending_transactions){
	    		
	    		if(trans.fromAddress=== address)
	    		{
	    			num=num+1;
	    			total_payment_amt= total_payment_amt + trans.amount;
	    			amts.push(trans.amount);
	    		}
	    	}

	    	this.check_DoubleSpendingAttack(total_payment_amt, initial_balance, num, address, amts);
	    }
    }

    //Function to check for double spending attacks
    check_DoubleSpendingAttack(total, balance, num, address, amts)
    {
    	console.log("\nNumber of pending transactions from address: ");
    	console.log(address+" is:"+ num);
    	console.log("\nTotal payment amount is: ("+amts+")");
    	if(total>balance && num>1)
    	{
    		console.log("\nYour transaction has been aborted due to a suspected double-spending attack.");
    		console.log("\nPlease cancel your last transaction or try again later.");

    		var indices=[];

    		for(const trans of this.pending_transactions){
	    		if(trans.fromAddress=== address)
	    		{
	    			indices.push(this.pending_transactions.indexOf(trans));
	    		}
	    	}

	    	const peeralert= new PeerAlert(indices,this.cbc);
	    	this.cbc= peeralert.process();
    	}
    }

}

module.exports.NetworkObserver= NetworkObserver;