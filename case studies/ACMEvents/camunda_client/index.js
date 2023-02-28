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
var newTSAvailable = true;

const draftProgram = {
  "artists": [
              {
                "content":"Artist 1",
                "time": "12:30"
              }, 
              {
                "content":"Artist 2",
                "time": "16:00"
              },
              {
                "content":"Artist 3",
                "time":"20:30"
              },
              {
                "content":"Artist 4",
                "time":"22:00"
              },
              {
                "content":"Artist 5",
                "time":"24:00"
              }
            ]
}
  
//------------------------------------------------------------------
// susbscribe to "Feasibility check" task
//------------------------------------------------------------------
client.subscribe("feasibility-check", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();
  
  const eventBudget = task.variables.get("eventBudget")

  console.log("---------------------------------------------------------------");
  console.log("-> ANALYSE NEW EVENT REQUEST")
  console.log("Event budget: " + eventBudget)

  if(eventBudget > 10000){
    processVariables.set("feasibility", "true")
    console.log("-> REQUEST ACCEPTED")
  } else {      
    processVariables.set("feasibility", "false")
    console.log("-> REQUEST DENIED")
  }
  // Complete the task
  taskService.complete(task, processVariables, localVariables)
})


//------------------------------------------------------------------
// susbscribe to "Generate report" task
//------------------------------------------------------------------
client.subscribe("generate-report", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();

  console.log("---------------------------------------------------------------")
  console.log("-> GENERATE REPORT FOR A DECLINED EVENT")
  
  processVariables.set("report", "I'm sorry. Your request has been declined!")

  // Complete the task
  taskService.complete(task, processVariables, localVariables)

})

//------------------------------------------------------------------
// susbscribe to "Elaborate draft program and list of artists" task
//------------------------------------------------------------------
client.subscribe("generate-draft-program", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();

  console.log("---------------------------------------------------------------");
  console.log("-> GENERATE DRAFT EVENT PROGRAM")

  // Set the list of artists that we want to include in the event
  processVariables.set('draftProgram', JSON.stringify(draftProgram))
  processVariables.set('count', 0)
  processVariables.set('tempName', '')
  processVariables.set('tempTime', '')
  processVariables.set('completeProgram', 'true')
  console.log("-> I have defined variables for the event program into the process")
  
  // Complete the task
  taskService.complete(task, processVariables, localVariables)
})


//------------------------------------------------------------------
// susbscribe to "Contact artist" task
//------------------------------------------------------------------
client.subscribe("contact-artist", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();

  const artistName = task.variables.get("tempName")
  const artistTime = task.variables.get("tempTime")
  const artistDate = task.variables.get("eventDate")

  const eventProgram = task.variables.get("eventProgram")

  console.log("---------------------------------------------------------------");
  console.log("-> CONTACT ARTIST");
  console.log("-> Contact " + artistName + " for an exibition at time: " + artistTime);

  // Define content of the request
  var args = {
    data: {
      artistName: artistName,
      date: artistDate,
      time: artistTime
    },
    headers: { "Content-Type": "application/json" },
  }
  // Call the RestAPI to receive a response available/not-available/new-timeslot
  restclient.post(
    "http://localhost:3000/artists/contact-artist",
    args,
    function (data, response) {
      console.log("-> Response status code: " + response.statusCode);
      console.log("-> Response status message: " + response.statusMessage);
      console.log("-> Availability: " + data.availability)
      console.log("-> NewTS: " + data.newTimeslot)

      processVariables.set("artistAvailable", data.availability.toString())
      processVariables.set("newTimeslot", data.newTimeslot.toString())

      if (data.availability) {
        if(eventProgram == null){
          processVariables.set("eventProgram", artistName);
        } else {
          processVariables.set("eventProgram", eventProgram + "," + artistName);
        }
      } else {
        processVariables.set("completeProgram", "false")
      }

      console.log("-> Artists in program: " + task.variables.get("eventProgram"))

      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
})


//------------------------------------------------------------------
// susbscribe to "Note unavailability" task
//------------------------------------------------------------------
client.subscribe("note-unavailability", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();
  const unavailableArtist = task.variables.get("tempName")

  console.log("---------------------------------------------------------------");
  console.log("-> THE CURRENT ARTIST IS NOT AVAILABLE: " + unavailableArtist);

  // The unavailable artist is not inserted in the event program list

  // Complete the task
  taskService.complete(task, processVariables, localVariables);
})


