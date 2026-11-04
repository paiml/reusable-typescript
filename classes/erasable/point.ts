// The constructor's parameters declare the fields: a parameter property.
class Point {
  constructor(public x: number, public y: number) {}
}

const corner = new Point(3, 4);
console.log(corner.x, corner.y);
