let arr = ["apple", "oranges", " ", "mango", " ", "lemon"];

arr = arr.map((fruit) => {
  return fruit == " " ? "empty string" : fruit;
});

console.log(arr);
