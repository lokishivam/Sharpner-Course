let form = document.getElementById("my-form");
let remainingList = document.getElementById("remainingList");
let completedList = document.getElementById("completedList");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    let task = e.target.task.value;
    let details = e.target.details.value;
    let data = {
      task,
      details,
    };

    const li = document.createElement("li");
    li.innerHTML = `Task: ${task}     ||   Details: ${details}`;

    const del = document.createElement("BUTTON");
    del.innerHTML = "Delete";
    del.classList.add("delete");
    del.classList.add("actionBtn");
    li.appendChild(del);

    const done = document.createElement("BUTTON");
    done.innerHTML = "Done";
    done.classList.add("done");
    done.classList.add("actionBtn");
    li.appendChild(done);

    const resTaskObj = await axios.post(
      "http://localhost:3000/tasks/add-task",
      data
    );
    li.id = resTaskObj.data.id;
    remainingList.appendChild(li);

    e.target.task.value = "";
    e.target.details.value = "";
  } catch (error) {
    alert("operation failed, try again");
    console.log(error);
  }
});

remainingList.addEventListener("click", async (e) => {
  try {
    if (e.target.classList.contains("delete")) {
      let li = e.target.parentElement;
      let id = li.id;

      await axios.delete(`http://localhost:3000/tasks/delete/${id}`);
      li.remove();
    }

    if (e.target.classList.contains("done")) {
      const li = e.target.parentElement;
      let id = li.id;
      const res = await axios.get(
        `http://localhost:3000/tasks/update-task/${id}`
      );

      li.children[0].remove();
      li.children[0].remove(); //--li.children[1].remove(); after first removal we will have only one element left
      li.remove();
      completedList.appendChild(li);
    }
  } catch (error) {
    alert("failed");
    console.log(error);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:3000/tasks/get-tasks");
    const tasks = res.data;

    for (let task of tasks) {
      const li = document.createElement("li");
      li.innerHTML = `Task: ${task.task}     ||   Details: ${task.details}`;

      if (task.status) {
        li.id = task.id;
        completedList.appendChild(li);
      } else {
        const del = document.createElement("BUTTON");
        del.innerHTML = "Delete";
        del.classList.add("delete");
        del.classList.add("actionBtn");
        li.appendChild(del);

        const done = document.createElement("BUTTON");
        done.innerHTML = "Done";
        done.classList.add("done");
        done.classList.add("actionBtn");
        li.appendChild(done);

        li.id = task.id;
        remainingList.appendChild(li);
      }
    }
  } catch (error) {
    alert("failed to fetch data on reload");
    console.log(error);
  }
});
