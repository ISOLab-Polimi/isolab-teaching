# Ex 1 - Speedy Company

Speedy is a delivery company that wants to create a new reporting service for the top management in addition to the reporting service already made available by the reporting function. The new service is offered via a Web interface which will allow the manager to select a geographical area first, then to analyze the different products and finally to create a report.

## BPMN description

The top manager starts the process by creating a new report. The "report management" unit of Speedy checks if there is any pending report from the top manager: if so, the report creation is aborted, otherwise the report is added to the list of pending report. Then the top manager is asked to choose a geographical area for the report. Based on the manager's choice, the report management unit checks the list of products available in that zone and communicate it to the manager.
The latter, after reading the list, can select one product at a time to view information about it. If he finds it useful, he can add the product to the report with a personal comment; otherwise he keeps reading the product list until he added all the products he wants. He must add at list one product. The report management unit, after receiving information about the products added, keeps adding to the report the product tag and the corresponding comment.
Subsequently, the top manager adds some final considerations to the report and submit it. The management unit completes the report with the final considerations and makes it available to Speedy.