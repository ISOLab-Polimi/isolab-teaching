# Ex 2 - Insurance Company

# ArchiMate: Business layer
IC is an insurance company which wants to offer a new insurance service for small objects (<2000$) managed completely online for reliable customers.
The new process starts when new insurance request arrives. Then the customers credentials and past history are checked. If the customer is considered reliable, he can upload a photo of the item and its details (serial number, purchase date). At this point an employee estimates the item’s price and, if <2000$, the system sends a contract to the customers and waits for the signed copy. If the estimated price is >2000$ the system sends a message to the customer explaining the service’s conditions.

# ArchiMate: Application and Technology layer
The IT system of the IC company is composed of a CRM system where information about the customers are managed even to check the reliability. Moreover, an ad-hoc program called “estimator” is made available through a desktop interface to the employee to estimate the price. Both CRM system and "estimator" program use the same database to access data, all running on separate nodes. Finally, a web application is available to support the finalization of the contract.

Each node has its own interface to provide the service. They are  connected through a LAN, composed by: Application Network (CRM and Estimator nodes), Data Network (DB node) and DMZ (WebApplication node). Each subnetwork in IC has a different security limitation that is implemented using firewalls.