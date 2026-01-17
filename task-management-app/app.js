//getting tasks from local storage
let taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
//selecting elements and assigning it to variables
let taskName = document.getElementById("taskName");
let taskCategory = document.getElementById("taskCategory");
let taskDeadline = document.getElementById("taskDeadline");
let taskStatus = document.getElementById("taskStatus");
let addTaskButton = document.getElementById("addTaskButton");
let taskList = document.getElementById("taskList");
let filterCategoryDropdown = document.getElementById("filterCategory");

//Listing all the tasks from the local storage
document.addEventListener("DOMContentLoaded", () => {
  renderTask();
});

//add click event to add task button
addTaskButton.addEventListener("click", function () {
  //create an object and assign values
  let task = {
    taskname: taskName.value,
    category: taskCategory.value,
    deadline: taskDeadline.value,
    status: taskStatus.value,
  };
  // checking for the valid input
  if (!task.taskname || !task.category || !task.deadline || !task.status) {
    alert("Please enter an item.");
    return; //exit the function
  }
  //add object to the array
  taskArray.push(task);
  // creating the list based off the array
  renderTask();
  //clear input fields
  taskName.value = "";
  taskCategory.value = "";
  taskDeadline.value = "";
  taskStatus.value = "In Progress";
});

function setLocalStorage() {
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

// Function to check if a task is overdue
function checkOverdue(task) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // console.log(today);
  // console.log(task.deadline);
  const deadlineDate = new Date(task.deadline + "T00:00");
  deadlineDate.setHours(0, 0, 0, 0);
  // console.log(deadlineDate);
  // If task is not completed and deadline passed, mark as overdue
  if (task.status !== "Completed" && deadlineDate < today) {
    task.status = "Overdue";
  }
}

// function to add task to ul list
function renderTask() {
  //clearing the ul list
  taskList.innerHTML = "";
  // Loop for accessing the objects in the array
  for (let i = 0; i < taskArray.length; i++) {
    //Calling the checkOverdue function to check the deadline
    checkOverdue(taskArray[i]);

    // creating listitem and span tags for the task

    let listItem = document.createElement("li");
    const taskNameSpan = document.createElement("span");
    taskNameSpan.innerText = taskArray[i].taskname;
    listItem.appendChild(taskNameSpan);
    const categorySpan = document.createElement("span");
    categorySpan.innerText = taskArray[i].category;
    listItem.appendChild(categorySpan);
    const deadlineSpan = document.createElement("span");
    deadlineSpan.innerText = taskArray[i].deadline;
    listItem.appendChild(deadlineSpan);

    // Creating span and styling the Overdue tasks

    if (taskArray[i].status === "Overdue") {
      const overdueText = document.createElement("span");
      overdueText.textContent = "Overdue";
      overdueText.style.color = "red";
      overdueText.style.fontWeight = "bold";
      listItem.appendChild(overdueText);
    } else {
      // Creating status dropdown dynamically
      const statusDropdown = document.createElement("select");
      ["In Progress", "Completed", "Pending"].forEach((optionValue) => {
        const option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        if (taskArray[i].status === optionValue) option.selected = true;
        statusDropdown.appendChild(option);
      });

      // Update status dynamically
      statusDropdown.addEventListener("change", (e) => {
        taskArray[i].status = e.target.value;
        // Adding objects to the local storage
        setLocalStorage();
      });

      listItem.appendChild(statusDropdown);
    }
    //Adding listitem to the ul list
    taskList.appendChild(listItem);
  }
  // Adding objects to the local storage
  setLocalStorage();
}

//Adding an event listener to filter category
filterCategoryDropdown.addEventListener("change", function () {
  filterCategory();

  filterCategoryDropdown.value = "";
});

// Creating filter function to filter the tasks based o the category
function filterCategory() {
  taskList.innerHTML = "";

  for (let i = 0; i < taskArray.length; i++) {
    if (
      filterCategoryDropdown.value.toLowerCase() ===
      taskArray[i].category.toLowerCase()
    ) {

      
      let listItem = document.createElement("li");
      listItem.textContent =
        taskArray[i].taskname +
        "  " +
        taskArray[i].category +
        "  " +
        taskArray[i].deadline +
        "  " +
        taskArray[i].status;
      taskList.appendChild(listItem);
    }
  }
}
