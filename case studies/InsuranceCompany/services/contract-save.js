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
client.subscribe('contract-saving', async function({ task, taskService }) {
  // Save contract in a possible DB and close the insurance process
  const signature = task.variables.get("signature");
  console.log("Signature: " + signature);
  console.log("SUCCESS");
  // Complete the task
  await taskService.complete(task);
});
