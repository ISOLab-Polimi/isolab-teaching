# Ex 1 - Speedy Company

## ArchiMate: business layer

Speedy is a delivery company that wants to create a new reporting service for the top management in addition to the reporting service already made available by the reporting function. The new service is offered via a Web interface which will allow the manager to select a geographical area first, then to analyze the different products and finally to create a report.

## ArchiMate: application and technology layers

To offer this service, Speedy relies on an ERP system and a data warehouse. The latter periodically reads the data from the ERP system through an API, to create a data mart useful for the analysis. A reporting module is in charge of interacting with the data mart to enable the activities which can be performed by the user.

In order to provide their service, the ERP and the DW are run on two different nodes each with its own interface and internal db. They communicate through a LAN to exchange information. A client node is run on Linux and it serves the reporting module. The latter can securely interact with the LAN, via a firewall.