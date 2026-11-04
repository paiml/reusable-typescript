// TypeScript's private: checked by tsc, gone when the code runs.
class Account {
  private balance: number;

  constructor(opening: number) {
    this.balance = opening;
  }

  deposit(amount: number): number {
    this.balance += amount;
    return this.balance;
  }
}

const savings = new Account(100);
console.log(savings.deposit(50));
console.log(savings.balance);
