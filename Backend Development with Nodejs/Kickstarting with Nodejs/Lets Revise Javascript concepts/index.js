const product = (a, b) => a * b;

console.log(product(3, 4));

const stud = {
  name: "Harry",
  lastName: "Potter",

  fullname() {
    console.log(`My name is ${this.name} ${this.lastName}`);
  },
};

stud.fullname();
