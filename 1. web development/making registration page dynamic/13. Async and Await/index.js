// const wifeBringingTickets = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("wife brings ticket");
//   }, 3000);
// });

// console.log("person1 : ticket");
// console.log("person2 : ticket");

// const getPopcorn = wifeBringingTickets.then((t) => {
//   console.log(`person3 : ticket`);
//   console.log(t);
//   console.log(`wife : I need foood`);
//   return new Promise((resolve, reject) => resolve(`husband gets popcorn`));
// });

// const getButter = getPopcorn.then((t) => {
//   console.log(t);
//   console.log("husband: lets go in");
//   console.log("wife: I need chips");
//   return new Promise((resolve, reject) => {
//     resolve(`husband brings chips`);
//   });
// });

// getButter.then((t) => {
//   console.log(`${t}`);
//   console.log(`wife : let's go in`);
// });

// console.log("person4 : ticket");
// console.log("person5 : ticket");
//-------------------------------------------------------
/*

async function always returns a promise.
await can be only used inside async
*/

console.log("person1 : ticket");
console.log("person2 : ticket");

const premovie = async () => {
  const wifeBringingTickets = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("wife brings ticket");
    }, 3000);
  });

  const getpopcorn = new Promise((resolve, reject) =>
    resolve("husband brings popcorn")
  );
  const getChips = new Promise((resolve, reject) => {
    resolve(`husband brings chips`);
  });

  const getColdDrinks = new Promise((resolve, reject) => {
    resolve(`husband brings coke`);
  });

  let ticket; 
  //as we use await we dont need to use .then
  //the promise returns the value of resolve..
  try {
    ticket = await wifeBringingTickets;
  } catch {
    ticket = "sad face ";
  }
  console.log(`husbund brings : ${ticket}`);
  console.log(`wife : I need foood`);

  const popcorn = await getpopcorn; //promise after 'await' returns the value of resolve.

  console.log(popcorn);
  console.log("husband: lets go in");
  console.log("wife: I need chips");

  chips = await getChips;
  console.log(chips);
  console.log("husband: lets go in");
  console.log("wife: I want cold Drinks");

  const coldDrinks = await getColdDrinks;
  console.log(coldDrinks);

  return "all done";
};

premovie().then((t) => console.log(t)); //the returned value from the async function acts like resolved value.

console.log("person4 : ticket");
console.log("person5 : ticket");
