// The constructor forgets to set the field.
class Counter {
  count: number;

  constructor(start: number) {
    console.log(`starting at ${start}`);
  }

  increment(): number {
    this.count += 1;
    return this.count;
  }
}

const clicks = new Counter(10);
console.log(clicks.increment());
