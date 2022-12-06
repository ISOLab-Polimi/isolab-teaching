const {
    Client,
    logger,
    Variables,
  } = require("camunda-external-task-client-js");
  
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


//------------------------------------------------------------------
// susbscribe to message end event "Cancel wedding message"
//------------------------------------------------------------------
client.subscribe("send-cancel-wedding", async function ({ task, taskService }) {
    const processVariables = new Variables();
    const localVariables = new Variables();

    console.log("---------------------------------------------------------------");
    console.log("-> NEW WEDDING CANCELED")

    // External service behaviour
    var args = {
        data: {
            messageName : "cancel-wedding",
            processInstanceIds : [],
            processInstanceQuery: {
            processDefinitionKey: "wedding-planner-process"
            }
        },
        headers: { "Content-Type": "application/json" },
    }

    // call camunda engine API for sending message asynch
    // check camunda documentation for more
    restclient.post(
    "http://localhost:8080/engine-rest/process-instance/message-async",
    args,
    function (data, response) {
            console.log("-> Response status code: " + response.statusCode);
            console.log("-> Response status message: " + response.statusMessage);

            // Complete the task
            taskService.complete(task, processVariables, localVariables);
            console.log("-> Task EXECUTED");
        }
    );
})