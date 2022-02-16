# The Insurance Company

The Insurance Company is a company specialized protecting personal valuable goods (e.g., paintings, jewels) and to this aim it offers a set of services to assists the customer in defining and signing insurance policies as well as in reimbursing the customers in case of damages or theft. Most of the services now offered requires the customers to move to a branch of the company where an employee will use a desktop application on this purpose. This application is part of a CRM that stores information about the customers.

To improve the efficiency of the company and reduce the costs, recently The Insurance Company has decided to offer a new insurance service completely managed on line. This service is dedicated only for protecting small objects (which value is estimated as lower than 2000$) and it will be available only to reliable customers. This service will allow the customer to submit a new insurance request and, only if the customer is considered reliable by checking his/her past history, photos of the item are required to be uploaded along with some details (e.g., serial number, purchase date). An employee dedicated to this service is in charge of estimate if the value of the item is really lower than 2000$. In that case, a contract to be signed is sent to the customer which has to return it back to complete the procedure. In case the value exceeds the threshold, the employee sends to the customer information about possible insurance policy that is more compliant with the type of object. 

From an IT perspective, the Insurance Company is going to develop an ad-hoc program called “estimator” made available through a desktop interface to the employee to estimate the price. Both CRM system and "estimator" program use the same database to access data, all running on separate nodes. Moreover, a web application will be also provided to support the finalization of the contract.

Each application has its own interface to provide the service. They are  connected through a LAN, composed by: Application Network (CRM and Estimator nodes), Data Network (DB node) and DMZ (WebApplication node). Each subnetwork in IC has a different security limitation that is implemented using firewalls.


<!-- ## BPMN description

The new process starts when a customer compile an insurance request and send it to IC. 
When new insurance request arrives, customers credentials and past history are checked by an employee. If a customer is not reliable, employee send a message to show him that is not allowed to get that kind of insurance and process ends.
If the customer is considered reliable, he can upload a photo, serial number and purchase date of the item and send all the details in a form.
At this point an employee estimates the item’s price through the estimator system and, if priice < 2000$, sends a contract to the customer that can choose to accept or reject.
Employee waits for the signed copy or rejected message from the customer (that causes the end of the process).
If the estimated price is >2000$ the system sends a message to the customer explaining the service’s conditions. The customer can now verify conditions and decide to end the process or try to upload another item. -->
