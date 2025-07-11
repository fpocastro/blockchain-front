const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, transactions, previousHash = "", miner = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
    this.miner = miner;
  }

  calculateHash() {
    return SHA256(
      this.timestamp +
        this.previousHash +
        JSON.stringify(this.transactions) +
        this.nonce,
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    this.difficulty = difficulty;
  }
}

export default Block;
