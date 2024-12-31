const fs = require('fs');
const fileName = 'tasks.json';

let tasks = []; // Initialize an empty task list

function startApp(name) {
  loadTasks();
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
}

function loadTasks() {
  try {
    const data = fs.readFileSync(fileName, 'utf8');
    tasks = JSON.parse(data); // Parse the JSON string into an array
  } catch (err) {
    tasks = []; // If there's an error (like the file doesn't exist), initialize an empty array
  }
}

function saveTasks() {
  fs.writeFileSync(fileName, JSON.stringify(tasks, null, 2), 'utf8');
}

function onDataReceived(text) {
  const trimmedText = text.trim(); // Remove extra spaces or newline characters
  const [command, ...args] = trimmedText.split(' '); // Split input into command and arguments

  if (command === 'quit' || command === 'exit') {
    quit();
  } else if (command === 'hello') {
    hello(args.join(' '));
  } else if (command === 'list') {
    listTasks();
  } else if (command === 'add') {
    add(args.join(' '));
  } else if (command === 'remove') {
    removeTask(args.join(' '));
  } else if (command === 'help') {
    help();
  } else {
    unknownCommand(trimmedText);
  }
}

function unknownCommand(c) {
  console.log(`Unknown command: "${c.trim()}"`);
}

function hello(name) {
  if (name) {
    console.log(`Hello ${name}!`);
  } else {
    console.log("Hello!");
  }
}

function listTasks() {
  if (tasks.length === 0) {
    console.log('No tasks found.');
  } else {
    console.log('Here are your tasks:');
    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });
  }
}

function add(task) {
  if (task.trim() === '') {
    console.log('Error: Please provide a task to add.');
  } else {
    tasks.push(task);
    saveTasks();
    console.log(`Task added: "${task}"`);
  }
}

function removeTask(argument) {
  if (argument === '') {
    if (tasks.length > 0) {
      const removedTask = tasks.pop();
      saveTasks();
      console.log(`Removed task: "${removedTask}"`);
    } else {
      console.log('No tasks to remove.');
    }
  } else {
    const index = parseInt(argument) - 1; // Convert to zero-based index
    if (isNaN(index)) {
      console.log('Invalid input. Please provide a valid task number.');
    } else if (index >= 0 && index < tasks.length) {
      const removedTask = tasks.splice(index, 1);
      saveTasks();
      console.log(`Removed task: "${removedTask[0]}"`);
    } else {
      console.log(`Task number ${argument} does not exist.`);
    }
  }
}

function help() {
  console.log("Available commands:");
  console.log("- list: Lists all tasks with their numbers.");
  console.log("- hello [name]: Greets the user. If a name is provided, it greets with the name.");
  console.log("- add [task]: Adds a new task to the list. If no task is provided, it shows an error.");
  console.log("- remove [n]: Removes the task at the specified position (1-based index). If no index is provided, removes the last task.");
  console.log("- quit: Exits the application.");
  console.log("- exit: Also exits the application.");
  console.log("- help: Displays this help message.");
}

function quit() {
  console.log('Quitting now, goodbye!');
  saveTasks(); // Save tasks before quitting
  process.exit();
}

// Start the application
startApp("Nour Alhouda");
console.log("this is the corrected version of file ");