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
client.subscribe('condition-provider', async function({ task, taskService }) {
  // Put your business logic here
  
  // Get a process variable
  const process_vars = new Variables();
  const conditions = "Price estimated for your item is too high to get this contract. You should change insurance policy or try with another item";
  
  process_vars.set("conditions",conditions);
  console.log("SUCCESS");
  // Complete the task
  await taskService.complete(task,process_vars);
});
