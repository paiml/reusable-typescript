// The same class with its fields written out.
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const corner = new Point(3, 4);
console.log(corner.x, corner.y);
