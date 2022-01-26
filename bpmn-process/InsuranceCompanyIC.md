# Ex 2 - Insurance Company

IC is an insurance company which wants to offer a new insurance service for small objects (<2000$) managed completely online for reliable customers.

## BPMN description

The new process starts when a customer compile an insurance request and send it to IC. 
When new insurance request arrives, customers credentials and past history are checked by an employee. If a customer is not reliable, employee send a message to show him that is not allowed to get that kind of insurance and process ends.
If the customer is considered reliable, he can upload a photo, serial number and purchase date of the item and send all the details in a form.
At this point an employee estimates the item’s price through the estimator system and, if priice < 2000$, sends a contract to the customer that can choose to accept or reject.
Employee waits for the signed copy or rejected message from the customer (that causes the end of the process).
If the estimated price is >2000$ the system sends a message to the customer explaining the service’s conditions. The customer can now verify conditions and decide to end the process or try to upload another item.