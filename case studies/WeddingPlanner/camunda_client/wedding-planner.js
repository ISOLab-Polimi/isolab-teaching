const {
    Client,
    logger,
    Variables,
  } = require("camunda-external-task-client-js");
  
//const open = require('open');
const config = {
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger,
  asyncResponseTimeout: 10000,
};

// create a Client instance with custom configuration
const client = new Client(config);
var RESTClient = require("node-rest-client").Client;
var restclient = new RESTClient();
var weddingID = 0;
const soldOut = false;

  
//------------------------------------------------------------------
// susbscribe to "Analyse request" task
//------------------------------------------------------------------
client.subscribe("analyse-request", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();

  console.log("---------------------------------------------------------------");
  console.log("-> ANALYSE NEW WEDDING REQUEST")

  if(soldOut){
    processVariables.set("requestAccepted", "false")
    console.log("-> REQUEST DENIED")
  } else {      
    processVariables.set("requestAccepted", "true")
    // Everytime a request is accepted, a new weddingID is defined in process variables
    processVariables.set("weddingID", weddingID)
    weddingID++
    console.log("-> REQUEST ACCEPTED")
  }

  // Complete the task
  taskService.complete(task, processVariables, localVariables)
})


//------------------------------------------------------------------
// susbscribe to "Send date notification to basic suppliers" task
//------------------------------------------------------------------
client.subscribe("send-date-basic-suppliers", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();
  const weddingDate = task.variables.get("weddingDate")
  const weddingDateString = weddingDate.toString()
  const ID = task.variables.get("weddingID")

  console.log("---------------------------------------------------------------");
  console.log("-> SEND NEW WEDDING NOTIFICATION TO BASIC SUPPLIERS")
  console.log("-> Wedding date: " + weddingDateString)
  // External service behaviour
  var args = {
    data: {
      weddingId: ID,
      date: weddingDateString
    },
    headers: { "Content-Type": "application/json" },
  }

  // call rest API
  restclient.post(
    "http://localhost:3000/basicSuppliers/new-wedding",
    args,
    function (data, response) {
      console.log("-> Response status code: " + response.statusCode);
      console.log("-> Response status message: " + response.statusMessage);

      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
})

//------------------------------------------------------------------
// susbscribe to "Send date notification to addition suppliers" task
//------------------------------------------------------------------
client.subscribe("send-date-additional-suppliers", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();
  const weddingDate = task.variables.get("weddingDate")
  const weddingDateString = weddingDate.toString()
  const ID = task.variables.get("weddingID")

  console.log("---------------------------------------------------------------");
  console.log("-> SEND NEW WEDDING NOTIFICATION TO ADDITIONAL SUPPLIERS")

  // External service behaviour
  var args = {
    data: {
      weddingID: ID,
      date: weddingDateString
    },
    headers: { "Content-Type": "application/json" },
  }

  // call rest API
  restclient.post(
    "http://localhost:3000/additionalSuppliers/new-wedding",
    args,
    function (data, response) {
      console.log("-> Response status code: " + response.statusCode);
      console.log("-> Response status message: " + response.statusMessage);
      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
})


//------------------------------------------------------------------
// susbscribe to "Get location images" task
//------------------------------------------------------------------
client.subscribe("get-location-images", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();
  const ID = task.variables.get("weddingID")

  console.log("---------------------------------------------------------------");
  console.log("-> GET IMAGES ABOUT WEDDING LOCATION")

  // External service behaviour
  var args = {
    data: {
      weddingID: ID
    },
    headers: { "Content-Type": "application/json" },
  }
  
  // call rest API
  restclient.post(
    "http://localhost:3000/basicSuppliers/get-location-images",
    args,
    function (data, response) {
      console.log("-> Response: " + data.imagesURL);
      processVariables.set("locationImage", data.imagesURL)
      console.log("-> Response status code: " + response.statusCode);
      console.log("-> Response status message: " + response.statusMessage);

      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
})

//------------------------------------------------------------------
// susbscribe to "Inform all the suppliers" task
//------------------------------------------------------------------
client.subscribe("inform-all-suppliers", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();
  const weddingDate = task.variables.get("weddingDate")
  const weddingDateString = weddingDate.toString()
  const ID = task.variables.get("weddingID")

  console.log("---------------------------------------------------------------");
  console.log("-> INFORM ALL THE SUPPLIERS WEDDING IS CANCELED")

  // External service behaviour
  var args = {
    data: {
      weddingId: ID,
    },
    headers: { "Content-Type": "application/json" },
  }

  // call rest APIs
  restclient.post(
    "http://localhost:3000/basicSuppliers/cancel-wedding",
    args,
    function (data, response) {
      console.log("-> Call BASIC SUPPLIERS API")
      console.log("-> Response status code: " + response.statusCode);
      console.log("-> Response status message: " + response.statusMessage);
    }
  );
  restclient.post(
    "http://localhost:3000/additionalSuppliers/cancel-wedding",
    args,
    function (data, response) {
      console.log("-> Call ADDITIONAL SUPPLIERS API")
      console.log("-> Response status code: " + response.statusCode);
      console.log("-> Response status message: " + response.statusMessage);
    }
  );

  // Complete the task
  taskService.complete(task, processVariables, localVariables);
})

//------------------------------------------------------------------
// susbscribe to "Inform additional suppliers" task
//------------------------------------------------------------------
client.subscribe("inform-additional-suppliers", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();
  const weddingDate = task.variables.get("weddingDate")
  const weddingDateString = weddingDate.toString()
  const ID = task.variables.get("weddingID")

  console.log("---------------------------------------------------------------");
  console.log("-> INFORM ADDITIONAL SUPPLIERS THAT WEDDING IS CANCELED")

  // External service behaviour
  var args = {
    data: {
      weddingId: ID,
    },
    headers: { "Content-Type": "application/json" },
  }

  // call rest API
  restclient.post(
    "http://localhost:3000/additionalSuppliers/cancel-wedding",
    args,
    function (data, response) {
      console.log("-> Response status code: " + response.statusCode);
      console.log("-> Response status message: " + response.statusMessage);
      console.log("-> ADDITIONAL suppliers are contacted for cancelling a wedding")
      
      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );

})


//------------------------------------------------------------------
// susbscribe to "Compute Time to Wedding" task
//------------------------------------------------------------------
client.subscribe("compute-time-to-wedding", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();

  console.log("---------------------------------------------------------------");
  console.log("-> COMPUTE TIME TO WEDDING")

  const weddingDate = task.variables.get("weddingDate")
  const today = Date.now();
  console.log("Wedding date: " + weddingDate)
  const diffTime = Math.abs(today - weddingDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log("Days to the wedding: ", diffDays)
  // Define time to wedding in process variables
  processVariables.set("timeToWedding", diffDays);


  // Complete the task
  taskService.complete(task, processVariables, localVariables)
})