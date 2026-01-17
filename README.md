                                                           Task Manager App

A simple Task Manager web application built with HTML, CSS, and JavaScript. The app allows users to add tasks, track their status, filter by category, and automatically detect overdue tasks. All data is saved using the browser’s localStorage, so tasks persist after refreshing the page.

How the App Works

Adding Tasks
Users enter a task name, category, deadline, and status. When the Add Task button is clicked, the task is stored as an object in an array and saved to localStorage.

Displaying Tasks
On page load, tasks are retrieved from localStorage and rendered dynamically into a list using JavaScript DOM manipulation.

Updating Task Status
Each task (except overdue ones) includes a status dropdown. Changing the status updates the task instantly and saves the change to localStorage.

Overdue Detection
The app compares each task’s deadline with the current date. If a task is not completed and the deadline has passed, its status is automatically marked as Overdue and highlighted.

Filtering by Category
Users can filter tasks by selecting a category from a dropdown. Only tasks matching the selected category are displayed.


Technologies Used

HTML5, CSS3, JavaScript, Browser localStorage

Running the App

Simply open index.html in a web browser. No installation or server setup is required.