
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
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
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
  text=text.trim();
  if (text.trim() === 'quit' || text.trim() === 'exit') {
    quit();
  }

  else if (text.startsWith('hello ')) {
    const name = text.substring(6); // Extract the name after "hello "
    hello(name);

  } else if (text.trim() === 'help') {
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

function hello(name) {
  console.log(`Hello ${name}!`);
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
  console.log("- hello: Greets the user.");
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
