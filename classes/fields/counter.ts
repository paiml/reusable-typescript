// A class with a field, a constructor that sets it, and a method.
class Counter {
  count: number;

  constructor(start: number) {
    this.count = start;
  }

  increment(): number {
    this.count += 1;
    return this.count;
  }
}

const clicks = new Counter(10);
clicks.increment();
console.log(clicks.increment());
