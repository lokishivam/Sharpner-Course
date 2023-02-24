const posts = [];
let lastTime = new Date();

function getPosts() {
  for (let key in posts) {
    console.log(posts[key]);
  }
  console.log(lastTime);
}

function updateLastActivityTime() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      lastDate = new Date();
      resolve();
    }, 1000);
  });
}

function createpost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      resolve();
    }, 1000);
  });
}

function deletePost() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (posts.length > 0) {
        const poppedElement = posts.pop();
        resolve(poppedElement);
      } else {
        reject("ERROR: ARRAY IS EMPTY");
      }
    }, 1000);
  });
}

const promise1 = createpost({ name: "harris" });
const promise2 = createpost({ name: "ravi" });
const promise3 = createpost({ name: "shar" });
const promise4 = updateLastActivityTime();

Promise.all([promise1, promise2, promise3, promise4]).then(() => getPosts());
