
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  loadTasks();
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}
/**fs module */

const fs = require('fs');
const fileName = 'tasks.json';


// Load tasks from the file when the program starts
function loadTasks() {
  try {
    const data = fs.readFileSync('tasks.json', 'utf8');
    tasks = JSON.parse(data); // Parse the JSON string into an array
  } catch (err) {
    tasks = []; // If there's an error (like the file doesn't exist), initialize an empty array
  }
}

// Save tasks to the file
function saveTasks() {
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2), 'utf8');
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  const trimmedText = text.trim(); // Remove any extra spaces or newline characters
  const [command, ...args] = trimmedText.split(' '); // Split input into command and arguments
  text=text.trim();


  if (text.trim() === 'quit' || text.trim() === 'exit') {
    quit();
  }
  else if (text.startsWith('hello ')) {
    const name = text.substring(6); // Extract the name after "hello "
    hello(name);
  }
  else if (text === 'remove') {
    removeTask(args.join(' ')); // Pass arguments to removeTask
  } 
  else if (text === 'hello') { 
    hello(); 
  }
   else if (text === 'list') {
    listTasks();
  } 
  /**else if (text === 'add') {
    addTask(argument);
  }*/
    else if(text.split(" ")[0].replace("\n","") === "add"){
      add(text.replace("\n","").split(" ").slice(1));
      add(args.join(' ')); // Pass arguments to add
    }
  
  else if (text.trim() === 'help') {
    help();
  }
  
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Greets the user. If an argument is provided, includes it in the greeting.
 * 
 * @param {string} [name] - Optional argument to include in the greeting.
 * @returns {void}
 */
/*
function hello(name) {
  console.log(`Hello ${name}!`);
}
**/
function hello(name) { 
  if (name) {
    console.log(`Hello ${name}!`); 
  } else {
    console.log("Hello!"); 
  }
}
/**Define the taskes */
let tasks = ['Buy groceries',
           'Clean the house',
           '30min exercise',
           'View the record lectures', 
           'Study JavaScript',
           'Update portfolio website',
           'English practice on YouTube',
           'Finish the stage report',
           'Prepare for presentation'
            ];
/**function list 
 * Lists all tasks with their numbers.
 * 
 * @returns {void}
 */
/*function listTasks(){
  for(let i=0; i<tasks.length; i++)
    console.log((i+1)+"- "+tasks[i]);
}*/
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

/** add task
function add(task) {
  if (task != "")
    tasks.push(task);
  else {
    console.log("error");
  }
} */
  function add(task) {
    if (task.length === 0) {
      console.log('Error: Please provide a task to add.');
    } else {
      const newtask = task.join(" "); // Combine the array into a string
      tasks.push(newtask); // Add the string to the task list
      saveTasks();
      console.log(`Task added: "${newtask}"`);
    }
  }


  /** remove function */


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




/**
 * help command
 * 
 * Displays a list of all available commands and their descriptions.
 * This function does not return anything; it only outputs the list to the console.
 * 
 * @returns{}
 */
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
/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("NOUR Alhouda")
