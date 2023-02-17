//constructor function
function Person(name, lastname, sex, age) {
  this.name = name;
  this.lastname = lastname;
  this.age = age;
  this.sex = sex;

  Person.prototype.getFullName = function () {
    console.log(`${this.name} ${this.lastname}`);
  };
}

Person.prototype.major = function () {
  return this.age >= 18;
};

const p1 = new Person("ram", "kumar", "M", 23);
console.log(p1.major());
p1.getFullName();

//ES6 class

class Person1 {
  constructor(name, lastname, sex, age) {
    this.name = name;
    this.lastname = lastname;
    this.age = age;
    this.sex = sex;
  }

  getFullName() {
    console.log(`${this.name} ${this.lastname}`);
  }
}

const p2 = new Person1("ram", "kumar", "M", 23);
// console.log(p1.major());
p2.getFullName();
