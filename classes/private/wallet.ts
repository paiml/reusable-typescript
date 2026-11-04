// JavaScript's #private: Node itself keeps it inside the class.
class Wallet {
  #balance: number;

  constructor(opening: number) {
    this.#balance = opening;
  }

  deposit(amount: number): number {
    this.#balance += amount;
    return this.#balance;
  }
}

const pocket = new Wallet(100);
console.log(pocket.deposit(50));
console.log(pocket.#balance);
