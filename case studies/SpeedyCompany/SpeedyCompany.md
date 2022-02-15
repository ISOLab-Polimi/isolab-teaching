# Ex 1 - Speedy Company

## ArchiMate: business layer

Speedy is a delivery company that wants to create a new reporting service for the top management in addition to the reporting service already made available by the reporting function. The new service is offered via a Web interface which will allow the manager to select a geographical area first, then to analyze the different products and finally to create a report.

## ArchiMate: application and technology layers

To offer this service, Speedy relies on an ERP system and a data warehouse. The latter periodically reads the data from the ERP system through an API, to create a data mart useful for the analysis. A reporting module is in charge of interacting with the data mart to enable the activities which can be performed by the user.

In order to provide their service, the ERP and the DW are run on two different nodes each with its own interface and internal db. They communicate through a LAN to exchange information. A client node is run on Linux and it serves the reporting module. The latter can securely interact with the LAN, via a firewall.

## BPMN description

The top manager starts the process by creating a new report. The "report management" unit of Speedy checks if there is any pending report from the top manager: if so, the report creation is aborted, otherwise the report is added to the list of pending report. Then the top manager is asked to choose a geographical area for the report. Based on the manager's choice, the report management unit checks the list of products available in that zone and communicate it to the manager.
The latter, after reading the list, can select one product at a time to view information about it. If he finds it useful, he can add the product to the report with a personal comment; otherwise he keeps reading the product list until he added all the products he wants. He must add at list one product. The report management unit, after receiving information about the products added, keeps adding to the report the product tag and the corresponding comment.
Subsequently, the top manager adds some final considerations to the report and submit it. The management unit completes the report with the final considerations and makes it available to Speedy.