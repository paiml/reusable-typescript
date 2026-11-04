// A read-only field can be set in the constructor, and never again.
class Ticket {
  readonly id: string;
  seat: string;

  constructor(id: string, seat: string) {
    this.id = id;
    this.seat = seat;
  }
}

const ticket = new Ticket("T-100", "12A");
ticket.seat = "14C";
ticket.id = "T-999";
console.log(ticket.id, ticket.seat);
