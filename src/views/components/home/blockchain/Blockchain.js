import Block from "./Block";
import Transaction from "./Transaction";

class Blockchain {
  constructor(difficulty) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(new Date(0), {}, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  mineBlock(rewardAddress) {
    this.pendingTransactions.push(
      new Transaction(
        "Reward System",
        rewardAddress,
        this.miningReward,
      ),
    );
    let block = new Block(
      new Date(),
      this.pendingTransactions,
      this.getLatestBlock().hash,
      rewardAddress,
    );
    block.mineBlock(this.difficulty);
    this.chain.push(block);
    this.pendingTransactions = [];
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

export default Blockchain;