//------------------------------------------------------------------
// susbscribe to "Search for new timeslots" task
//------------------------------------------------------------------
client.subscribe("search-new-timeslot", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();

  console.log("---------------------------------------------------------------");
  console.log("-> SEARCH FOR NEW TIMESLOTS")

  if (newTSAvailable) {
    processVariables.set("availableTimeslot", "true")
    console.log("-> A new TS for the current artist is available")
  } else {
    processVariables.set("availableTimeslot", "false")
    console.log("-> A new TS for the current artist is NOT available")
  } 
  // Change var value to run all the process flows
  newTSAvailable = !newTSAvailable

  // Complete the task
  taskService.complete(task, processVariables, localVariables);
})


//------------------------------------------------------------------
// susbscribe to "No available timeslot" task
//------------------------------------------------------------------
client.subscribe("notify-no-timeslot", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();

  console.log("---------------------------------------------------------------");
  console.log("-> NO AVAILABLE TIMESLOT")

  const artistName = task.variables.get("tempName")
  const artistDate = task.variables.get("eventDate")

  const eventProgram = task.variables.get("eventProgram")
  var artistsInProgram = eventProgram.split(",")

  console.log("-> No new timeslot available for: " + artistName + " on: " + artistDate.toString());

  // Call RestAPI to delete artist from program if no available TS
  var args = {
    data: {
      artistName: artistName,
      date: artistDate
    },
    headers: { "Content-Type": "application/json" },
  }

  restclient.post(
    "http://localhost:3000/artists/no-available-timeslot",
    args,
    function (data, response) {
      console.log("-> Response status code: " + response.statusCode);
      console.log("-> Response status message: " + response.statusMessage);
      // Delete the artist that can't partecipate at the event
      artistsInProgram.pop()
      processVariables.set("eventProgram", artistsInProgram.toString())

      console.log("-> Artists in program: " + task.variables.get("eventProgram"))

      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
})


//------------------------------------------------------------------
// susbscribe to "Send new timeslot to the artist" task
//------------------------------------------------------------------
client.subscribe("notify-new-timeslot", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();
  const newTS = "18:30";

  console.log("---------------------------------------------------------------");
  console.log("-> NEW TIME SLOT FOR ARTIST: ")

  const artistName = task.variables.get("tempName")
  const artistDate = task.variables.get("eventDate")

  console.log("-> NEW timeslot available for: " + artistName + " on: " + artistDate.toString());

  // Call RestAPI to send the new timeslot

  var args = {
    data: {
      artistName: artistName,
      date: artistDate,
      time: newTS
    },
    headers: { "Content-Type": "application/json" },
  }

  restclient.post(
    "http://localhost:3000/artists/new-timeslot",
    args,
    function (data, response) {
      console.log("-> Response status code: " + response.statusCode);
      console.log("-> Response status message: " + response.statusMessage);

      console.log("-> Artists in program: " + task.variables.get("eventProgram"))

      // Complete the task
      taskService.complete(task, processVariables, localVariables);
    }
  );
})


//------------------------------------------------------------------
// susbscribe to "Update event program" task
//------------------------------------------------------------------
client.subscribe("update-event-program", async function ({ task, taskService }) {
  const processVariables = new Variables();
  const localVariables = new Variables();

  console.log("---------------------------------------------------------------");
  console.log("-> UPDATE EVENT PROGRAM")

  console.log("-> Artists in program: " + task.variables.get("eventProgram"))

  // Complete the task
  taskService.complete(task, processVariables, localVariables);
})