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
client.subscribe('estimate-price', async function({ task, taskService }) {
  // Put your business logic here
  
  // Get a process variable
  const item_id = task.variables.get('serial_number');
  const item_date = task.variables.get('date');
  const item_description = task.variables.get('description');
  const process_vars = new Variables();
  var estimation = false;
  var price;

  console.log("Item ID: " + item_id);
  console.log("Date: " + item_date);
  console.log("Product description: " + item_description);

  //Check if it is a good item
  if (item_id == "0000000000") {
    estimation = true;
  }

  if (estimation) {
    price = 300;
    process_vars.set("amount",price);
    console.log("GOOD ITEM ESTIMATION");
  } 
  else {
    price = 3000;
    process_vars.set("amount", price);
    console.log("BAD ITEM ESTIMATION");
  }

  console.log("Estimated price: " + price)  

  // Complete the task
  await taskService.complete(task,process_vars);
});
