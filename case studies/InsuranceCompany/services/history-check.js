const { Client, logger, Variables} = require('camunda-external-task-client-js');
const open = require('open');

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
//  - 'asyncResponseTimeout': long polling timeout (then a new request will be issued)
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 10000 };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'charge-card'
client.subscribe('history-check', async function({ task, taskService }) {
  // Put your business logic here
  
  // Get a process variable
  console.log(task.variables.getAllTyped());

  const username = task.variables.get('username');
  const password = task.variables.get('password');
  const process_vars = new Variables();
  
  if (username == "demo" && password == "demo") {
    process_vars.set("reliability","true");
  }
  else {
    process_vars.set("reliability","false");
  }
  //console.log(task.variables.getAllTyped());
  console.log("CHECK SUCCESS");
  // Complete the task
  await taskService.complete(task,process_vars);
});
