//Given a student object as shown below can you write code to iterate through object and find average age of students.

studentobj = {
  yash: 27,
  vaibhav: 27,
  rajesh: 25,
};

let sum = 0;
let count = 0;
for (let key in studentobj) {
  //for (key in obj)
  sum += studentobj[key];
  count++;
}
console.log(sum / count);
